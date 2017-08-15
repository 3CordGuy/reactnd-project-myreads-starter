import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const BOOKS = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle} {BOOKS.length && <span className="bookshelf-count-label">{BOOKS.length}</span>}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {BOOKS.length &&
            (BOOKS.map((book) => (
              <Book key={book.id}
                    book={book}
                    onShelfChange={this.props.onShelfChange}/>
            )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;