import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Book extends Component {
  handleChange = (e) => {
      this.props.onShelfChange && this.props.onShelfChange(this.props.book, e.target.value);
  }

  render() {
    const BOOK = this.props.book;
    return (
      <li>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${BOOK.imageLinks && BOOK.imageLinks.thumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select value={BOOK.shelf || ''} onChange={this.handleChange}>
                  <option value="" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{BOOK.title || 'No title found'}</div>
            <div>
              {BOOK.authors && BOOK.authors.map((author, i) => (
                <div key={i} className="book-authors">{author}</div>
              ))}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </li>
    )
  }
}

export default Book;