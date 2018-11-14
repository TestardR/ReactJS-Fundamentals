// to avoid at all cost

import ReactDOM from 'react-dom';
import React from 'react';

function DangerContainer(props) {
  //   return <p>{props.dangerous}</p>;
  return <p dangerouslySetInnerHTML={{ __html: props.dangerous }} />;
}

ReactDOM.render(
  <DangerContainer dangerous="<strong>Hello</strong>" />,
  document.getElementById('root')
);
