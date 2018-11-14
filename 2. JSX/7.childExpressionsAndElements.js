// <Hello
//     <First />
//     <Second />
// </Hello>

// // Hide or display child components

// function ConditionalDisplay(props) {
//     return <div>
//         {props.isVisible ? props.children: null}
//     </div>
// }
// ConditionalDisplay.propTypes = {
//     isVisible: PropTypes.bool.isRequired
// };

// <ConditionalDisplay isVisible={state.showSum}>
//     <h1>A <span>Sum</span>
//     </h1>
//     <Sum a={4} b={2} />
// </ConditionalDisplay>

// Example

import ReactDOM from 'react-dom';
import React from 'react';
import proptypes from 'prop-types';

function Sum({ a, b }) {
  return (
    <h1>
      {a} + {b} = {a + b}
    </h1>
  );
}

function ConditionalDisplay(props) {
  return <div>{props.isVisible ? props.children : null}</div>;
}

ConditionalDisplay.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const state = {
  showSum: true
};

function render() {
  ReactDOM.render(
    <CondtionalDisplay isVisible={state.showSum}>
      <h1>
        1 <span>Sum</span>
      </h1>
      <Sum a={4} b={2} />
    </CondtionalDisplay>,
    document.getElementById('root')
  );
}

setInterval(() => {
  state.showSum = !state.showSum;
  render();
}, 2000);
