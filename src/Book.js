import React, { Component } from 'react';

class Book extends Component {
  state = {
    shelf: ''
  }

  handleChange = (e) => {
      this.props.onShelfChange && this.props.onShelfChange(this.props.book, e.target.value);
  }

  render() {
    const BOOK = this.props.book || {};
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${BOOK.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={BOOK.shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{BOOK.title}</div>
          <div>
            {BOOK.authors.map((author, i) => (
              <div key={i} className="book-authors">{author}</div>
            ))}
          </div>
        </div>
      </li>
    )
  }
}

export default Book;