import React, { useState } from 'react'
import { validationSchema, fields, customStyles } from '../constant';
import { DynamicForm } from '../components/Forms';
import { DynamicModal } from '../components/Modals';

export default function Template() {
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenWithoutButton, setIsModalOpenWithoutButton] = useState(false);
  const [modalSize, setModalSize] = useState('small')

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = (size) => {
    setModalSize(size)
    openModal()
  }
  
  const handleModalWithoutButton = (size) => {
    setModalSize(size)
    openModalWithoutButton()
  }

  const openModalWithoutButton = () => {
    setIsModalOpenWithoutButton(true);
  };

  const closeModalWithoutButton = () => {
    setIsModalOpenWithoutButton(false);
  };


  return (
    <div className='w-full p-10 flex flex-col gap-4'>
        <p className='text-4xl font-bold'>Hacktiv Components</p>
        <div className='w-full flex flex-wrap gap-10'>
            <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold'>Dynamic Form</p>
                <DynamicForm fields={fields} validationSchema={validationSchema} handleSubmit={(e) => alert(JSON.stringify(e))}/>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-xl font-bold'>Dynamic Modal</p>
                <div className='flex flex-col gap-2'>
                    <button onClick={() => handleModal('small')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Small Modal</button>
                    <button onClick={() => handleModal('medium')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Medium Modal</button>
                    <button onClick={() => handleModal('large')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Large Modal</button>
                    <button onClick={() => handleModalWithoutButton('small')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Medium Modal With Form</button>
                    <button onClick={() => handleModalWithoutButton('medium')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Medium Modal With Form</button>
                    <button onClick={() => handleModalWithoutButton('large')} className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'>Open Medium Modal With Form</button>
                </div>
                <DynamicModal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    size={modalSize}
                    customStyles={customStyles}
                    buttonAlignment={'justify-end'}
                    buttons={[
                        {
                            text: 'Cancel',
                            onClick: closeModal,
                            style: 'cancel', // Optional custom styling
                        },
                        {
                            text: 'Okay',
                            onClick: () => alert('Proceed'),
                            style: 'submit'
                        },
                    ]}
                >
                    <div className=''>
                        <p className='text-2xl font-bold'>Alert</p>
                        <p>Do you want to close this modal?</p>
                    </div>
                </DynamicModal>
                
                <DynamicModal 
                    isOpen={isModalOpenWithoutButton}
                    onClose={closeModalWithoutButton}
                    size={modalSize}
                    customStyles={customStyles}
                >
                    <p className='text-2xl font-bold'>Example Form Modal</p>
                    <DynamicForm fields={fields} closeModal={closeModalWithoutButton} validationSchema={validationSchema} handleSubmit={(e) => alert(JSON.stringify(e))}/>
                </DynamicModal>
            </div>
        </div>
    </div>
  )
}
