'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import { User, Mail, Lock, Phone, MapPin, Search } from 'lucide-react';
import { Input, Select, Button, Slider, SliderPresets } from '@ktbiotech/system-design';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();
  
  // Demo state for Select
  const [selectedCountry, setSelectedCountry] = useState<{value: string, label: string} | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<{value: string, label: string}[]>([]);
  
  const handleSearch = (value: string) => {
    console.log('Searching for:', value);
  };

  // Demo options
  const countryOptions = [
    { value: 'vn', label: '🇻🇳 Vietnam' },
    { value: 'us', label: '🇺🇸 United States' },
    { value: 'uk', label: '🇬🇧 United Kingdom' },
    { value: 'jp', label: '🇯🇵 Japan' },
    { value: 'kr', label: '🇰🇷 South Korea' }
  ];

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' }
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="flex gap-3">
            <Link href="/blogs">
              <Button size="lg">
                View Our Blog
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            {t('getStarted')}{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            {t('saveAndSee')}
          </li>
        </ol>

               {/* Demo Components Section */}
               <div className="w-full max-w-2xl space-y-8">
                 <div className="text-center">
                   <h2 className="text-2xl font-bold mb-2">{t('demo')}</h2>
                   <p className="text-muted-foreground">{t('tryComponents')}</p>
                 </div>

                 {/* Slider Demo */}
                 <div className="space-y-4">
                   <h3 className="text-lg font-semibold">Image Slider</h3>
                   <div className="w-full max-w-md mx-auto">
                     <Slider
                       {...SliderPresets.hero}
                       className="rounded-lg overflow-hidden"
                     >
                       <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center text-white text-xl font-semibold">
                         Slide 1 - Welcome
                       </div>
                       <div className="bg-gradient-to-r from-green-500 to-blue-600 h-48 flex items-center justify-center text-white text-xl font-semibold">
                         Slide 2 - Innovation
                       </div>
                       <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-48 flex items-center justify-center text-white text-xl font-semibold">
                         Slide 3 - Technology
                       </div>
                     </Slider>
                   </div>
                 </div>

          {/* Search Input Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Search Input</h3>
            <div className="space-y-2">
              <Input
                placeholder={t('searchExample')}
                leftIcon={<Search className="h-4 w-4" />}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Input
                placeholder="Search..."
                leftIcon={<Search className="h-4 w-4" />}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Form Input Demo */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('formExample')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('fullName')}
                placeholder={t('fullName')}
                leftIcon={<User className="h-4 w-4" />}
                required
                helperText="Enter your full name"
              />
              <Input
                label={t('email')}
                type="email"
                placeholder={t('email')}
                leftIcon={<Mail className="h-4 w-4" />}
                required
                helperText="Enter your email address"
              />
              <Select
                label="Country"
                options={countryOptions}
                value={selectedCountry}
                onChange={(option) => setSelectedCountry(Array.isArray(option) ? option[0] || null : option)}
                placeholder="Select your country"
                isSearchable={true}
                required
                helperText="Choose your country"
              />
              <Input
                label={t('phone')}
                type="tel"
                placeholder={t('phone')}
                leftIcon={<Phone className="h-4 w-4" />}
              />
              <Select
                label="Skills"
                options={skillOptions}
                value={selectedSkills}
                onChange={(option) => setSelectedSkills(Array.isArray(option) ? option : [])}
                placeholder="Select your skills"
                isMulti={true}
                isSearchable={true}
                isClearable={true}
                helperText="Select multiple skills"
                className="md:col-span-2"
              />
              <Input
                label={t('address')}
                placeholder={t('address')}
                leftIcon={<MapPin className="h-4 w-4" />}
                variant="filled"
              />
              <Input
                label={t('password')}
                type="password"
                placeholder={t('password')}
                leftIcon={<Lock className="h-4 w-4" />}
                required
                helperText="Minimum 8 characters"
              />
              <Input
                label={t('confirmPassword')}
                type="password"
                placeholder={t('confirmPassword')}
                leftIcon={<Lock className="h-4 w-4" />}
                required
                error="Passwords do not match"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/blogs">
            <Button size="lg">
              Xem Blog
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Tìm hiểu thêm
          </Button>
        </div>
      </main>
    </div>
  );
}