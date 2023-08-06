import React, { useState, useEffect } from "react";
import PixabayApi from "../services/imageParser";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

export default function App() {
    const [images, setImages] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalAlt, setModalAlt] = useState('');
    const [status, setStatus] = useState('idle');
    const [page, setPage] = useState(0);
    const [buttonVisibility, setButtonVisiblity] = useState(true);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (!query) return
        if (page !== 0) imageParser()
    }, [query, page]);

    const queryChange = async (data) => {
        try {
            if (query !== data) await imageSkip()
        }
        finally {
            return setQuery(data)
        }
    };

    const imageSkip = async () => {
        try {
            setImages([]);
            setButtonVisiblity(true);
        }
        finally {
            setPage(0);
        }
    };

    const loadMore = () => setPage((prevPage) => prevPage + 1);
    const getImages = () => images;

    const modalTogle = (image, alt) => {
        setModal(!modal);
        setModalImage(image);
        setModalAlt(alt);
    }

    const imageParser = () => {
        setStatus('pending');

        PixabayApi(query, page)
            .then(data => {
                if (data === null) setStatus('rejected');
                else if (query.trim() === '') setStatus('rejected');
                else if (data.total === 0) setStatus('rejected');
                else if (images.length + 12 >= data.total) {
                    setStatus('fulfilled')
                    setImages([...images, ...data.hits]);
                    setButtonVisiblity(false)
                }
                else {
                    setStatus('fulfilled');
                    setImages([...images, ...data.hits]);
                }
            })
    };

    if (status === 'idle') {
        return (
            <div className="App">
                <Searchbar queryChange={queryChange} loadMore={loadMore} />
            </div>
        )
    }

    if (status === 'pending') {
        return (
            <div className="App">
                <Searchbar queryChange={queryChange} loadMore={loadMore} />
                <ImageGallery getImages={getImages} />
                <Loader />
            </div>
        )
    }

    if (status === 'rejected') {
        return (
            <div className="App">
                <Searchbar queryChange={queryChange} loadMore={loadMore} />
                <p className="rejected">Nothing was found according to your request <b>{query}</b>.</p>
            </div>
        )
    }

    if (status === 'fulfilled') {
        return (
            <div className="App">
                <Searchbar queryChange={queryChange} loadMore={loadMore} />
                <ImageGallery getImages={getImages} modalTogle={modalTogle} />
                <Button loadMore={loadMore} visibility={buttonVisibility} />
                {modal && <Modal modalTogle={modalTogle}>
                    <img src={modalImage} alt={modalAlt} />
                </Modal>}
            </div>
        )
    }
}