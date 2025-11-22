import { SimpleLoading } from '@ktbiotech/system-design';

export default function CategoryLoading() {
  return (
    <SimpleLoading
      text='Loading category products...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}