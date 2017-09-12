const books = require('./books.json');

const title = 'LuxUI Application';

require('./server')
  .endpoint('/', {
    GET: (request, response) => {
      response.body = {
        links: [
          { href: '/', rel: ['index', 'self'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
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
  .endpoint('/books', {
    GET: (request, response) => {
      response.body = {
        class: ['collection'],
        entities: books,
        links: [
          { href: '/', rel: ['index'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section', 'self'],
            title: 'Books'
          },
        ],
        properties: {
          count: books.length,
          paged: true,
        },
        title: 'So Many Books',
      };
      response.status = 200;
    },
  })
  // #1 - New Endpoint
  .endpoint('/books/{ISBN}', {
    GET: (request, response) => {
      const found = books
        .reduce((acc, book) =>
          acc || (book.fakeISBN === request.params.ISBN && book), false);

      if (!found) {
        response.body = {
          error: new Error('Book not found.'),
        };
        response.status = 404;

        return;
      }

      response.body = {
        actions: [                                         // 1.1
          {
            class: ['resource', 'view'],                   // 1.2
            fields: [                                      // 1.3
              {
                name: 'title',
                title: 'Book Title',
                type: 'text',
                value: found.title,
              },
              {
                name: 'isbn',
                title: 'Book ISBN',
                type: 'text',
                value: found.fakeISBN,
              },
            ],
            name: 'view-item',
            title: found.title,
          }
        ],
        class: ['item'],                                   // 1.4
        links: [
          { href: '/', rel: ['index'], title },
          { href: '/home', rel: ['section'], title: 'Home' },
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section'],
            title: 'Books'
          },
          {                                                // 1.5
            href: `/books/${request.params.ISBN}`,
            rel: ['chapter', 'collection', 'item', 'self'],
            title: found.title
          },
        ],
        properties: found,
        title: found.title,
      };
      response.status = 200;
    },
  })
  .start(8888);
