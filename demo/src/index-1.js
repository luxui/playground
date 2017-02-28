// #2
import lux from '@luxui/lux';

// #3
const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

// #4
app
  .visit();
