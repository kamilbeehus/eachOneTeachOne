import React from 'react';

const UsercourseForm = ({ onClose }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-gray-200 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Pop-up Form</h2>
      <form>
        {/* Add form fields here */}
        <input
          type="text"
          placeholder="Name"
          className="w-full h-10 p-2 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full h-10 p-2 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full h-10 bg-green-500 text-white p-2 border-none rounded-md cursor-pointer hover:bg-green-700"
        >
          Submit
        </button>
      </form>
      <button
        className="btn btn-secondary mt-4"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default UsercourseForm;