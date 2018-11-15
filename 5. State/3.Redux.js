// application state container
// useful to implement MVI architecture
// Reducer : function to convert an intent and a state to a new state
// => it reduces the stream of intents to a single object (the application state at a moment in time)
// In redux, intents are actions

// Redux API
// createStore(reducer, initialState)
// getState() returns the current app state from within the store
// dispatch() sends an action to the store to be apply to the current state
// => the action is processed by the reducer to build a new application state
// subscribe() is a callback to be called when the application state held within the store changes.

// Example STOPWATCH

// https://codepen.io/liammclennan/pen/VxpZzV?editors=0011

let container = Redux.createStore(
  (model = { running: false, time: 0 }, action) => {
    const updates = {
      START: model => Object.assign(model, { running: true }),
      STOP: model => Object.assign(model, { running: false }),
      TICK: model =>
        Object.assign(model, { time: model.time + (model.running ? 1 : 0) })
    };
    return (updates[action.type] || (() => model))(model);
  }
);

let view = m => {
  let minutes = Math.floor(m.time / 60);
  let seconds = m.time - minutes * 60;
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  let handler = event => {
    container.dispatch(m.running ? { type: 'STOP' } : { type: 'START' });
  };

  return (
    <div>
      <p>
        {minutes}:{secondsFormatted}
      </p>
      <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
    </div>
  );
};

const render = () => {
  ReactDOM.render(view(container.getState()), document.getElementById('root'));
};
container.subscribe(render);

setInterval(() => {
  container.dispatch({ type: 'TICK' });
}, 1000);
