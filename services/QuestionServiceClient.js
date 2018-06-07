import 'es6-symbol/implement';

// import FillInTheBlankServiceClient from "./FillInTheBlankServiceClient";
// import TrueOrFalseServiceClient from "./TrueOrFalseServiceClient";
import EssayServiceClient from "./EssayServiceClient";
// import MultipleChoiceServiceClient from "./MultipleChoiceServiceClient";

const QUESTION_URL = "http://10.0.0.183:8080/api/exam/EID/question";

let _singleton=Symbol();
class QuestionServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');

    // this.fillInTheBlankService = FillInTheBlankServiceClient.instance;
    // this.trueFalseService = TrueOrFalseServiceClient.instance;
    this.essayService = EssayServiceClient.instance;
    // this.mulitpleChoiceService = MultipleChoiceServiceClient.instance;

  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new QuestionServiceClient(_singleton);
    return this[_singleton]
  }

  addQuestion(questionType,examId){
    // if(questionType === 'FIB'){
    //   return this.fillInTheBlankService.addQuestion(examId)
    // }
    // else if(questionType === 'TOF'){
    //   return this.trueFalseService.addQuestion(examId)
    // }
    // else if(questionType === 'ESS'){
      return this.essayService.addQuestion(examId)
    // }
    // else if(questionType === 'MCQ'){
    //   return this.mulitpleChoiceService.addQuestion(examId)
    // }
  }

  findAllQuestionsByExam(examId){
    return fetch(QUESTION_URL.replace('EID',examId))
      .then(response => (
        response.json()
      ))
  }
}

export default QuestionServiceClient;