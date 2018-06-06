import 'es6-symbol/implement';

const ASSIGNMENT_URL = "http://10.0.0.183:8080/api/lesson/LID/assignment";

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
      .then(response=>(
        response.json()
      ))
  }

  addAssignment(lessonId,assignment){
    return fetch(ASSIGNMENT_URL.replace("LID",lessonId),{
      method:"post",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(assignment)
    })
  }
}

export default AssignmentServiceClient;