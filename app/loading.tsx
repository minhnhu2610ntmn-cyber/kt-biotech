import { LoadingSpinner } from '@ktbiotech/system-design';

export default function Loading() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center'>
      <LoadingSpinner
        size='xl'
        variant='logo'
        text='Preparing your biotech experience...'
        showFunFact={true}
        color='blue'
        className='py-12'
      />
    </div>
  );
}
