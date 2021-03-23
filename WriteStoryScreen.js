import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase'
 
export default class WriteStoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            storyText: '',
        }
    }

    submitStory = () => {
        db.collection('Story').add({
          title: this.state.title,
          author: this.state.author,
          storyText: this.state.storyText,
        })

        this.setState({title: '', author: '', storyText: ''});
        ToastAndroid.show('Your story has been submitted!', ToastAndroid.SHORT);
    }

    render()
    {
        return (
        <KeyboardAvoidingView behavior = "padding" enabled>
            <View style={styles.container}>
                <Header 
                    backgroundColor = {'#2196F3'}
                    centerComponent = {{
                        text : 'Story Hub',
                        style : { color: 'black', fontSize: 30}
                    }}
                />
                <TextInput 
                    placeholder="Type the title of your story here"
                    onChangeText= {(text)=>{
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={styles.title}
                    />
                <TextInput
                    style={styles.author} 
                    placeholder="Type the author's name here"
                    onChangeText= {(text)=>{
                        this.setState({
                            author: text
                        })
                    }}
                    
                    value={this.state.author}
                    />
                <TextInput 
                    style={styles.storyText}
                    multiline={true}
                    placeholder="Write your story and amaze the world here!"
                    onChangeText= {(text)=>{
                        this.setState({
                            storyText: text
                        })
                    }}
                    
                    value={this.state.storyText}
                    />
                
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={this.submitStory}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
      height: 40,
      borderWidth: 2,
      marginTop: 20,
      margin: 10,
      color:'black',
      padding: 6,

  },
  author: {
      height: 40,
      borderWidth: 2,
      margin: 10,
       padding: 6,
  },
  storyText: {
      height: 250,
      borderWidth: 2,
      margin: 10, 
      padding: 6,
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#2196F3',
      width: 80,
      height: 40,
      color:'black',
  },
  buttonText: {
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
  },
});