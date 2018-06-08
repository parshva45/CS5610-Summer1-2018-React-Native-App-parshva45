import React from 'react';
import {StatusBar, ScrollView, View} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import AssignmentEditor from './components/AssignmentEditor'
import ExamEditor from './components/ExamEditor'
import TrueOrFalseEditor from './components/TrueOrFalseEditor'
import EssayEditor from './components/EssayEditor'
import FillInTheBlankEditor from './components/FillInTheBlankEditor'
import MultipleChoiceEditor from './components/MultipleChoiceEditor'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <View style={{paddingTop: 25}}>
        <Button title="Course List"
                onPress={() => this.props.navigation.navigate("CourseList")}/>
        </View>
      </ScrollView>
    )
  }
}

const App = createStackNavigator({
  Home,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  AssignmentEditor,
  ExamEditor,
  FillInTheBlankEditor,
  TrueOrFalseEditor,
  EssayEditor,
  MultipleChoiceEditor
});

export default App;
