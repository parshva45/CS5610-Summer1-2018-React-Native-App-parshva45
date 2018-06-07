import React, {Component} from 'react'
import {View, ScrollView, Alert} from 'react-native'
import {Button, ListItem, Text, Icon} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'
import ExamServiceClient from '../services/ExamServiceClient'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'};

  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      lessonId: 1,
      exams: []
    };

    this.addNewAssignment = this.addNewAssignment.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.addNewExam = this.addNewExam.bind(this);
    this.deleteExam = this.deleteExam.bind(this);
    this.examService = ExamServiceClient.instance;
    this.assignmentService = AssignmentServiceClient.instance;
  }

  componentDidMount() {
    const lessonId = this.props.navigation.getParam("lessonId", 1);
    this.setState({lessonId: lessonId});
    this.assignmentService.findAllAssignmentsForLesson(lessonId)
      .then(assignments => this.setState({assignments: assignments}))
      .catch(error => (error));
    this.examService.findAllExamsForLesson(lessonId)
      .then(exams => this.setState({exams: exams}))
      .catch(error => (error));
  }

  addNewAssignment() {
    return this.assignmentService.addNewAssignment(this.state.lessonId)
      .then(assignment => {
          this.setState({
            assignments:
              [
                ...this.state.assignments,
                assignment
              ]
          })
        }
      )
  }

  deleteAssignment(assignmentId) {
    this.assignmentService.deleteAssignment(assignmentId);
    this.assignmentService.findAllAssignmentsForLesson(this.state.lessonId)
      .then(assignments => (
        this.setState({assignments: assignments})
      ))
  }

  addNewExam() {
    return this.examService.addNewExam(this.state.lessonId)
      .then(exam => {
          this.setState({
            exams:
              [
                ...this.state.exams,
                exam
              ]
          })
        }
      )
  }

  deleteExam(examId) {
    this.examService.deleteExam(examId);
    this.examService.findAllExamsForLesson(this.state.lessonId)
      .then(exams => (
        this.setState({exams: exams})
      ))
  }

  handleOnNavigateBack = () => {
    this.assignmentService.findAllAssignmentsForLesson(this.state.lessonId)
      .then(assignments => (
        this.setState({assignments: assignments})
      ))
  };

  render() {
    return (
      <ScrollView style={{padding: 15}}>
        <Text h4 style={{paddingLeft: 15}}>
          Assignments
        </Text>
        {this.state.assignments.map((assignment, index) => (
          <ListItem
            onPress={() => (this.props.navigation
              .navigate("AssignmentEditor", {
                assignmentId: assignment.id,
                onNavigateBack: this.handleOnNavigateBack
              }))}
            key={index}
            subtitle={assignment.description}
            title={assignment.title}
            rightIcon={<Icon name={'delete'}
                             onPress={() => this.deleteAssignment(assignment.id)}/>}
          />
        ))}
        <View style={{padding: 15}}>
          <Button title="Add Assignment"
                  onPress={() => this.addNewAssignment()}/>
        </View>

        <Text h4 style={{paddingLeft: 15}}>
          Exams
        </Text>
        {this.state.exams.map((exam, index) => (
          <ListItem
            onPress={() => (this.props.navigation
              .navigate("ExamEditor", {
                exam: exam
              }))}
            key={index}
            title={exam.title}
            rightIcon={<Icon name={'delete'}
                             onPress={() => this.deleteExam(exam.id)}/>}
          />
        ))}
        <View style={{padding: 15}}>
          <Button title="Add Exam"
                  onPress={() => this.addNewExam()}/>
        </View>
      </ScrollView>
    )
  }
}

export default WidgetList