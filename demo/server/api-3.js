const books = require('./books.json');

const title = 'LuxUI Application';

require('./server')
  .endpoint('/', {
    GET: (request, response) => {
      response.body = {
        links: [
          { href: '/', rel: ['index', 'self'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          // #1 - Link object in "root" resource
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section'],
            title: 'Books'
          },
        ],
        title,
      };
      response.status = 200;
    },
  })
  // #2 - New endpoint
  .endpoint('/books', {
    GET: (request, response) => {
      response.body = {
        class: ['collection'],                             // 2.1
        entities: books,                                   // 2.2
        links: [
          { href: '/', rel: ['index'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section', 'self'],
            title: 'Books'
          },
        ],
        properties: {                                      // 2.3
          count: books.length,
          paged: true,
        },
        title: 'So Many Books',
      };
      response.status = 200;
    },
  })
  .start(8888);
