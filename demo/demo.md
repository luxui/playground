# LuxUI Demo

LuxUI is a UI rendering framework for hypermedia APIs. The goal of LuxUI is to
put the API in ***complete*** control of application logic. The strategy, of
LuxUI, enforces a strict separation between the concepts of "what" and "how" to
render the UI.


## Why?

  - A compelling reason
    I wanted to create a compelling reason for API developers to adopt hypermedia.
  - Automate... me
    The best way I thought of doing this was... to automate... me. I am a UI
    developer who no longer wants to build - repetitive - UIs; or see others do
    it when I don't think that they need to.
  - Empower everyone
    I believe hypermedia APIs have great potential for centralizing application
    control and providing consistent abstraction layers that empower each side,
    of the API contract, to control their own destinies.


## Outline

  1. Application setup
    1. First API Resource (root)
    2. Import LuxUI
    3. LuxUI Configuration
    4. Start the application
    5. Custom Styles
  2. Static Page
    1. Add the route to the API `links`
    2. Define a ReactJS component
    3. Import ReactJS (for JSX)
    4. Static page routes
    5. Default page (window.location)
  3. API Collection resource
    1. Link object in "root" resource
    2. New endpoint
      1. Resource `class`
      2. `entities`
      3. `properties`
  4. API Item resource
    1. NOTE: No link is "root" resource
    2. New Endpoint
      1. Resource `class`
      2. `actions`
      3. Action `class`
      4. Action `fields`
      5. Link "self"
  5. Custom components
    1. Add the field entry in the API
    2. Define a new ReactJS component
    3. Register the new component with the application
