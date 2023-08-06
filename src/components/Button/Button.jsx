import PropTypes from 'prop-types';

export default function Button({ loadMore, visibility }) {
    return (
        <button className="Button" onClick={loadMore} data-visible={visibility}>Load more</button>
    )
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
    visibility: PropTypes.bool.isRequired
}