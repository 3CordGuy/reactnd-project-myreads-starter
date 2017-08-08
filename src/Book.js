import React, { Component } from 'react';

class Book extends Component {
  state = {
    shelf: ''
  }

  handleChange = (e) => {
    if (this.props.onShelfChange) {
      this.props.onShelfChange(this.props.bookId, e.target.value);
      this.setState({
        shelf: e.target.value,
      });
    }
  }

  render() {

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.cover}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}

export default Book;