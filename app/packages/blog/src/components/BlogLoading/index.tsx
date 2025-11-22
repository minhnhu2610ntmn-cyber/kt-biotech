'use client';

import { LoadingSpinner } from '@ktbiotech/system-design';

export default function BlogLoading() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <LoadingSpinner
        size='lg'
        variant='logo'
        text='Loading amazing content...'
        showFunFact={true}
        funFact='💡 Did you know? DNA in a single human cell, if stretched out, would be about 2 meters long!'
        color='blue'
        className='py-8'
      />
    </div>
  );
}
