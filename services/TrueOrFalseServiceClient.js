import 'es6-symbol/implement';

const QUESTION_URL = "http://10.0.0.183:8080/api/question/QID/trueorfalse";
const EXAM_URL = "http://10.0.0.183:8080/api/exam/EID/trueorfalse";

let _singleton=Symbol();

class TrueOrFalseServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new TrueOrFalseServiceClient(_singleton);
    return this[_singleton]
  }

  addNewQuestion(examId){
    let newQuestion={
      title:'New True or False Question',
      description:'New True or False Description',
      points:100,
      subtitle:'New True or False Subtitle',
      isTrue:true,
      questionType:'TOF'
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

export default TrueOrFalseServiceClient;