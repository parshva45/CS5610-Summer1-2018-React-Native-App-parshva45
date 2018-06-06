import 'es6-symbol/implement';

const COURSE_URL = "http://10.0.0.183:8080/api/course";

let _singleton = Symbol();
class CourseServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new CourseServiceClient(_singleton);
    return this[_singleton]
  }

  findAllCourses() {
    return fetch(COURSE_URL)
      .then(response => (
        response.json()
      ))
  }
}

export default CourseServiceClient;