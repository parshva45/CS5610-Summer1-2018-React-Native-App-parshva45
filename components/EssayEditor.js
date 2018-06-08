import React from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import {Text, FormInput, FormLabel, FormValidationMessage, Button} from 'react-native-elements';
import EssayServiceClient from "../services/EssayServiceClient";
class EssayEditor extends React.Component {

  static navigationOptions = {
    title: "Essay Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      points: "",
      subtitle: "",
      question: "",
      preview: false
    };
    this.updateQuestion = this.updateQuestion.bind(this);
    this.essayService = EssayServiceClient.instance;
  }

  componentDidMount() {
    let question = this.props.navigation.getParam('question', 1);
    this.setState({question: question});
    this.setState({
      title: question.title,
      description: question.description,
      points: question.points.toString(),
      subtitle: question.subtitle
    })
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
      questionType: 'ESS'
    };

    this.essayService.updateQuestion(this.state.question.id, question)
      .then(() => this.props.navigation.state.params.onNavigateBack())
      .then(() => this.props.navigation.goBack())
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

          <View style={{paddingBottom: 15, paddingTop: 15}}>
            <Button backgroundColor="green"
                    color="white"
                    title="Submit Essay Question"
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
          <Text h5>Essay Answer</Text>
          <TextInput multiline={true}
                     numberOfLines={5}/>
        </View>

        <View style={{paddingBottom: 30, paddingTop: 15}}>
          <Button backgroundColor="blue"
                  color="white"
                  title="Submit Essay"/>
        </View>

      </ScrollView>
    )
  }


}

export default EssayEditor;