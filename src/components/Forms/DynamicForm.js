// src/components/DynamicForm.js
import React from 'react';
import { useFormik } from 'formik';
import Select from 'react-select';

const DynamicForm = ({ 
  fields, // An array of form field configuration objects
  validationSchema, // Form validation schema
  handleSubmit, // Function to handle form submission
  closeModal=null
}) => {

  // Initialize form field values based on the provided configuration
  const initialValues = {};
  fields.forEach((field) => {
    initialValues[field.name] = field.initialValue || '';
  });

  // Initialize the Formik form with the provided initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Function to reset the form fields to their initial values
  const handleCancel = () => {
    formik.resetForm(); // Reset form fields
    if (closeModal) {
      closeModal(); // Call the closeModal function if provided
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          {/* Label for the form field */}
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'radio' ? (
            // Render radio button options
            <div className="mt-2 space-x-4">
              {field.options.map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  {/* Radio input */}
                  <input
                    type="radio"
                    id={option.value}
                    name={field.name}
                    value={option.value}
                    checked={formik.values[field.name] === option.value}
                    onChange={formik.handleChange}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
              {formik.touched[field.name] && formik.errors[field.name] && (
                // Display validation error if there is one
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </div>
          ) : field.type === 'checkbox' ? (
            // Render checkbox options
            <div className='mt-2 space-x-4'>
              {field.options.map((option) => (
                <label key={option.value}>
                  {/* Checkbox input */}
                  <input
                    type="checkbox"
                    id={option.value}
                    name={field.name}
                    value={option.value}
                    checked={formik.values[field.name].includes(option.value)}
                    className="form-checkbox h-4 w-4 text-indigo-600 mr-2"
                    onChange={() => {
                      // Handle checkbox value changes
                      const selectedValues = formik.values[field.name];
                      const newValue = selectedValues.includes(option.value)
                        ? selectedValues.filter((value) => value !== option.value)
                        : [...selectedValues, option.value];
                      formik.setFieldValue(field.name, newValue);
                    }}
                  />
                  {option.label}
                </label>
              ))}
              {formik.touched[field.name] && formik.errors[field.name] && (
                // Display validation error if there is one
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </div>
          ) : field.type === 'select' ? (
            // Render a select dropdown
            <>
              <Select
                name={field.name}
                options={field.options}
                value={field.options.find((option) => option.value === formik.values[field.name])}
                onChange={(selectedOption) => {
                  // Handle select dropdown value changes
                  formik.setFieldValue(field.name, selectedOption ? selectedOption.value : '');
                }}
                isMulti={field?.multiple}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                // Display validation error if there is one
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </>
          ) : (
            // Render a text input field
            <>
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                // Display validation error if there is one
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </>
          )}
        </div>
      ))}
      <button type="button" onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;