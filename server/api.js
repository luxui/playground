const title = 'LuxUI Application';

require('./server')
  // #1 - First API Resource (root)
  .endpoint('/', {
    GET: (request, response) => {
      response.body = {
        links: [
          { href: '/', rel: ['index', 'self'], title },


        ],
        title,
      };
      response.status = 200;
    },
  })
  .start(8888);
