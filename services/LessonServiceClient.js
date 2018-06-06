import 'es6-symbol/implement';

const LESSON_URL = "http://10.0.0.183:8080/api/course/CID/module/MID/lesson";

let _singleton = Symbol();
class LessonServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new LessonServiceClient(_singleton);
    return this[_singleton]
  }

  findAllLessonsForModule(courseId, moduleId) {
    return fetch(LESSON_URL.replace('CID',courseId).replace('MID',moduleId))
      .then(response => (
        response.json()
      ))
  }
}

export default LessonServiceClient;