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
    console.log("tabs");
  } 
  render(){
    return (
      <Provider store={store}>
      <AppNavigator />
      </Provider>
    );
  
  }

}
sagaMiddleware.run(rootSaga);

