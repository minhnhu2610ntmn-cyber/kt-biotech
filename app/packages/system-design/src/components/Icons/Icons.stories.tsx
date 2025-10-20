import type { Meta, StoryObj } from '@storybook/react';
import {
  AboutIcon,
  CambodiaFlagIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChinaFlagIcon,
  EmailIcon,
  FacebookCircleIcon,
  FacebookIcon,
  InstagramIcon,
  HeartIcon,
  HelpIcon,
  JapanFlagIcon,
  MalaysiaFlagIcon,
  MenuIcon,
  PrintIcon,
  SearchIcon,
  TwitterIcon,
  YouTubeIcon,
  UnitedKingdomFlagIcon,
  UnitedStatesFlagIcon,
  VietnamFlagIcon,
} from '..';

const meta: Meta = {
  title: 'components/Icons',
};

export default meta;
type Story = StoryObj;

export const Icons: Story = {
  render: () => (
    <div className='grid grid-cols-3 md:grid-cols-12 gap-4'>
      {/* Facebook */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-blue-600'>
          <FacebookIcon width={24} height={24} stroke='currentColor' />
        </div>
        <span className='text-xs text-gray-900'>Facebook</span>
      </div>

      {/* Facebook Circle */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <FacebookCircleIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>Facebook Circle</span>
      </div>

      {/* Email */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-800'>
          <EmailIcon width={24} height={24} stroke='currentColor' />
        </div>
        <span className='text-xs text-gray-900'>Email</span>
      </div>

      {/* Instagram */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <InstagramIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>Instagram</span>
      </div>

      {/* Twitter */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <TwitterIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>Twitter</span>
      </div>

      {/* YouTube */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <YouTubeIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>YouTube</span>
      </div>

      {/* Print */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-800'>
          <PrintIcon width={24} height={24} stroke='currentColor' />
        </div>
        <span className='text-xs text-gray-900'>Print</span>
      </div>

      {/* Help */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <HelpIcon width={24} height={24} fill='#86BDDF' />
        </div>
        <span className='text-xs text-gray-900'>Help</span>
      </div>

      {/* Search */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700'>
          <SearchIcon width={24} height={24} stroke='currentColor' />
        </div>
        <span className='text-xs text-gray-900'>Search</span>
      </div>

      {/* About */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <AboutIcon width={24} height={24} fill='#86BDDF' />
        </div>
        <span className='text-xs text-gray-900'>About</span>
      </div>

      {/* Heart */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <HeartIcon width={24} height={24} fill='#86BDDF' />
        </div>
        <span className='text-xs text-gray-900'>Heart</span>
      </div>

      {/* Vietnam Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <VietnamFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>VN Flag</span>
      </div>

      {/* United Kingdom Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <UnitedKingdomFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>UK Flag</span>
      </div>

      {/* United States Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <UnitedStatesFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>US Flag</span>
      </div>

      {/* Japan Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <JapanFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>JP Flag</span>
      </div>

      {/* Malaysia Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <MalaysiaFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>MY Flag</span>
      </div>

      {/* Cambodia Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <CambodiaFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>KH Flag</span>
      </div>

      {/* China Flag */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200'>
          <ChinaFlagIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>CN Flag</span>
      </div>

      {/* Chevron Right */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600'>
          <ChevronRightIcon />
        </div>
        <span className='text-xs text-gray-900'>Chevron Right</span>
      </div>

      {/* Chevron Down */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-900'>
          <ChevronDownIcon />
        </div>
        <span className='text-xs text-gray-900'>Chevron Down</span>
      </div>

      {/* Menu */}
      <div className='flex flex-col items-center gap-2'>
        <div className='bg-white size-12 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700'>
          <MenuIcon width={24} height={24} />
        </div>
        <span className='text-xs text-gray-900'>Menu</span>
      </div>
    </div>
  ),
};
