import React from 'react'; // `React` must be in scope when using JSX
import lux from '@luxui/lux';

const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

const about = () => (
  <div>
    <h1>About Us</h1>
    <p>So much to learn.</p>
  </div>
);

const home = () => (
  <div>
    <h1>Welcome</h1>
    <p>Welcome to the Home page.</p>
  </div>
);

app
  .page('/about', about)
  // .page('', home)
  .page('/', home)
  .page('/home', home)
  .visit('/home');
