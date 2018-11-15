// SC is a component that holds the model
// Implements 3 methods : getState() returns the current state, dispatch() applies an intent to the application state, subscribe() register a callback to be called when the application state is altered

// Example STOPWATCH
//https://codepen.io/liammclennan/pen/wjgdyM

// custom state container
const createStore = reducer => {
  let internalState;
  let handlers = [];
  return {
    dispatch: action => {
      internalState = reducer(internalState, action);
      handlers.forEach(h => {
        h();
      });
    },
    subscribe: handler => {
      handlers.push(handler);
    },
    getState: () => internalState
  };
};

// apply intents to the new application state, it holds the default state values
// 3. our container processes the intents through the update function
let container = createStore((model = { running: false, time: 0 }, intent) => {
  const updates = {
    START: model => Object.assign(model, { running: true }),
    STOP: model => Object.assign(model, { running: false }),
    TICK: model =>
      Object.assign(model, { time: model.time + (model.running ? 1 : 0) })
  };
  return (updates[intent] || (() => model))(model);
});

// View display
let view = m => {
  let minutes = Math.floor(m.time / 60);
  let seconds = m.time - minutes * 60;
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  // 2. It dispatches the start/stop intents
  let handler = event => {
    container.dispatch(m.running ? 'STOP' : 'START');
  };

  // 1. Button clicked, activates the onClick event
  return (
    <div>
      <p>
        {minutes}:{secondsFormatted}
      </p>
      <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
    </div>
  );
};

// 5. the change is in the state triggers the subscribe callback handler which rerenders the app
// 6 rerendering pulls the application state from the container
const render = () => {
  ReactDOM.render(view(container.getState()), document.getElementById('root'));
};
container.subscribe(render);

// 4. Same thing happens to this intent dispatched to the container and processes through the update function
setInterval(() => {
  container.dispatch('TICK');
}, 1000);
