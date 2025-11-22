import { SimpleLoading } from '@ktbiotech/system-design';

export default function ProductDetailLoading() {
  return (
    <SimpleLoading
      text='Loading product details...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}