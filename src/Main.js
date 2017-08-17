import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class Main extends Component {
  componentDidMount() {
    this.props.onLoad && this.props.onLoad();
  }

  render() {
    const SHELVES = this.props.shelves;
    const books = this.props.books;

    return (
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
                         onShelfChange={this.props.onShelfChange} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
export default Main;