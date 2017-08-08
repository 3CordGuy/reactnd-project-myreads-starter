import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Search from './Search';
import BookShelf from './BookShelf';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [{
      id: 'abc123',
      title: 'To Kill A Mockingbird',
      author: 'Some Guy',
      image: 'http://via.placeholder.com/350x150',
      shelf: 'currentlyReading'
    }, {
      id: 'efg123',
      title: 'Dark Sea of Darkness',
      author: 'Andrew Peterson',
      image: 'http://via.placeholder.com/350x150',
      shelf: 'read'
    }, {
      id: 'hij123',
      title: 'North or Be Eaten',
      author: 'Andrew Peterson',
      image: 'http://via.placeholder.com/350x150',
      shelf: 'wantToRead'
    }]
  }

  changeShelf = (id, shelf) => {
    const { books } = this.state;

    const [bookMatch] = books.filter((b) => b.id === id);
    bookMatch.shelf = shelf;

    const newBookArr = books.filter((b) => b.id !== id);
    newBookArr.push(bookMatch);

    this.setState({
      books: newBookArr
    });
  }

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf shelfTitle="Currently Reading"
                          books={currentlyReading}
                          onShelfChange={this.changeShelf} />
                <BookShelf shelfTitle="Want to Read"
                          books={wantToRead}
                          onShelfChange={this.changeShelf}  />
                <BookShelf shelfTitle="Read"
                          books={read}
                          onShelfChange={this.changeShelf}  />
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
