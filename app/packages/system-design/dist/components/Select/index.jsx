'use client';
import ReactSelect from 'react-select';
import { cn } from '../../utils';
export default function Select({ options, value, onChange, placeholder = "Select an option...", isSearchable = false, isDisabled = false, isClearable = false, isMulti = false, className, label, error, helperText, required = false }) {
    const customStyles = {
        control: (provided, state) => (Object.assign(Object.assign({}, provided), { minHeight: '40px', backgroundColor: isDisabled ? '#f9fafb' : 'white', borderColor: error
                ? '#ef4444'
                : state.isFocused
                    ? '#3b82f6'
                    : '#d1d5db', boxShadow: error
                ? '0 0 0 1px #ef4444'
                : state.isFocused
                    ? '0 0 0 1px #3b82f6'
                    : 'none', '&:hover': {
                borderColor: error ? '#ef4444' : '#3b82f6'
            }, opacity: isDisabled ? 0.6 : 1, cursor: isDisabled ? 'not-allowed' : 'default' })),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        option: (provided, state) => (Object.assign(Object.assign({}, provided), { backgroundColor: state.isSelected
                ? '#3b82f6'
                : state.isFocused
                    ? '#eff6ff'
                    : 'white', color: state.isSelected ? 'white' : '#374151', cursor: 'pointer', '&:hover': {
                backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff'
            } })),
        singleValue: (provided) => (Object.assign(Object.assign({}, provided), { color: '#374151' })),
        multiValue: (provided) => (Object.assign(Object.assign({}, provided), { backgroundColor: '#eff6ff', borderRadius: '6px' })),
        multiValueLabel: (provided) => (Object.assign(Object.assign({}, provided), { color: '#1d4ed8' })),
        multiValueRemove: (provided) => (Object.assign(Object.assign({}, provided), { color: '#6b7280', '&:hover': {
                backgroundColor: '#fef2f2',
                color: '#dc2626'
            } })),
        placeholder: (provided) => (Object.assign(Object.assign({}, provided), { color: '#9ca3af' })),
        menu: (provided) => (Object.assign(Object.assign({}, provided), { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb', borderRadius: '8px', zIndex: 9999 })),
        menuList: (provided) => (Object.assign(Object.assign({}, provided), { padding: '4px', borderRadius: '8px' }))
    };
    return (<div className={cn("flex flex-col gap-1", className)}>
      {label && (<label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>)}
      
      <ReactSelect value={value} onChange={onChange} options={options} styles={customStyles} placeholder={placeholder} isSearchable={isSearchable} isDisabled={isDisabled} isClearable={isClearable} isMulti={isMulti} className="text-sm" classNamePrefix="react-select"/>
      
      {(error || helperText) && (<div className="text-xs">
          {error && (<span className="text-red-500">{error}</span>)}
          {helperText && !error && (<span className="text-gray-500">{helperText}</span>)}
        </div>)}
    </div>);
}
