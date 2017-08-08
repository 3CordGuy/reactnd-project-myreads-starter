import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book key={book.id}
                    bookId={book.id}
                    title={book.title}
                    author={book.author}
                    cover={book.image}
                    shelf={book.shelf}
                    onShelfChange={this.props.onShelfChange}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;