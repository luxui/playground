// #3
import React from 'react'; // `React` must be in scope when using JSX
import lux from '@luxui/lux';

const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

// #2
const home = () => (
  <div>
    <h1>Welcome</h1>
    <p>Welcome to the Home page.</p>
  </div>
);

app
  // #4
  .page('/', home)
  .page('/home', home)
  // #5
  .visit(lux.luxPath(window.location.pathname || '/home'));
