import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';
import { Loader } from './Loader';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    loading: false,
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    // Start Spinner
    this.setState({ loading: true });

    BooksAPI.update(book, shelf).then((res) => {
      // Change the shelf locally in state
      const BOOKS = this.state.books;

      // Filter out the book that is changing
      let [bookChange] = BOOKS.filter((b) => b.id === book.id);

      // Change shelf
      if (bookChange) {
        bookChange.shelf = shelf;
      } else {
        // Is new book
        let newBook = book;
        newBook.shelf = shelf;
        bookChange = newBook;
      }

      // Get array without that changed book
      const newBookArr = BOOKS.filter((b) => b.id !== book.id);

      this.setState({
        books: newBookArr.concat([bookChange]),
        loading: false,
      });
    }).catch((err) => {
      this.setState({ loading: false });
      alert(err);
    });
  }

  searchBooks = (query) => {
    if (!query) {
      return false;
    }
    const BOOKS = this.state.books;

    this.setState({ loading: true });

    BooksAPI.search(query, 10).then((res) => {
      let results = [];
      if (res && res.length) {
        results = res.map((resBook) => {
          // Map over results to compare with existing shelved books
          const [SHELVED_BOOK] = BOOKS.filter((b) => resBook.id === b.id);

          if (SHELVED_BOOK) {
            resBook.shelf = SHELVED_BOOK.shelf;
            return resBook;
          }

          resBook.shelf = undefined;
          return resBook;
        });
      }

      this.setState({
        searchResults: results,
        loading: false,
      })
    }).catch((err) => {
      this.setState({ loading: false });
      alert(err);
    });
  }

  render() {
    const { books, loading, searchResults } = this.state;
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
        {loading && (<Loader/>)}
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
          <Search onSearch={this.searchBooks}
                  books={searchResults}
                  onShelfChange={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp;
