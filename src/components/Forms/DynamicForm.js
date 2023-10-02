// src/components/DynamicForm.js
import React from 'react';
import { useFormik } from 'formik';
import Select from 'react-select';

const DynamicForm = ({ fields, validationSchema, handleSubmit }) => {
  const initialValues = {};
  fields.forEach((field) => {
    initialValues[field.name] = field.initialValue || '';
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'radio' ? (
            <div className="mt-2 space-x-4">
              {field.options.map((option) => (
                <label key={option.value} className="inline-flex items-center">
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
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </div>
          ) : field.type === 'checkbox' ? (
            <div className='mt-2 space-x-4'>
              {field.options.map((option) => (
                <label key={option.value}>
                  <input
                    type="checkbox"
                    id={option.value}
                    name={field.name}
                    value={option.value}
                    checked={formik.values[field.name].includes(option.value)}
                    className="form-radio h-4 w-4 text-indigo-600 mr-2"
                    onChange={() => {
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
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </div>
          ) : field.type === 'select' ? (
            <>
              <Select
                name={field.name}
                options={field.options}
                value={field.options.find((option) => option.value === formik.values[field.name])}
                onChange={(selectedOption) => {
                  formik.setFieldValue(field.name, selectedOption ? selectedOption.value : '');
                }}
                isMulti={field?.multiple}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </>
          ) : (
            <>
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="mt-2 text-red-500 text-sm">{formik.errors[field.name]}</div>
              )}
            </>
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
