import 'babel-polyfill' // required for fetch

import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route} from 'react-router';

import MainLayout from './components/MainLayout';

ReactDOM.render(
  <MainLayout />,
  document.getElementById('root')
);
