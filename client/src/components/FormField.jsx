import React from 'react'

const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          className="block text-sm font-medium text-gray-900"
          htmlFor={name}
        >
          {LabelName}
        </label>
        {isSurpriseMe && (
          <button
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            type="button"
            onClick={handleSurpriseMe}
          >
            Surprise me
          </button>
        )}
      </div>

      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        placeholder={placeholder}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />

    </div>
  )
}

export default FormField
