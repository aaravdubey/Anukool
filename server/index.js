import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import AccountRouter from './routes/account.js';
import PostRouter from './routes/post.js';
import QuestionnaireRouter from './routes/questionnaire.js';
import verifyToken from './middlewares/verifyToken.js';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }) );

mongoose.connect("mongodb://0.0.0.0/Anukool", {useNewUrlParser: true})
    .then( console.log("Connected to DB") )
    .catch( (error) => {console.log(error)} );

app.use('/account', AccountRouter);
app.use('/post', PostRouter);
app.use('/questionnaire', QuestionnaireRouter);

app.listen(3000, () => console.log("Server started at port 3000"));
