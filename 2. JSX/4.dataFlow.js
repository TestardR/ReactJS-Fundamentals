// React components are organized in hierarchy. Data is passed down the hierarchy by passing values into components props.
// Data is passed up the hierarchy by passing values as function arguments to functions passed in props.

import ReactDOM from 'react-dom';
import React from 'react';
import _ from 'lodash';

function ClickyButtons({ numberOfButtons, onSelection }) {
  const makeButton = v => (
    <button key={v} id={v} onClick={event => onSelection(event.target.id)}>
      {v}
    </button>
  );
  return <div>{_.range(1, numberOfButtons + 1).map(makeButton)}</div>;
}

ReactDOM.render(
  <ClickyButtons numberOfButtons={99} onSelection={console.log} />,
  document.getElementById('root')
);
