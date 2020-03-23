import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const BACON_IPSUM =
  'Several known coronaviruses are circulating in animals that have not yet infected humans. Common signs of infection include respiratory symptoms, fever, cough etc.';

const CONTENT = [
  {
    title: 'What is Corona Virus?',
    content: BACON_IPSUM,
  },
  {
    title: 'How many days Corona Virus lives?',
    content: BACON_IPSUM,
  },
  {
    title: 'What is the prevention?',
    content: BACON_IPSUM,
  },
  {
    title: 'How to be safe?',
    content: BACON_IPSUM,
  }
];

export default class Faq extends Component {
  state = {
    activeSections: [],
    collapsed: true,
  };


  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined} style={styles.contentText}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
          <Text style={styles.title}>Frequently Asked Questions</Text>

          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
//          expandMultiple={multipleSelect}
            expandMultiple={false}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
          <View style={styles.sourcedByView}>
            <Text>SourcedBy</Text>
            <View style={styles.whoView}>
              {/* <Text style={{color : '#525252', marginBottom : 20}}>SourcedBy</Text> */}
              <Image source={require('../assets/imgs/mark_WHO.png')} ></Image>
              <Text style={{color : '#525252', marginTop : 10}}>World Health Organization</Text>
            </View>

            <View style={styles.whoView}>
              <Image source={require('../assets/imgs/mark_johns.png')} ></Image>
              <Text style={{color : '#525252', marginTop : 10}}>John Hopking University & Medicine</Text>
            </View>            
            <View style={styles.whoView}>
              <Image source={require('../assets/imgs/mark_apple.png')} ></Image>
              <Text style={{color : '#525252', marginTop : 10}}>Apple News</Text>
            </View>  
            <View style={styles.whoView}>
              <Image source={require('../assets/imgs/mark_nhs.png')} ></Image>
              <Text style={{color : '#525252', marginTop : 10}}>NHS</Text>
            </View>              
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebe8e8',
  },
  title: {
    textAlign: 'center',
    color: "#00918A",
    fontSize : 22,
    fontWeight : '600',
    marginBottom : 10

  },
  header: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth : 1,
    borderColor : '#bfbfbf',
    borderRadius : 5,
    marginLeft : 20,
    marginRight : 20,
    marginTop  : 10
  },
  headerText: {
    // textAlign: 'center',
    color : '#525252',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
    marginLeft : 20,
    marginRight : 20,
    
  },
  contentText: {
    color : '#00918A', 
    fontSize : 14, 
    lineHeight : 20, 
    fontWeight : '500'    
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },

  sourcedByView : {
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 30,
    width : '100%'
  },
  whoView : {
    marginTop : 30,
    width : '100%',
    height : 100,
    justifyContent : 'center',
    alignItems : 'center'
  },

});