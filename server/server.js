const http = require('http');
const qs = require('querystring');

const endpoints = [];

function bodyParser(request, response, continuation) {
  const body = [];

  request
    .on('error', () => {
      response.body = 'Error receiving the request body.';
    })
    .on('data', body.push.bind(body))
    .on('end', () => {
      try {
        if (!body.length) {
          continuation('');
        }

        const buffer = Buffer.concat(body).toString();

        switch (request.headers['content-type']) {
          case 'application/x-www-form-urlencoded; charset=UTF-8':
            continuation(qs.parse(buffer));
            break;

          case 'application/json':
            continuation(JSON.parse(buffer));
            break;

          default:
            response.body = 'Form data encoding not recognized.';
            response.status = 500;
            closeRequest(response);
            break;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        response.body = response.body || 'Error parsing the request body.';
      }
    });
}

function closeRequest(response) {
  switch (parseInt(response.status / 100, 10)) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    case 4:
      response.body = response.body || 'Error';
      break;
    default:
      response.status = response.status || 500;
      response.body = response.body || 'Unknown error.';
      break;
  }

  response.writeHead(response.status, {
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, PATCH, POST, PUT',
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/vnd.siren+json',
  });
  response.end(JSON.stringify(response.body));
}

function mapToRouteHandler(route) {
  const namedParams = (route.path.match(/\{([^}]+?)\}/g) || [])
    .map(m => m.slice(1, -1));

  const pathMatchRegExp =
    new RegExp(`^${route.path.replace(/\{([^}]+?)\}/g, '([^/]+?)')}$`);

  route.match = request =>
    pathMatchRegExp.test(request.url) && route[request.method] && route;

  route.params = ({ url }) =>
    (url.match(pathMatchRegExp) || [])
      .slice(1)
      .reduce((acc, value, key) => {
        acc[namedParams[key]] = value;

        return acc;
      }, {});

  return route;
}

function start(port = 8000) {
  const routes = endpoints.map(mapToRouteHandler);

  function handler(request, response) {
    const matched = routes
      .reduce((acc, route) => acc || route.match(request), false);

    // eslint-disable-next-line max-len, no-console
    console.log(`${request.method} ${request.url} - handler found: ${!!matched}`);

    if (/options/i.test(request.method)) {
      response.status = 200;
      closeRequest(response);
    } else if (!matched) {
      response.body = 'Resource not found.';
      response.status = 404;
      closeRequest(response);
    } else {
      bodyParser(request, response, (body) => {
        request.body = body;

        try {
          request.params = matched.params(request);
          matched[request.method.toUpperCase()](request, response);
        } catch (e) {
          const bar = `${Array(30).join('~')}\n`;
          // eslint-disable-next-line no-console
          console.log(`${bar}Route handler error\n${e}\n${bar}`);
        } finally {
          closeRequest(response);
        }
      });
    }
  }

  http
    .createServer(handler)
    .listen(port);

  // eslint-disable-next-line no-console
  console.log(`Server running at http://127.0.0.1:${port}`);
}

module.exports = {
  endpoint: (path, config) => {
    config.path = path;
    endpoints.push(config);

    return module.exports;
  },
  start,
};
