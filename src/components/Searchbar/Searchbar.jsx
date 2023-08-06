import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export default function Searchbar({ queryChange, loadMore }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        queryChange(query);
        loadMore();
    }

    const handleChange = (event) => setQuery(event.target.value)

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <FaSearch size={18} />
                </button>

                <input
                    className="SearchForm-input"
                    name="test"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    queryChange: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired
}