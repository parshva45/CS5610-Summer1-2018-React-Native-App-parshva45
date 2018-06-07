import 'es6-symbol/implement';

const ESSAY_URL = "http://10.0.0.183:8080/api/exam/EID/essay";
const QUESTION_URL = "http://10.0.0.183:8080/api/question/QID/essay";

let _singleton=Symbol();
class EssayServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new EssayServiceClient(_singleton);
    return this[_singleton]
  }

  addQuestion(examId){
    let newQuestion={
      title: 'New Essay Question',
      description: 'New Essay Description',
      points: 100,
      subtitle: 'New Essay Subtitle',
      questionType:'ESS'
    };

    return fetch(ESSAY_URL.replace('EID',examId),{
      method:"post",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newQuestion)
    })
  }

  updateQuestion(questionId, modifiedQuestion){
    return fetch(QUESTION_URL.replace('QID',questionId), {
      method: "put",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(modifiedQuestion)
    })
  }
}

export default EssayServiceClient;