import React, {Component} from 'react';
import { WebView } from 'react-native-webview';


export default class NewsView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      email : '',
      url : this.props.navigation.state.params.url,
      spinner: false,
      emailValid : true
    };


  }
  render() {
    console.log(this.state.reports)
  

    return (
      <WebView
        source={{ uri: this.state.url }}
        style={{ marginTop: 20 }}
      />
    );
  }
}


