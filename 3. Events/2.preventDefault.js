<input
  type="checkbox"
  onClick={e => {
    e.preventDefault();
  }}
/>;

// for example :

import React from 'react';
import ReactDOM from 'react-dom';

function Nocheckbox() {
  return (
    <input
      type="checkbox"
      onClick={e => {
        e.preventDefault();
      }}
    />
  );
}

ReactDOM.render(<Nocheckbox />, document.getElementById('root'));

// Another example

import React from 'react';
import ReactDOM from 'react-dom';

class Reloader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.onChar = this.onChar.bind(this);
    this.onGoTime = this.onGoTime.bind(this);
  }
  onChar(event) {
    this.setState({ content: event.target.value });
  }
  onGoTime(event) {
    if (this.state.content !== 'reload') {
      event.preventDefault();
    }
  }
  render() {
    return (
      <form onSubmit={this.onGoTime}>
        <input type="text" value={this.state.content} onChange={this.onChar} />
        <input type="submit" value="Go Time" />
      </form>
    );
  }
}

ReactDOM.render(<Reloader />, document.getElementById('root'));
