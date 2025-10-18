import { Text } from '@ktbiotech/system-design';
import type { Country } from '../../../types';

export interface CountryFlagsProps {
  countries: Country[];
  className?: string;
}

export default function CountryFlags({
  countries,
  className,
}: CountryFlagsProps) {
  return (
    <div
      className={`flex justify-center items-center gap-8 flex-wrap ${className}`}
    >
      {countries.map(country => (
        <div key={country.id} className='flex flex-col items-center group'>
          <div className='w-16 h-16 rounded-full border-2 border-kt-gray-200 bg-white flex items-center justify-center hover:border-kt-blue-300 transition-colors group-hover:shadow-md'>
            <span className='text-3xl'>{country.flagEmoji}</span>
          </div>
          <Text className='text-kt-gray-600 text-sm mt-2 group-hover:text-kt-blue-600 transition-colors'>
            {country.name}
          </Text>
        </div>
      ))}
    </div>
  );
}
