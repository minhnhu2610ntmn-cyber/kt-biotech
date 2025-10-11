'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Select;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_select_1 = __importDefault(require("react-select"));
const utils_1 = require("../../utils");
function Select({ options, value, onChange, placeholder = "Select an option...", isSearchable = false, isDisabled = false, isClearable = false, isMulti = false, className, label, error, helperText, required = false }) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '40px',
            backgroundColor: isDisabled ? '#f9fafb' : 'white',
            borderColor: error
                ? '#ef4444'
                : state.isFocused
                    ? '#3b82f6'
                    : '#d1d5db',
            boxShadow: error
                ? '0 0 0 1px #ef4444'
                : state.isFocused
                    ? '0 0 0 1px #3b82f6'
                    : 'none',
            '&:hover': {
                borderColor: error ? '#ef4444' : '#3b82f6'
            },
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? 'not-allowed' : 'default'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#3b82f6'
                : state.isFocused
                    ? '#eff6ff'
                    : 'white',
            color: state.isSelected ? 'white' : '#374151',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#374151'
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#eff6ff',
            borderRadius: '6px'
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: '#1d4ed8'
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: '#6b7280',
            '&:hover': {
                backgroundColor: '#fef2f2',
                color: '#dc2626'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#9ca3af'
        }),
        menu: (provided) => ({
            ...provided,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            zIndex: 9999
        }),
        menuList: (provided) => ({
            ...provided,
            padding: '4px',
            borderRadius: '8px'
        })
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex flex-col gap-1", className), children: [label && ((0, jsx_runtime_1.jsxs)("label", { className: "text-sm font-medium text-gray-700", children: [label, required && (0, jsx_runtime_1.jsx)("span", { className: "text-red-500 ml-1", children: "*" })] })), (0, jsx_runtime_1.jsx)(react_select_1.default, { value: value, onChange: onChange, options: options, styles: customStyles, placeholder: placeholder, isSearchable: isSearchable, isDisabled: isDisabled, isClearable: isClearable, isMulti: isMulti, className: "text-sm", classNamePrefix: "react-select" }), (error || helperText) && ((0, jsx_runtime_1.jsxs)("div", { className: "text-xs", children: [error && ((0, jsx_runtime_1.jsx)("span", { className: "text-red-500", children: error })), helperText && !error && ((0, jsx_runtime_1.jsx)("span", { className: "text-gray-500", children: helperText }))] }))] }));
}
