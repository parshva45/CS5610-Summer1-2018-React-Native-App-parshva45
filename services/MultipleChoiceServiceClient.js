import 'es6-symbol/implement';

const QUESTION_URL = "http://10.0.0.183:8080/api/question/QID/choice";
const EXAM_URL = "http://10.0.0.183:8080/api/exam/EID/choice";

let _singleton=Symbol();
class MultipleChoiceServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new MultipleChoiceServiceClient(_singleton);
    return this[_singleton]
  }

  addNewQuestion(examId){
    let newQuestion={
      title:'New Multiple Choice Question Title',
      description:'New Multiple Choice Question Description',
      points:100,
      subtitle:'New Multiple Choice Question Subtitle',
      questionType:'MCQ',
      options:'option-1|option-2',
      correctOption:'0'
    };

    return fetch(EXAM_URL.replace('EID',examId),{
      method:"post",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newQuestion)
    })
  }

  updateQuestion(questionId,question){
    return fetch(QUESTION_URL.replace('QID',questionId), {
      method: "put",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(question)
    })
  }

}

export default MultipleChoiceServiceClient;