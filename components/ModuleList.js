import React, {Component} from 'react'
import {View} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ModuleServiceClient from "../services/ModuleServiceClient";

class ModuleList extends Component {
  static navigationOptions = {title: 'Modules'};
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
      courseId: 1
    };
    this.moduleService = ModuleServiceClient.instance;
  }

  componentDidMount() {
    const courseId = this.props.navigation.getParam("courseId", 1);
    this.moduleService.findAllModulesForCourse(courseId)
      .then(modules => this.setState({modules: modules}))
      .catch(error => (error));
  }

  render() {
    return(
      <View style={{padding: 15}}>
        {this.state.modules.map((module, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("LessonList", {courseId:
                this.state.courseId, moduleId: module.id})}
            key={index}
            title={module.title}/>
        ))}
      </View>
    )
  }
}
export default ModuleList