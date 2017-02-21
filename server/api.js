const books = require('./books.json');

const { mapToRouteHandler, server } = require('./server');

const port = 8888;

// const geuid = () => Math.random().toString(36).slice(2);
// const mockDB = {};

const routes = [
  {
    path: '/',
    GET: (request, response) => {
      response.body = {
        // actions: [],
        // class: [''],
        // embeded: [],
        links: [
          { href: '/', rel: ['index', 'self'], title: 'LuxUI Application' },
          { href: '/home', rel: ['section'], title: 'Home' },
          { href: '/about', rel: ['section'], title: 'About' },
          { href: '/books', rel: ['collection', 'section'], title: 'Books' },
        ],
        // properties: {},
        title: 'LuxUI Application',
      };
      response.status = 200;
    },
  },
  {
    path: '/books',
    GET: (request, response) => {
      response.body = {
        class: ['collection'],
        entities: books,
        links: [
          { href: '/', rel: ['index'], title: 'LuxUI Application' },
          { href: '/home', rel: ['section'], title: 'Home' },
          { href: '/about', rel: ['section'], title: 'About' },
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
  },
  {
    path: '/books/{ISBN}',
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
        actions: [
          {
            class: ['resource', 'view'],
            fields: [
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
        class: ['item'],
        links: [
          { href: '/', rel: ['index'], title: 'LuxUI Application' },
          { href: '/home', rel: ['section'], title: 'Home' },
          { href: '/about', rel: ['section'], title: 'About' },
          {
            href: '/books',
            rel: ['chapter', 'collection', 'section'],
            title: 'Books'
          },
          {
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
  },
].map(mapToRouteHandler);

server(routes, port);
