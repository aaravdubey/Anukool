import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  anonymousName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  token: { type: String, default: null },
  mhiResponse: { type: [String], default: Array(38).fill(null)},
  mhiState: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      anxiety: 0,
      depression: 0,
      lossOfBehavioralEmotionalControl: 0,
      generalPositiveAffect: 0,
      emotionalTies: 0,
      lifeSatisfaction: 0,
      psychologicalDistress: 0,
      psychologicalWellBeing: 0
    }
  },
});

const dailyQuestionsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  responses: {
    type: [{
      response1: { type: String, required: true },
      response2: { type: String, required: true },
      response3: { type: String, required: true }
    }],
    default: []
  }
});

const userModel = mongoose.model('User', userSchema);
const dailyQuestionsModel = mongoose.model('DailyQuestions', dailyQuestionsSchema);

export { userModel, dailyQuestionsModel };
