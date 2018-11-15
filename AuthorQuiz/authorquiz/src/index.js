import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AddAuthorForm from './AddAuthorForm';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

function getTurnData(authors) {
  // collection of all books in our data set by reducing the authors collection and concatenating each author's books into a larger set
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  // shuffle the list in a random order
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  // select 4 books
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find(
      author => author.books.some(title => title === answer)
      // choosing the author
      // that has written a book with the same name as the answer we selected
    )
  };
}

function resetState() {
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}

let state = resetState();

function onAnswerSelected(answer) {
  // among all the books, is there one matching the answer ?
  const isCorrect = state.turnData.author.books.some(book => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  // we have to rerender react
  render();
}

function App() {
  return (
    <AuthorQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }}
    />
  );
}

// we created a wrapper, intermediary to specify props
const AuthorWrapper = withRouter(({ history }) => (
  <AddAuthorForm
    onAddAuthor={author => {
      authors.push(author);
      history.push('/');
    }}
  />
));

// onClick : passing the prop to the parent, to define the function at the higher level
// function to rerender react
function render() {
  ReactDOM.render(
    // React complained that we had 2 routes for one parent BrowserRouter, we grouped them under React.Fragment
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
  );
}
render();
