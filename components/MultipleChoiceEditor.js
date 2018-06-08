import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text, FormInput, FormValidationMessage, FormLabel, Button, CheckBox} from 'react-native-elements';
import MultipleChoiceServiceClient from "../services/MultipleChoiceServiceClient";
import Icon from "react-native-elements/src/icons/Icon";

class MultipleChoiceEditor extends React.Component {

  static navigationOptions = {
    title: "Multiple Choice Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      points: "",
      subtitle: "",
      question: "",
      correctOption: "",
      options: [],
      preview: false,
      newOption: "",
      previewAnswer: ""
    };
    this.updateQuestion = this.updateQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.mcqService = MultipleChoiceServiceClient.instance;
  }

  componentDidMount() {
    let question = this.props.navigation.getParam('question', 1);
    this.setState({question: question});
    this.setState({
      title: question.title,
      description: question.description,
      points: question.points.toString(),
      subtitle: question.subtitle,
      correctOption: question.correctOption,
    });
    let options = question.options.split('|');
    this.setState({options: options})
  }

  componentWillReceiveProps(newProps) {
    let options = newProps.getParam('question', 1).options.split('|');
    this.setState({options: options})
  }

  updateForm(newState) {
    this.setState(newState);
  }

  deleteOption(title) {
    let str = [];
    let count = 0;
    for (let i = 0; i < this.state.options.length; i++)
      if (this.state.options[i] !== title)
        str[count++] = this.state.options[i];
    this.setState({options: str})
  }

  updateQuestion() {
    let str = '';
    for (let i = 0; i < this.state.options.length; i++) {
      str = str + "|" + this.state.options[i];
    }

    let question = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      subtitle: this.state.subtitle,
      correctOption: this.state.correctOption + 1,
      options: str,
      questionType: 'MCQ'
    };

    this.mcqService.updateQuestion(this.state.question.id, question)
      .then(() => this.props.navigation.state.params.onNavigateBack())
      .then(() => this.props.navigation.goBack())
  }

  addOption() {
    let options = this.state.options;
    options[options.length] = this.state.newOption;
    this.setState({options: options})
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

          <FormLabel>Options</FormLabel>
          {this.state.options.map((str, index) => (
            <View style={{flexDirection: 'row'}} key={index}>
              {str !== '' && <CheckBox title={str} key={index}
                                       onPress={() => this.updateForm({correctOption: index})}
                                       checked={this.state.correctOption == index}/>}
              {str !== '' && <Icon name={'delete'} onPress={() => this.deleteOption(str)}/>}
            </View>
          ))}

          <FormLabel>New Option</FormLabel>
          <FormInput onChangeText={
            text => {
              this.updateForm({newOption: text})
            }
          }/>
          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="blue"
                    color="white"
                    title="Add Option"
                    onPress={() => (this.addOption())}/>
          </View>

          {this.state.description === "" &&
          <FormValidationMessage>Description is required</FormValidationMessage>}

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="green"
                    color="white"
                    title="Submit Multiple Choice Question"
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
          <Text>Options</Text>
          <View>
            {this.state.options.map((str, index) => (
              <View key={index}>
                {str !== '' &&
                <CheckBox title={str} key={index}
                          onPress={() => {
                            this.setState({previewAnswer: index})
                          }}
                          checked={this.state.previewAnswer == (index)}
                />}
              </View>
            ))}
          </View>
        </View>

        <View style={{paddingBottom: 30, paddingTop: 15}}>
          <Button backgroundColor="blue"
                  color="white"
                  title="Submit Multiple Choice Answer"/>
        </View>

      </ScrollView>
    )
  }


}


export default MultipleChoiceEditor;