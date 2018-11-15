// React Router
// Client-side router for React
// Conditional rendering based on routes
// Supports path updates

// <Route exact path="/" component={Welcome} />
// <Route exact path="/about" component={About} />

// // using /: we specify that the segment is a variable, the id supplied will be made avaiable to the single component
// <Route exact path="/:id" component={Single}/>

// function Single({match}) {
//     return <div>{match.params.id}</div>
// }

// https://codepen.io/liammclennan/pen/pVjRRN?editors=0010

const { BrowserRouter, Route, Link } = ReactRouterDOM;

const characters = {
  'lady-glasses':
    'https://s.pluralsight.com/authorkit/img/People/Gray/Geek_Female_Circle_Gray.png',
  'tie-guy':
    'https://s.pluralsight.com/authorkit/img/People/Gray/Male_1_Circle_Gray.png'
};

function Character({ match }) {
  const imgUrl = characters[match.params.character].replace(
    /Gray/g,
    match.params.color
  );
  return (
    <div>
      <img src={imgUrl} />
    </div>
  );
}

const Dashboard = () => (
  <div style={{ width: '400px', height: '400px' }}>
    <div className="cell">
      <Route path="/top/left/:character/:color" component={Character} />
    </div>
    <div className="cell">
      <Route path="/top/right/:character/:color" component={Character} />
    </div>
    <div className="cell">
      <Route path="/bottom/left/:character/:color" component={Character} />
    </div>
    <div className="cell">
      <Route path="/bottom/right/:character/:color" component={Character} />
    </div>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <div>
      <aside>
        {Object.keys(characters).map(name =>
          ['/top/left/', '/top/right/', '/bottom/left/', '/bottom/right/'].map(
            corner =>
              ['Gray', 'Green', 'Orange', 'Purple'].map(color => (
                <Link
                  to={`${corner}${name}/${color}`}
                >{`${corner}${name}/${color}`}</Link>
              ))
          )
        )}
      </aside>

      <main>
        <Route path="/" component={Dashboard} />
        <Route path="/top" render={() => <div>Something at the top</div>} />
        <Route
          path="/bottom"
          render={() => <div>Something at the bottom</div>}
        />
      </main>
    </div>
  </BrowserRouter>,
  document.getElementById('app')
);
