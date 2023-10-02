// src/App.js
import React from 'react';
import './App.css';
import { DynamicForm } from './components/Forms';
import { validationSchema } from './constant';

function App() {
  const fields = [
    {
      name: 'firstName',
      label: 'First Name',
    },
    {
      name: 'lastName',
      label: 'Last Name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'radio',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
      initialValue: 'male',
    },
    {
      name: 'hobbies',
      label: 'Hobbies',
      type: 'checkbox',
      options: [
        { label: 'Reading', value: 'reading' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Cooking', value: 'cooking' },
      ],
      initialValue: [], 
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'USA', value: 'usa' },
        { label: 'Canada', value: 'canada' },
        { label: 'UK', value: 'uk' },
      ],
      initialValue: '',
      multiple: true
    },
  ];

  return (
    <div className='hc-screen w-full'>
      <DynamicForm fields={fields} validationSchema={validationSchema} handleSubmit={(e) => alert(JSON.stringify(e))}/>
    </div>
  );
}

export default App;
