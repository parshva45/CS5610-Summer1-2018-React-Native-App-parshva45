import 'es6-symbol/implement';

const ASSIGNMENT_URL = "http://10.0.0.183:8080/api/lesson/LID/assignment";
const GET_ASSIGNMENT_URL = "http://10.0.0.183:8080/api/assignment";

let _singleton = Symbol();
class AssignmentServiceClient{
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }
  static get instance() {
    if(!this[_singleton])
      this[_singleton] = new AssignmentServiceClient(_singleton);
    return this[_singleton]
  }

  findAllAssignmentsForLesson(lessonId){
    return fetch(ASSIGNMENT_URL.replace("LID",lessonId))
      .then(response => (
        response.json()
      ))
  }

  addAssignment(lessonId){
    let newAssignment = {
      title: "New Assignment Title",
      description: "New Assignment Description",
      points: 100,
      text: "New Assignment Text",
      widgetType: "Assignment"
    };
    return fetch(ASSIGNMENT_URL.replace("LID",lessonId),{
      method:"post",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(newAssignment)
    }).then(response => (
        response.json()
      ))
  }

  findAssignmentById(assignmentId){
    return fetch(GET_ASSIGNMENT_URL + "/" + assignmentId)
      .then(response => {
        return response.json()
      })
  }
}

export default AssignmentServiceClient;