import PropTypes from 'prop-types';

export default function ImageGalleryItem({ src, id, alt, dataLarge, modalTogle }) {
    return (
        <li className="ImageGalleryItem" >
            <img
                src={src}
                id={id}
                alt={alt}
                data-large={dataLarge}
                className="ImageGalleryItem-image"
                onClick={() => modalTogle(dataLarge, alt)}
            />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    alt: PropTypes.string.isRequired,
    dataLarge: PropTypes.string.isRequired,
    modalTogle: PropTypes.func
}