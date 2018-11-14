// const props = { a: 4, b: 2 };
// const element = <Sum {...props} />;

function Sum(props) {
  return (
    <h1>
      {props.a} + {props.b} = {props.a + props.b}
    </h1>
  );
}

const props = { a: 4, b: 2 };
const element = <Sum {...props} />;

ReactDOM.render(element, document.getElementById('root'));

// 4 + 2 = 6
