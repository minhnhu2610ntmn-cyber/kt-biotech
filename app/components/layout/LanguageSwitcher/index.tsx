'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState('vi');

  const options: OptionType[] = [
    { value: 'vi', label: '🇻🇳 Tiếng Việt' },
    { value: 'en', label: '🇺🇸 English' }
  ];

  // Get locale from cookie and set html lang attribute on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Get locale from cookie
      const getCookieValue = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };

      const locale = getCookieValue('NEXT_LOCALE') || 'vi';
      document.documentElement.lang = locale;
      setCurrentLocale(locale);
    }
  }, []);

  const switchLanguage = (selectedOption: OptionType | null) => {
    if (!selectedOption) return;
    
    const newLocale = selectedOption.value;
    
    // Set locale cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    // Update html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale;
    }
    
    // Update local state
    setCurrentLocale(newLocale);
    
    // Reload the page to apply new locale
    window.location.reload();
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight: '40px',
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#3b82f6' 
        : state.isFocused 
          ? '#eff6ff' 
          : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff'
      }
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#374151'
    }),
    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e5e7eb'
    })
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="w-40">
        <Select
          value={options.find(option => option.value === currentLocale)}
          onChange={switchLanguage}
          options={options}
          styles={customStyles}
          isSearchable={false}
          placeholder="Select language"
          className="text-sm"
        />
      </div>
    </div>
  );
}
