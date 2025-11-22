import { SimpleLoading } from '@ktbiotech/system-design';

export default function ProductCategoriesLoading() {
  return (
    <SimpleLoading
      text='Loading products...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}