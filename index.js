import Question from './actions/question.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const PORT = process.env.PORT || 8080;

const app = express();

var whitelist = ['http://localhost:3000', 'https://famous-website-dot-famouswebsitereact.uc.r.appspot.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Then pass them to cors:
app.use(cors(corsOptions));

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

