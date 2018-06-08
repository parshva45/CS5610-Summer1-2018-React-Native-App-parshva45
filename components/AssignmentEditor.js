import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'

class AssignmentEditor extends React.Component {

  static navigationOptions = {
    title: "Assignment Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      points: "",
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
          id: assignment.id,
          title: assignment.title,
          description: assignment.description,
          points: assignment.points.toString()
        })
      ))
  }

  updateForm(newState) {
    this.setState(newState);
  }

  updateAssignment() {
    let updatedAssignment = {
      title: this.state.title,
      text: this.state.title,
      widgetType: "Assignment",
      description: this.state.description,
      points: this.state.points
    };
    this.assignmentService.updateAssignment(this.state.id, updatedAssignment)
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
            text => {
              this.updateForm({title: text})
            }
          } value={this.state.title}/>
          {this.state.title === "" &&
          <FormValidationMessage>
            Title is required
          </FormValidationMessage>}

          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={
            text => (this.updateForm({description: text}))
          } value={this.state.description}/>

          {this.state.description === "" &&
          <FormValidationMessage>
            Description is required
          </FormValidationMessage>}

          <FormLabel>Points</FormLabel>

          <FormInput type='numeric'
                     keyboardType='numeric'
                     onChangeText={
                       text => (this.updateForm({points: text}))
                     } value={this.state.points}/>

          {this.state.points === "" &&
          <FormValidationMessage>
            Points is required
          </FormValidationMessage>}

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="green"
                    color="white"
                    title="Save"
                    onPress={() => (this.updateAssignment())}/>
          </View>
          <Button backgroundColor="red"
                  color="white"
                  title="Cancel"
                  onPress={() => this.props.navigation.navigate('WidgetList')}/>

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="black"
                    color="white"
                    title="Show Just Preview"
                    onPress={() => (this.updateForm({preview: true}))}/>
          </View>

        </View>}

        {this.state.preview &&
        <View style={{paddingBottom: 15, paddingTop: 15}}>
          <Button backgroundColor="black"
                  color="white"
                  title="Show Form"
                  onPress={() => (this.updateForm({preview: false}))}/>
        </View>}
        {!this.state.preview &&
        <Text h3>Preview</Text>}

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <Text h4>{this.state.title}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text h4 style={{alignSelf: 'flex-end'}}>{this.state.points}pts</Text>
          </View>
        </View>

        <View style={{paddingTop: 15}}>
          <Text>{this.state.description}</Text>
        </View>

        <View style={{paddingTop: 15}}>
          <Text h5>Essay Answer</Text>
          <TextInput multiline={true}
                     numberOfLines={5}/>
        </View>

        <View style={{paddingTop: 15}}>
          <Text h5>Upload a file</Text>
          <Button backgroundColor="green"
                  color="white"
                  title="Choose File"/>
        </View>

        <View style={{paddingTop: 15, paddingBottom: 15}}>
          <Text h5>Submit a link</Text>
          <FormInput/>
        </View>

        <Button backgroundColor="red"
                color="white"
                title="Cancel"/>

        <View style={{paddingBottom: 30, paddingTop: 15}}>
          <Button backgroundColor="blue"
                  color="white"
                  title="Submit"/>
        </View>


      </ScrollView>
    )
  }
}

export default AssignmentEditor