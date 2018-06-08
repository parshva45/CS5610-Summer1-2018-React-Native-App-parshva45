import React from 'react';
import {Text, Button, ListItem} from 'react-native-elements';
import {View, Picker, ScrollView} from 'react-native';
import QuestionServiceClient from "../services/QuestionServiceClient";

class ExamEditor extends React.Component {

  static navigationOptions = {
    title: "Exam Editor"
  };

  constructor(props) {
    super(props);
    this.state = {
      examId: '',
      exam: '',
      questionType: 'ESS',
      questions: []
    };
    this.questionService = QuestionServiceClient.instance;
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  getAllQuestions() {
    const examId = this.props.navigation.getParam("exam").id;
    this.questionService.findAllQuestionsByExam(examId)
      .then(questions => (this.setState({questions: questions})))
  }

  componentDidMount() {
    const exam = this.props.navigation.getParam("exam", {});
    this.setState({examId: exam.id, exam: exam});
    this.getAllQuestions();
  }

  addNewQuestion(questionType) {
    this.questionService.addNewQuestion(questionType, this.state.examId)
      .then(() => this.getAllQuestions())
  }

  deleteQuestion(questionId) {
    this.questionService.deleteQuestion(questionId);
    this.getAllQuestions();
  }

  handleOnNavigateBack = () => {
    this.getAllQuestions();
  };

  render() {
    return (
      <ScrollView style={{padding: 15}}>
        <Text h3>{this.state.exam.title}</Text>
        <Text h4>Questions</Text>

        {this.state.questions.map((question) => {
          return (
            <View key={question.id}>

              {question.questionType === 'FIB' &&
              <View>
                <ListItem title={question.title} subtitle={question.subtitle}
                          key={question.id} leftIcon={{name: 'code'}}
                          onPress={() => this.props.navigation.navigate("FillInTheBlankEditor", {
                            question: question, onNavigateBack: this.handleOnNavigateBack
                          })}/>
              </View>}

              {question.questionType === 'TOF' &&
              <View>
                <ListItem title={question.title} subtitle={question.subtitle}
                          key={question.id} leftIcon={{name: 'check'}}
                          onPress={() => this.props.navigation.navigate("TrueOrFalseEditor", {
                            question: question, onNavigateBack: this.handleOnNavigateBack
                          })}/>
              </View>}

              {question.questionType === 'ESS' &&
              <View>
                <ListItem title={question.title} subtitle={question.subtitle}
                          key={question.id} leftIcon={{name: 'subject'}}
                          onPress={() => this.props.navigation.navigate("EssayEditor", {
                            question: question, onNavigateBack: this.handleOnNavigateBack
                          })}
                />
              </View>}

              {question.questionType === 'MCQ' &&
              <View>
                <ListItem title={question.title} subtitle={question.subtitle}
                          key={question.id} leftIcon={{name: 'list'}}
                          onPress={() => this.props.navigation.navigate("MultipleChoiceEditor", {
                            question: question, onNavigateBack: this.handleOnNavigateBack
                          })}/>
              </View>}
            </View>
          )
        })}

        <Text h4 style={{paddingTop: 15}}>Add New Question</Text>

        <Picker style={{padding: 15}}
                onValueChange={(questionType) => {
                  this.setState({questionType: questionType})
                }} selectedValue={this.state.questionType}>
          <Picker.Item value="FIB" label="Fill in the blanks"/>
          <Picker.Item value="TOF" label="True or false"/>
          <Picker.Item value="ESS" label="Essay"/>
          <Picker.Item value="MCQ" label="Multiple choice"/>
        </Picker>
        <View style={{padding: 15}}>
          <Button title="Add Question"
                  onPress={() => {
                    this.addNewQuestion(this.state.questionType)
                  }}/>
        </View>
        <Text h4 style={{paddingBottom: 15}}></Text>
      </ScrollView>
    )
  }
}

export default ExamEditor;