import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export default function DynamicModal({ 
    isOpen, 
    onClose, 
    size, 
    customStyles, 
    children, 
    buttons, 
    buttonAlignment = 'justify-start'
}) {
    Modal.setAppElement('#root');
    
    const sizeMap = {
        small: '300px',
        medium: '500px',
        large: '800px',
    };
  
    const width = sizeMap[size] || sizeMap['medium'];
    
    const modalStyles = {
        content: {
            width: width || '500px', // Default width if size is not provided
            maxWidth: '90%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            ...customStyles,
        },
    };

    // Define media query for responsiveness
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the breakpoint as needed

    // Update modal width based on media query
    useEffect(() => {
        const updateModalWidth = () => {
            if (mediaQuery.matches) {
                modalStyles.content.width = '90%';
            } else {
                modalStyles.content.width = width || '500px';
            }
        };

        updateModalWidth();

        // Listen for changes in the media query and update modal width accordingly
        mediaQuery.addEventListener('change', updateModalWidth);

        return () => {
            // Remove the event listener when the component unmounts
            mediaQuery.removeEventListener('change', updateModalWidth);
        };
    }, [width]);
    
    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Modal"
          style={modalStyles}
        >
            {children}
            {
                buttons?.length > 0 &&
                <div className={`flex ${buttonAlignment} pt-3`}>
                    {buttons.map((button, index) => (
                        <button
                        key={index}
                        onClick={button.onClick}
                        type={button.style === 'cancel' ? 'button' : 'submit'}
                        className={
                            button.style === 'cancel'
                            ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2'
                            : 'bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                        }
                        >
                        {button.text}
                        </button>
                    ))}
                </div>
            }
        </Modal>
    )
}