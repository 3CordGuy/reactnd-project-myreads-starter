import React, { Component } from 'react';
import debounce from 'debounce';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
  handleSearch = (query) => {
    this.props.onSearch(query.trim())
  }

  componentDidMount() {
    document.getElementById('search-input').focus();
  }

  render() {
    const BOOKS = this.props.books;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" id="search-input" placeholder="Search by title or author"
                               onChange={(event) => debounce(this.handleSearch(event.target.value), 500)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {BOOKS.length ?
            (BOOKS.map((book) => (
              <Book key={book.id}
                    book={book}
                    onShelfChange={this.props.onShelfChange}/>
            ))) : <div>No Results</div>}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;