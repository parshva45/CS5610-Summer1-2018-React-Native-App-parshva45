import React, {Component} from 'react'
import {View, ScrollView, Alert} from 'react-native'
import {Button, ListItem, Text} from 'react-native-elements'
import AssignmentEditor from '../elements/AssignmentEditor'
import AssignmentServiceClient from '../services/AssignmentServiceClient'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'};

  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      lessonId: 1
    };
    this.assignmentService = AssignmentServiceClient.instance;
  }

  componentDidMount() {
    const {navigation} = this.props;
    const lessonId = navigation.getParam("lessonId");
    this.setState({lessonId: lessonId});
    this.assignmentService.findAllAssignmentsForLesson(lessonId)
      .then(assignments => this.setState({assignments: assignments}))
      .catch(error => (error));
  }

  addNewAssignment() {
    let newAssignment = {
      title: "New Assignment Title",
      description: "New Assignment Description",
      points: 100,
      text: "New Assignment Text",
      widgetType: "Assignment"
    };
    return this.assignmentService.addAssignment(this.state.lessonId, newAssignment)
      .then((response) => (response.json()))
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

  render() {
    return (

      <ScrollView style={{padding: 15}}>


        <Text h4 style={{paddingLeft: 15}}>
          Assignments
        </Text>

        {this.state.assignments.map((assignment, index) => (
          <ListItem
            // onPress={() => this.props.navigation
            //   .navigate("AssignmentEditor", {assignment: assignment})}
            key={index}
            subtitle={assignment.description}
            title={assignment.title}/>
        ))}

        <View style={{padding: 15}}>
          <Button title="Add Assignment"
                  onPress={() => this.addNewAssignment()}/>
        </View>

      </ScrollView>
    )
  }
}

export default WidgetList