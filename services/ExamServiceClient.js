import 'es6-symbol/implement';

const EXAM_URL = "http://10.0.0.183:8080/api/lesson/LID/exam";
const GET_EXAM_URL = "http://10.0.0.183:8080/api/exam";

let _singleton=Symbol();
class ExamServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new ExamServiceClient(_singleton);
    return this[_singleton]
  }

  findAllExamsForLesson(lessonId){
    return fetch(EXAM_URL.replace("LID",lessonId))
      .then(response => (
        response.json()
      ))
  }

  addNewExam(lessonId){
    let newExam={
      title:"New Exam Title",
      text:"New Exam Text",
      widgetType:"Exam"
    };
    return fetch(EXAM_URL.replace("LID",lessonId),{
      method:"post",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newExam)
    }).then(response => (
      response.json()
    ))
  }

  findExamById(examId){
    return fetch(GET_EXAM_URL + "/" + examId)
      .then(response => {
        return response.json()
      })
  }

  deleteExam(examId){
    fetch(GET_EXAM_URL + "/" + examId, {
      method:'delete'
    }).then(response => (response))
  }
}

export default ExamServiceClient;