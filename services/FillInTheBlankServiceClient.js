import 'es6-symbol/implement';

const QUESTION_URL = "http://10.0.0.183:8080/api/question/QID/blanks";
const EXAM_URL = "http://10.0.0.183:8080/api/exam/EID/blanks";

let _singleton=Symbol();

class FillInTheBlankServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new FillInTheBlankServiceClient(_singleton);
    return this[_singleton]
  }

  addNewQuestion(examId){
    let newQuestion={
      title:'New Fill in the Blank Question',
      description:'New Fill in the Blank Description',
      points:100,
      subtitle:'New Fill in the Blank Subtitle',
      variables:'x',
      questionType:'FIB',
      fib:'2 + 2 = [four=4]\n' +
      '[two=2] + 2 = 4\n'
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

export default FillInTheBlankServiceClient;