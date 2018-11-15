function Events(props) {
  const clickHandler = synthEvent => {
    console.log(synthEvent);
  };

  return <button onClick={clickHandler}>Make an event</button>;
}

// this code can be simplified
// When you have a function that just forwards parameters to another function
// you can replace the outter function with the inner function

function Events(props) {
  const clickHandler = console.log;

  return <button onClick={clickHandler}>Make an event</button>;
}
