/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './src/reducers';
import AppNavigator from './AppNavigator';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/sagas/rootSaga';
import * as NavigationService from './src/services/NavigationService'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  allReducers,
   applyMiddleware(sagaMiddleware),
);
export default class App extends Component{
  constructor(props){
    super(props); 
    this.state = {
      selectedTab : 'home',
    }
  } 
  componentDidMount(){
    NavigationService.setNavigator(this.navigator);
  }
  render(){
    return (
      <Provider store={store}>
        <AppNavigator ref={ nav => {this.navigator = nav}} />
      </Provider>
    );
  
  }

}
sagaMiddleware.run(rootSaga);

