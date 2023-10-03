
import * as Yup from 'yup'; // Import Yup

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string(),
  email: Yup.string().email('Invalid email format'),
});

export const fields = [
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

export const customStyles = {
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  borderRadius: '8px',
};