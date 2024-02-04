import React from 'react';
import { Routing } from 'pages/Routing';

import './App.css';
import { withProviders } from './providers/withProviders';

const App = () => (
  <Routing />
)

export default withProviders(App);
