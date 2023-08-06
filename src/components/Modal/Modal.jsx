import { createPortal } from 'react-dom'
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default function Modal({ modalTogle, children }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleKeydown = event => {
        if (event.code === 'Escape') modalTogle()
    }

    const handleClick = (event) => {
        if (event.currentTarget === event.target) modalTogle()
    }

    return createPortal(
        <div className="Overlay" onClick={handleClick}>
            <div className="Modal">
                {children}
            </div>
        </div>,
        rootModal
    )
}

Modal.propTypes = {
    modalTogle: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
}