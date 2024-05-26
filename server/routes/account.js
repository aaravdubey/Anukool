import express from "express";
import jwt from 'jsonwebtoken';
import { GenerateID } from "../services/IdGenerator.js";
import { hashPassword, verifyPassword } from "../services/password.js";
import { userModel, dailyQuestionsModel } from "../models/user.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, anonymousName } = req.body;
        console.log(name + " " + email + " " + password + " " + anonymousName + " ZZZ");
        const user = await userModel.findOne({ email });

        if (user) {
            res.status(403).json({ msg: 'Account with email id: ' + req.body.email + ' already exists.' });
        } else {
            let { salt, hash } = await hashPassword(password);

            const newUser = await userModel({
                username: name,
                email: email,
                password: hash,
                salt: salt,
                anonymousName: anonymousName,
                userId: 'UID' + await GenerateID()
            }).save();

            const dailyQuestion = await dailyQuestionsModel({
                userId: newUser.userId
            }).save();

            console.log(newUser);

            jwt.sign({ newUser }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' }, (err, token) => {
                if (err) throw (err);
                else {
                    // res.cookie('token', token, { httpOnly: true });
                    res.status(201).json({ msg: 'Account created with email id: ' + email, token, username: newUser.username, anonymousName });
                }
            });
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Some error occured' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email1: email, password1: password } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            let isMatch = verifyPassword(password, user.password, user.salt);

            if (isMatch) {
                jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' }, (err, token) => {
                    if (err) throw (err);
                    else {
                        // let index = -1;
                        // if (user.mhiResponse.includes(null)) {
                        //     index = user.mhiResponse.indexOf(null);
                        // }
                        console.log(user.mhiResponse);
                        res.cookie('token', token, { httpOnly: true });
                        res.status(200).json({ msg: 'Login Successful', token, username: user.username, anonymousName: user.anonymousName, mhiResponse: user.mhiResponse });
                    }
                });
            }
            else
                res.status(403).json({ msg: 'Incorrect Password.' })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Some error occured' });
    }
});

router.post('/verifyUser', verifyToken, (req, res) => {
    if (req.body.userData) {
        res.status(200);
    } else {
        res.status(401).json({ msg: 'Invlaid Token' })
    }
})

router.post('/userdata', verifyToken, (req, res) => {
    if (req.body.userData) {
        req.body.userData.mhiState.index = req.body.userData.mhiResponse
            .filter(item => item !== '')
            .reduce((acc, curr) => acc + parseInt(curr), 0);
        // console.log(req.body.userData.mhiState.index);
        req.body.userData.mhiRange = categorizeValues(req.body.userData.mhiState);
        res.status(200).json({ userData: req.body.userData });
    } else {
        res.status(401).json({ msg: 'Invlaid Token' })
    }
})

function categorize(value, lowRange, mediumRange, highRange) {
    if (value >= lowRange && value <= mediumRange) {
        return "low";
    } else if (value > mediumRange && value <= highRange) {
        return "medium";
    } else {
        return "high";
    }
}

// Function to create a new JSON object with categorized values
function categorizeValues(data) {
    const categorizedData = {};
    for (const key in data) {
        switch (key) {
            case "anxiety":
                categorizedData[key] = categorize(data[key], 9, 24, 39);
                break;
            case "depression":
                categorizedData[key] = categorize(data[key], 4, 9, 15);
                break;
            case "lifeSatisfaction":
                categorizedData[key] = categorize(data[key], 1, 2, 4);
                break;
            case "emotionalTies":
                categorizedData[key] = categorize(data[key], 2, 5, 8);
                break;
            case "lossOfBehavioralEmotionalControl":
                categorizedData[key] = categorize(data[key], 9, 21, 35);
                break;
            case "generalPositiveAffect":
                categorizedData[key] = categorize(data[key], 10, 23, 37);
                break;
            case "psychologicalDistress":
                categorizedData[key] = categorize(data[key], 24, 56, 89);
                break;
            case "psychologicalWellBeing":
                categorizedData[key] = categorize(data[key], 14, 32, 52);
                break;
            case "index":
                categorizedData[key] = categorize(data[key], 38, 99, 161);
                break;
            default:
                categorizedData[key] = "unknown";
        }
    }
    return categorizedData;
}

export default router;