import 'es6-symbol/implement';

const MODULE_URL = "http://10.0.0.183:8080/api/course/CID/module";

let _singleton = Symbol();
class ModuleServiceClient {
  constructor(singletonToken) {
    if (_singleton !== singletonToken)
      throw new Error('Cannot instantiate directly.');
  }

  static get instance() {
    if (!this[_singleton])
      this[_singleton] = new ModuleServiceClient(_singleton);
    return this[_singleton]
  }

  findAllModulesForCourse(courseId) {
    return fetch(MODULE_URL.replace('CID',courseId))
      .then(response => (
        response.json()
      ))
  }
}

export default ModuleServiceClient;