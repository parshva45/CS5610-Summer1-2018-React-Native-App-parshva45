import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import LessonServiceClient from '../services/LessonServiceClient'

class LessonList extends Component {
  static navigationOptions = {title: 'Lessons'}
  constructor(props) {
    super(props)
    this.state = {
      lessons: [],
      courseId: 1,
      moduleId: 1
    }
    this.lessonService = LessonServiceClient.instance;
  }

  componentDidMount() {
    const courseId = this.props.navigation.getParam("courseId", 1);
    this.moduleService.findAllModulesForCourse(courseId)
      .then(modules => this.setState({modules: modules}))
      .catch(error => (error));
  }


  componentDidMount() {
    const courseId = this.props.navigation.getParam("courseId")
    const moduleId = this.props.navigation.getParam("moduleId")
    this.lessonService.findAllLessonsForModule(courseId,moduleId)
      .then(lessons => this.setState({lessons: lessons}))
      .catch(error => (error));
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.lessons.map(
        (lesson, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("WidgetList", {lessonId: lesson.id})}
            key={index}
            title={lesson.title}/>))}
      </View>
    )
  }
}
export default LessonList