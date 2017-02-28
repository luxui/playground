import React from 'react'; // `React` must be in scope when using JSX
import lux from '@luxui/lux';

const app = lux({
  apiRoot: 'http://0.0.0.0:8888',
  renderRoot: document.getElementById('root'),
});

const home = () => (
  <div>
    <h1>Welcome</h1>
    <p>Welcome to the Home page.</p>
  </div>
);

function formatDate(date, sep = '-') {
  const p = num => String(`0${num}`).slice(-2);

  return [date.getFullYear(), p(date.getMonth() + 1), p(date.getDate())]
    .join(sep);
}

// #2
const DateComponent = ({ name, title, value }) => {
  const Wrapper = app.component('Lux.Form.FieldWrapper');

  const inputAttrs = {
    defaultValue: formatDate(new Date(value)),
    name,
    title,
    type: 'date',
  };

  return (
    <Wrapper>
      <label htmlFor={name}>{title}</label>
      <input {...inputAttrs} />
    </Wrapper>
  );
};
DateComponent.propTypes = {
  name: React.PropTypes.string,
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

app
  // #3
  .component('date', DateComponent)
  .page('/', home)
  .page('/home', home)
  .visit(lux.luxPath(window.location.pathname || '/home'));
