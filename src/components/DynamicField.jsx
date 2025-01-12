// frontend/src/components/DynamicField.jsx

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { InformationCircleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const DynamicField = ({ field, control, errors, setValue, register }) => { // 'register' is now passed as a prop
  const commonStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: errors[field.name] ? "#f87171" : provided.borderColor,
      boxShadow: state.isFocused
        ? errors[field.name]
          ? "0 0 0 1px #f87171"
          : "0 0 0 1px #3b82f6"
        : provided.boxShadow,
    }),
  };

  // Helper function to render tooltips
  const renderTooltip = (text) => (
    <div className="relative group inline-block">
      <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 ml-1 cursor-pointer" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        {text}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
        {field.label}
        {field.tooltip && renderTooltip(field.tooltip)}
      </label>
      {field.type === "text" || field.type === "number" ? (
        <input
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          {...register(field.name)} // Utilize 'register' for these field types
          className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
            errors[field.name]
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-blue-500"
          }`}
        />
      ) : field.type === "select" || field.type === "multi-select" ? (
        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField }) => (
            <Select
              {...controllerField}
              isMulti={field.type === "multi-select"}
              options={field.options.map((option) => ({
                value: option,
                label: option,
              }))}
              placeholder={field.placeholder}
              classNamePrefix="react-select"
              onChange={(selected) => {
                if (field.type === "multi-select") {
                  controllerField.onChange(
                    selected ? selected.map((option) => option.value) : []
                  );
                } else {
                  controllerField.onChange(selected ? selected.value : "");
                }
              }}
              styles={commonStyles}
            />
          )}
        />
      ) : null}
      {errors[field.name] && (
        <p className="mt-1 text-red-500 text-sm flex items-center">
          <InformationCircleIcon className="w-4 h-4 mr-1" />
          {errors[field.name].message}
        </p>
      )}
    </div>
  );
};

export default DynamicField;
