import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import Search from './Search';
import Main from './Main';
import { Loader } from './Loader';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    loading: false,
  }

  componentDidMount() {
    // Start Spinner
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        loading: false
      });
    });
  }

  changeShelf = (book, shelf) => {
    // Start Spinner
    this.setState({ loading: true });

    BooksAPI.update(book, shelf).then((res) => {
      // Change the shelf locally in state
      const BOOKS = this.state.books;

      let newBook = book;
      newBook.shelf = shelf;

      // Get array without that changed book
      const newBookArr = BOOKS.filter((b) => b.id !== book.id);

      this.setState({
        books: newBookArr.concat([newBook]),
        loading: false,
      });
    }).catch((err) => {
      this.setState({ loading: false });
      alert(err);
    });
  }

  searchBooks = (query) => {
    if (!query) {
      this.setState({ searchResults: [] });
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

  clearResults = () => {
    this.setState({
      searchResults: []
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
          <Main shelves={SHELVES}
                books={books}
                onShelfChange={this.changeShelf}
                onLoad={this.clearResults} />

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
