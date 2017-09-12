// #3 - Import ReactJS (for JSX)
import React from 'react'; // `React` must be in scope when using JSX

import lux from '@luxui/lux';

const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

// #2 - Define a ReactJS component
const home = () => (
  <div>
    <h1>Welcome</h1>
    <p>Welcome to the Home page.</p>
  </div>
);

app
  // #4 - Static page routes
  .page('/', home)
  .page('/home', home)
  // #5 - Default page (window.location)
  .visit(lux.luxPath(window.location.pathname || '/home'));
