# LuxUI Demo

LuxUI is a UI rendering framework for hypermedia APIs with the goal of giving
***complete*** control of all application logic to the API. The strategy LuxUI
uses enforces a strict separation between the concepts of "what" (server) and
"how" (client) to render the UI.


## Why?

Why exactly did I create LuxUI?

  1. **Create the carrot.**
    Hypermedia is not simple and developers haven't readily adopted it. LuxUI
    is my attempt to create a compelling reason for API developers to employ
    hypermedia to alleviate the need to create UIs for APIs.
  2. **Empower everyone.**
    API developers do not need to be UI engineers; and vice versa. LuxUI aims
    to empower both side of application development to do their best work and
    as independently as possible.
  3. **Stop the madness.**
    Many problems have been solved in the application UI space: simple
    information display, linking to resources, basic form data-entry (fields).
    LuxUI aims to remove the need to re-implement solutions to solved problems
    and leverage reusable/shareable components.


## Outline

  1. Application setup ((api-1.js -> api.js & index-1.js -> index.js))
    1. First API Resource (root)
    2. Import LuxUI
    3. LuxUI Configuration
    4. Start the application
    5. Custom Styles
  2. Static Page ((api-2.js -> api.js & index.js -> index.js))
    1. Add the route to the API `links`
    2. Define a ReactJS component
    3. Import ReactJS (for JSX)
    4. Static page routes
    5. Default page (window.location)
  3. API Collection resource ((api-3.js -> api.js))
    1. Link object in "root" resource
    2. New endpoint
      1. Resource `class`
      2. `entities`
      3. `properties`
  4. API Item resource ((api-4.js -> api.js))
    1. New Endpoint
      1. Resource `class`
      2. `actions`
      3. Action `class`
      4. Action `fields`
      5. Link "self"
  5. Custom components ((api-5.js -> api.js && index-5.js -> index.js))
    1. Add the field entry in the API
    2. Define a new ReactJS component
    3. Register the new component with the application
  6. Form actions ((api-6.js -> api.js))
    1. Submit the form
    2. Delete the resource
  7. Action handlers ((api-7.js -> api.js))
    1. Update resource
