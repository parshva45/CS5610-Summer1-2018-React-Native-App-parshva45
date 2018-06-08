import React from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Text, FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';
import FillInTheBlankServiceClient from "../services/FillInTheBlankServiceClient";

class FillInTheBlankEditor extends React.Component {

  static navigationOptions = {
    title: "Fill In The Blank Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      title: "",
      description: "",
      points: "",
      subtitle: "",
      variables: "",
      preview: false,
      answers: "",
      parsed: ""
    };
    this.updateQuestion = this.updateQuestion.bind(this);
    this.parseQuestion = this.parseQuestion.bind(this);
    this.fillInTheBlankService = FillInTheBlankServiceClient.instance;
  }

  componentDidMount() {
    let question = this.props.navigation.getParam('question', 1);
    this.setState({question: question});
    this.setState({
      title: question.title,
      description: question.description,
      points: question.points.toString(),
      subtitle: question.subtitle,
      variables: question.variables,
      answers: question.answers
    });
    let parsed;
    if (question.answers)
      parsed = question.answers.replace(/[[a-zA-Z]*=[0-9a-zA-Z]*]/gi, '-|-');
    else
      parsed = '';
    this.setState({parsed: parsed})
  }

  updateForm(newState) {
    this.setState(newState);
  }

  updateQuestion() {

    let question = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      subtitle: this.state.subtitle,
      questionType: 'FB',
      variables: this.state.variables,
      answers: this.state.answers
    }

    this.fillInTheBlankService.updateQuestion(this.state.question.id, question)
      .then(() => this.props.navigation.state.params.onNavigateBack())
      .then(() => this.props.navigation.goBack())

  }

  parseQuestion(answers) {

    let matching = answers.match(/[[a-zA-Z]*=\d]/gi);
    let variables = '';
    for (let i = 0; matching !== null && i < matching.length; i++) {
      let str = matching[i].replace("[", "").replace("]", "");
      variables = variables + ' ' + str;
    }
    this.setState({variables: variables, answers: answers})
    let parsed = answers.replace(/[[a-zA-Z]*=[0-9a-zA-Z]*]/gi, '\n-|-\n')
    this.setState({parsed: parsed})
  }

  render() {
    return (
      <ScrollView>
        {!this.state.preview &&
        <ScrollView>

          <FormLabel>Title</FormLabel>
          <FormInput onChangeText={
            text => {
              this.updateForm({title: text})
            }
          } value={this.state.title}/>
          {this.state.title === "" &&
          <FormValidationMessage>Title is required</FormValidationMessage>}

          <FormLabel>Subtitle</FormLabel>
          <FormInput onChangeText={
            text => {
              this.updateForm({subtitle: text})
            }
          } value={this.state.subtitle}/>
          {this.state.subtitle === "" &&
          <FormValidationMessage>Subtitle is required</FormValidationMessage>}

          <FormLabel>Description</FormLabel>
          <FormInput onChangeText={
            text => {
              this.updateForm({description: text})
            }
          } value={this.state.description}/>
          {this.state.description === "" &&
          <FormValidationMessage>Description is required</FormValidationMessage>}

          <FormLabel>Points</FormLabel>
          <FormInput type='numeric'
                     keyboardType='numeric'
                     onChangeText={
                       text => (this.updateForm({points: text}))
                     } value={this.state.points}/>
          {this.state.points === "" &&
          <FormValidationMessage>Points is required</FormValidationMessage>}

          <FormLabel>Enter Questions of the form 2 + 2 = [four=4]</FormLabel>
          <FormInput onChangeText={
            text => {
              this.parseQuestion(text)
            }
          } value={this.state.answers}/>
          {this.state.answers === "" &&
          <FormValidationMessage>Question is required</FormValidationMessage>}

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="green"
                    color="white"
                    title="Submit Fill In The Blank Question"
                    onPress={() => (this.updateQuestion())}/>
          </View>

          <Button backgroundColor="red"
                  color="white"
                  title="Cancel"
                  onPress={() => this.props.navigation.goBack()}/>

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="black"
                    color="white"
                    title="Show Just Preview"
                    onPress={() => (this.updateForm({preview: true}))}/>
          </View>


        </ScrollView>}

        {this.state.preview &&
        <View style={{paddingBottom: 15, paddingTop: 15}}>
          <Button backgroundColor="black"
                  color="white"
                  title="Show Form"
                  onPress={() => (this.updateForm({preview: false}))}/>
        </View>}

        {!this.state.preview &&
        <Text h2>Preview</Text>}

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <Text h3>{this.state.title}</Text>
          </View>
          <View style={{flex: 2}}>
            <Text h3 style={{alignSelf: 'flex-end'}}>{this.state.points}pts</Text>
          </View>
        </View>

        <View style={{paddingTop: 15}}>
          <Text h4>{this.state.subtitle}</Text>
        </View>

        <View style={{paddingTop: 15}}>
          <Text>{this.state.description}</Text>
        </View>

        <View style={{paddingTop: 15}}>
          <Text h5>Question:</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {this.state.parsed.split('-').map((str, index) => {
            return (
              <View key={index}>
                {str === "|" && <TextInput style={{width: 50, textAlign: 'center'}}/>}
                {str !== "|" && <Text>{str}</Text>}
              </View>
            )
          })
          }
        </View>

        <View style={{paddingBottom: 30, paddingTop: 15}}>
          <Button backgroundColor="blue"
                  color="white"
                  title="Submit Fill In The Blank Answers"/>
        </View>
      </ScrollView>
    )
  }


}

export default FillInTheBlankEditor;