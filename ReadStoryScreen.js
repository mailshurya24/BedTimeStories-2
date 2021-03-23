import React from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import {SearchBar} from 'react-native-elements';
import firebase from 'firebase';
import db from './config';

export default class ReadStoryScreen extends React.Component {
  constructor()
  {
    super();
    this.state = 
    {
      search: '',
      allStories: [],
      dataInDatabase: [],
      lastVisibleStory: null
    }
  }

  updateSearchCriteria = (searchCriteria) =>
  {
    this.setState({search: searchCriteria});
  }

  getStories = async() =>
  {
    try
    {
      var availableStories = [];
      var stories = await db.collection("Story").get()
      .then((Snapshot)=>{Snapshot.forEach((doc)=>{
        availableStories.push(doc.data());
      })
      
      this.setState({allStories:availableStories});
    })
    }

    catch(error)
    {
      var errorMessage = error.message;
      alert(errorMessage);
    }
  }

  filterSearch = (searchItem) =>
  {
    var requiredData = this.state.allStories.filter((keyword)=>{
      var keywordData = keyword.title
       ?
       keyword.title.toUpperCase()
       :
       ''.toUpperCase();
      var searchData = searchItem.toUpperCase();
      return(keywordData.indexOf(searchData)>-1);
    });

    this.setState({dataInDatabase:requiredData, search: searchItem});
  }

  componentDidMount = async() =>
  {
    //this.getStories();
    var storiesInDatabase = await db.collection("Story").limit(10).get();
    storiesInDatabase.docs.map((doc)=>
    {
      this.setState({
      allStories: [...this.state.allStories, doc.data()], 
      lastVisibleStory: doc})
    })
  }

  getMoreStories = async(searchKeyword) =>
  {
    var moreStories = await db.collection("Story").where("title","==", searchKeyword)
    .startAfter(this.state.lastVisibleStory).limit(10).get();
    
    moreStories.docs.map((doc)=>
    {
      this.setState({
        allStories: [...this.state.allStories, doc.data()], 
        lastVisibleStory: doc})
    })
  }

    render() 
    {
      return (
        <View>
          <KeyboardAvoidingView>
          <View>
            <SearchBar
              placeholder = "Search for a Story..."
              onChangeText = {(text)=>{this.filterSearch(text)}}
              value = {this.state.search}
            />
          </View>

          <ScrollView>
            <View>
             <FlatList
              data = {this.state.allStories}
              renderItem = {({item})=>
                {
                  <View>
                    <Text>
                      {item.title}
                    </Text>

                    <Text>
                      {item.author}
                    </Text>
                  </View>
                }}
              keyExtractor = {(item,index)=>{index.toString(36)}}  
              onEndReached = {this.getMoreStories()}
             />
            </View>
          </ScrollView>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }