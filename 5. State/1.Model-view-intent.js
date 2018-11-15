// Model-view-intent Architecture

// Model : single object completly describes the state (input)
// View:  function that transforms de model into user interface (output)
// Intent : things user wants to do

// Example with a STOPWATCH
// https://codepen.io/liammclennan/pen/bMgWVG?editors=0010
// Model
// 1. Publish model
const model = {
  running: false,
  time: 110
};

// Intents
let intents = {
  TICK: 'TICK',
  START: 'START',
  STOP: 'STOP',
  RESET: 'REST'
};

// View
const view = model => {
  let minutes = Math.floor(model.time / 60);
  let seconds = model.time - minutes * 60;
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  let handler = event => {
    model = update(model, m.running ? 'STOP' : 'START');
  };
  return (
    <div>
      {minutes}:{secondsFormatted}
      <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button>
    </div>
  );
};

// the new model is assigned to the model identifier
// render is called
// 2. Publish intent
setInterval(() => {
  model = update(model, 'TICK');
  render();
}, 1000);

// 3. apply our intent to modify our model
const update = (model, intent) => {
  const updates = {
    START: model => Object.assign(model, { running: true }),
    STOP: model => Object.assign(model, { running: false }),
    TICK: model =>
      Object.assign(model, { time: model.time + (model.running ? 1 : 0) })
  };
  return updates[intent](model);
  // taking the specific intent and applying it to the current model
};

// we render the output of the view function based on the current model
// 4. Application is rerendered to the view
const render = () => {
  ReactDOM.render(view(model), document.getElementById('root'));
};
