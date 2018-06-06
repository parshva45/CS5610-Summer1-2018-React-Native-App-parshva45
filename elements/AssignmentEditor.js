import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {
  FormLabel, FormInput, FormValidationMessage
}
  from 'react-native-elements'

class AssignmentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      points: 0
    }
  }

  componentDidMount() {
    const assignment = this.props.navigation.getParam("assignment");
    this.setState({
      courseId: courseId
    })
    fetch('http://10.0.0.183:8080/api/course/' + courseId + '/module')
      .then(response => (response.json()))
      .then(modules => this.setState({modules: modules}))
      .catch(error => (error));
  }

  updateForm(newState) {
    this.setState(newState)
  }

  render() {
    return (
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({title: text})
        }/>
        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({points: text})
        }/>
        <FormValidationMessage>
          Points is required
        </FormValidationMessage>

        <Button style={{padding: 15}}
                backgroundColor="green"
                color="white"
                title="Save"/>
        <Button backgroundColor="red"
                color="white"
                title="Cancel"/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>

      </View>
    )
  }
}

export default AssignmentEditor