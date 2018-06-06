import React from 'react'
import {ScrollView, View} from 'react-native'
import {Text, Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'

class AssignmentEditor extends React.Component {

  static navigationOptions = {
    title: "Assignment Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      points: "",
      assignment: "",
      preview: false
    };

    this.assignmentService = AssignmentServiceClient.instance;
    this.updateAssignment = this.updateAssignment.bind(this);
  }

  componentDidMount() {
    const assignmentId = this.props.navigation.getParam("assignmentId", 1);
    this.assignmentService.findAssignmentById(assignmentId)
      .then(assignment => (
        this.setState({
          assignment: assignment,
          title: assignment.title,
          description: assignment.description,
          points: assignment.points
        })
      ))
  }

  updateForm(newState) {
    this.setState(newState);
  }

  updateAssignment() {
    let updateAssignment = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points
    };
    this.assignmentService.updateAssignment(this.state.assignment.id, updateAssignment)
      .then(() => this.props.navigation.state.params.onNavigateBack())
      .then(() => this.props.navigation.goBack())
  }


  render() {
    return (
      <ScrollView style={{padding: 15}}>
        {!this.state.preview &&
        <View>
          <FormLabel>Title</FormLabel>
          <FormInput onChangeText={
            text => (this.updateForm({title: text}))
          } value={this.state.assignment.title}/>

          {this.state.title === "" &&
          <FormValidationMessage>
            Title is required
          </FormValidationMessage>}

          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={
            text => (this.updateForm({description: text}))
          } value={this.state.assignment.description}/>

          {this.state.description === "" &&
          <FormValidationMessage>
            Description is required
          </FormValidationMessage>}

          <FormLabel>Points</FormLabel>
          <FormInput onChangeText={
            text => (this.updateForm({points: text}))
          } value={this.state.assignment.points}/>

          {this.state.points === "" &&
          <FormValidationMessage>
            Points is required
          </FormValidationMessage>}

          <Button style={{padding: 15}}
                  backgroundColor="green"
                  color="white"
                  title="Save"/>
          <Button backgroundColor="red"
                  color="white"
                  title="Cancel"/>

        </View>}

        {this.state.preview &&
        <View>
          <Text h3>Preview</Text>
          <Text h2>{this.state.title}</Text>
          <Text>{this.state.description}</Text>
          <Text>{this.state.assignment}</Text>
        </View>}

      </ScrollView>
    )
  }
}

export default AssignmentEditor