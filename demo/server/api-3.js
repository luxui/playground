const books = require('./books.json');

const title = 'LuxUI Application';

require('./server')
  .endpoint('/', {
    GET: (request, response) => {
      response.body = {
        links: [
          { href: '/', rel: ['index', 'self'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          // #1
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
  // #2
  .endpoint('/books', {
    GET: (request, response) => {
      response.body = {
        class: ['collection'],                             // <----- NOTE
        entities: books,                                   // <----- NOTE
        links: [
          { href: '/', rel: ['index'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section', 'self'],
            title: 'Books'
          },
        ],
        properties: {                                      // <----- NOTE
          count: books.length,
          paged: true,
        },
        title: 'So Many Books',
      };
      response.status = 200;
    },
  })
  .start(8888);
