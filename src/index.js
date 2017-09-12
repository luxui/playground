// #2 - Import LuxUI
import lux from '@luxui/lux';

// #3 - LuxUI Configuration
const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

app
  // #4 - Start the application
  .visit();
