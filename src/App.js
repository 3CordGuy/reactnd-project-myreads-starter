import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      // TODO: Update local state after DB change
      // const BOOKS = this.state.books;
      // const [bookMatch] = BOOKS.filter((b) => b.id === id);
      // bookMatch.shelf = shelf;

      // const newBookArr = books.filter((b) => b.id !== id);
      // newBookArr.push(bookMatch);

      // this.setState({
      //   books: newBookArr
      // });
    }).catch((err) => {
      alert(err)
    });
  }

  render() {
    const { books } = this.state;
    const SHELVES = [{
      title: 'Currently Reading',
      name: 'currentlyReading'
    }, {
      title: 'Want to read',
      name: 'wantToRead'
    }, {
      title: 'Read',
      name: 'read'
    }];

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {SHELVES.map((shelf) => (
                  <BookShelf key={shelf.name}
                             shelfTitle={shelf.title}
                             books={books.filter((book) => book.shelf === shelf.name)}
                             onShelfChange={this.changeShelf} />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search />
        )} />
      </div>
    )
  }
}

export default BooksApp;
