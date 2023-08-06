import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

export default function ImageGallery({ getImages, modalTogle }) {
    return (
        <ul className="ImageGallery" >
            {getImages().length === 0 ? null :
                getImages().map(image => {
                    const { id, webformatURL, largeImageURL, tags } = image;

                    return (
                        <ImageGalleryItem
                            key={id}
                            id={id}
                            src={webformatURL}
                            alt={tags}
                            dataLarge={largeImageURL}
                            modalTogle={modalTogle}
                        />
                    )
                })
            }
        </ul>
    )
}

ImageGallery.propTypes = {
    getImages: PropTypes.func.isRequired,
    modalTogle: PropTypes.func
}