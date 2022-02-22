// const {Datastore} = require('@google-cloud/datastore');
import { Datastore } from '@google-cloud/datastore';
const datastore = new Datastore();
const QUESTION_KIND = 'Question';
const ANSWER_KIND = 'Answer';

class Question {
    async addQuestion(questionValue) {
        console.log(`Adding ${questionValue} to ${QUESTION_KIND} kind`);
        const questionKey = datastore.key([QUESTION_KIND, questionValue]);
        const question = {
            key: questionKey,
            data: {}
        };
        await datastore.save(question);
        console.log(`Saved ${question.key.name}`);
        return question.key.name;
    };
    
    async getQuestions() {
        const ret = [];
        const query = datastore.createQuery(QUESTION_KIND);
        const [questions] = await datastore.runQuery(query);
        console.log(datastore.KEY);
        for (const question of questions) {
            const questionKey = question[datastore.KEY];
            ret.push(questionKey.name);
        }
        return ret;
    }
}

export default new Question();