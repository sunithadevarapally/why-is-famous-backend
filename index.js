import Question from './actions/question.js';
import express from 'express';
import bodyParser from 'body-parser';

const PORT = 8080;

const app = express();

var jsonParser = bodyParser.json();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/add_question", jsonParser,(req, res) => {
  const questionCreatePromise = Question.addQuestion(req.body.question);
  questionCreatePromise.then(function (response) {
    res.json({ message: response });
  });
});

app.get("/list_questions", jsonParser,(req, res) => {
  const getQuestionsPromise = Question.getQuestions();
  getQuestionsPromise.then(function(response) {
    res.json({message: response});
  });
});

