const title = 'LuxUI Application';

require('./server')
  .endpoint('/', {
    GET: (request, response) => {
      response.body = {
        links: [
          { href: '/', rel: ['index', 'self'], title },
          // #1
          { href: '/home', rel: ['section'], title: 'Home' },
        ],
        title,
      };
      response.status = 200;
    },
  })
  .start(8888);
