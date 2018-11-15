// Connects React Components to the application state

// Provider is a react component provided by react-redux, it allows its children to connect to redux store
// connect is a function that enhances react components connecting them to the redux store in the ways specified
// mapStateToProps : to specify what data from the redux store should be provided to the react component as props, connect expects a parameter called mapStateToProps
// mapDispatchToProps: function from Redux's dispatch function to a set of props for the component. In practice, this provides a place to map component events to redux store actions.

// Example STOPWATCH

// https://codepen.io/liammclennan/pen/QrpLod?editors=0011

// 5. React-Redux checks if the state has changed at all, we have to make sure that our reducer function
//  always return a new object {} if the app state has changed.
let container = Redux.createStore(
  (model = { running: false, time: 0 }, action) => {
    const updates = {
      START: model => Object.assign({}, model, { running: true }),
      STOP: model => Object.assign({}, model, { running: false }),
      TICK: model =>
        Object.assign({}, model, { time: model.time + (model.running ? 1 : 0) })
    };
    return (updates[action.type] || (() => model))(model);
  }
);

// 2. we pass the state
const mapStateToProps = state => state;
// 3. This is where we need to map our events that we want to raise to dispatch and props
// onStart and onStop become props that we can use inside the Stopwatch component
const mapDispatchToProps = (dispatch, props) => ({
  onStart: () => {
    dispatch({ type: 'START' });
  },
  onStop: () => {
    dispatch({ type: 'STOP' });
  }
});

const Stopwatch = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(props => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60;
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;

  // 4. we can set our onStart and onStop props on the onClick handler
  return (
    <div>
      <p>
        {minutes}:{secondsFormatted}
      </p>
      <button onClick={props.running ? props.onStop : props.onStart}>
        {props.running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
});

//1. When the Stopwatch component renders its data is supplied by Provider mapping the store to
// the component via mapStateToProps function
ReactDOM.render(
  <ReactRedux.Provider store={container}>
    <Stopwatch />
  </ReactRedux.Provider>,
  document.getElementById('root')
);

setInterval(() => {
  container.dispatch({ type: 'TICK' });
}, 1000);
