import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { userModel } from "../models/user.js";
import { CommentModel, PostModel } from "../models/post.js";

const router = express.Router();

router.post('/mhi', verifyToken, async (req, res) => {
  try {
    const answers = req.body.answers;
    const { userId, anonymousName } = req.body.userData;
    const user = await userModel.findOne({ userId });
    console.log(answers);
    if (answers.includes('')){
      user.mhiResponse = answers;
      user.markModified('mhiResponse');
      user.save();
    }else{
      var sums = await calculateSums(answers);
      user.mhiState = sums;
      user.mhiResponse = answers;
      user.markModified('mhiResponse');
      user.markModified('mhiState');
      user.save();
      console.log(sums);
    }
    res.status(200).send("Answers");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
})

async function calculateSums(array) {
  var anxietySum = 0;
  var depressionSum = 0;
  var lossOfBehavioralEmotionalControlSum = 0;
  var generalPositiveAffectSum = 0;
  var emotionalTiesSum = 0;
  var lifeSatisfactionSum = 0;
  var psychologicalDistressSum = 0;
  var psychologicalWellBeingSum = 0;

  // Anxiety items
  [3, 11, 13, 15, 25, 29, 32, 33, 35].forEach(function (index) {
    anxietySum += parseInt(array[index - 1]);
  });

  // Depression items
  [9, 19, 30, 36].forEach(function (index) {
    depressionSum += parseInt(array[index - 1]);
  });

  // Loss of Behavioural / Emotional Control items
  [8, 14, 16, 18, 20, 21, 24, 27, 28].forEach(function (index) {
    lossOfBehavioralEmotionalControlSum += parseInt(array[index - 1]);
  });

  // General Positive Affect items
  [4, 5, 6, 7, 12, 17, 26, 31, 34, 37].forEach(function (index) {
    generalPositiveAffectSum += parseInt(array[index - 1]);
  });

  // Emotional Ties items
  [10, 23].forEach(function (index) {
    emotionalTiesSum += parseInt(array[index - 1]);
  });

  // Life Satisfaction item
  lifeSatisfactionSum = parseInt(array[0]);

  [2, 3, 8, 9, 11, 13, 14, 15, 16, 18, 19, 20, 21, 24, 25, 27, 28, 29, 30, 32, 33, 35, 36, 38].forEach(function (index) {
    psychologicalDistressSum += parseInt(array[index - 1]);
  });

  // Psychological Well-being items
  [1, 4, 5, 6, 7, 10, 12, 17, 22, 23, 26, 31, 34, 37].forEach(function (index) {
    psychologicalWellBeingSum += parseInt(array[index - 1]);
  });

  return {
    anxiety: anxietySum,
    depression: depressionSum,
    lossOfBehavioralEmotionalControl: lossOfBehavioralEmotionalControlSum,
    generalPositiveAffect: generalPositiveAffectSum,
    emotionalTies: emotionalTiesSum,
    lifeSatisfaction: lifeSatisfactionSum,
    psychologicalDistress: psychologicalDistressSum,
    psychologicalWellBeing: psychologicalWellBeingSum
  };
}

export default router;