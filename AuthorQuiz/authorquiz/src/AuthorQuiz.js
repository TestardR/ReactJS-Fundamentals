import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// to connect our app to the redux store we use the connect function
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

// onClick : this is the component from which the onClick event starts
function Book({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

// onClick : we pass the props from Book to its parents with a specific propname
// props have become complicated, our app depends on them functionning correctly, we need to define their proptypes
function Turn({ author, books, highlight, onAnswerSelected }) {
  function highlightToBgColor(highlight) {
    const mapping = {
      none: '',
      correct: 'green',
      wrong: 'red'
    };
    return mapping[highlight];
  }
  return (
    <div
      className="row turn"
      style={{ backgroundColor: highlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}
Turn.propTypes = {
  // author is an object, we define its form
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ show, onContinue }) {
  return (
    <div className="row continue">
      {show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Footer() {
  return (
    <div id="fotter" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from Wiki Commons and are in Public Domain
        </p>
      </div>
    </div>
  );
}
// content of the current store that we need for the AuthorQuiz component
function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}
// events that come out of the AuthorQuiz to actions that we want to publish to the store
function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: answer => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE' });
    }
  };
}

// onClick : we pass the props up to the parent (Book => Turn => AuthorQuiz)
// connect to connect AuthoQuiz to the store
const AuthorQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
  // we can see below the props that we need to provide to AuthoQuiz
)(function({ turnData, highlight, onAnswerSelected, onContinue }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue show={highlight === 'correct'} onContinue={onContinue} />
      <p>
        <Link to="/add">Add an author</Link>
      </p>
      <Footer />
    </div>
  );
});
export default AuthorQuiz;
