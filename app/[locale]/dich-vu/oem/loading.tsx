import { SimpleLoading } from '@ktbiotech/system-design';

export default function GenomeSequencingLoading() {
  return (
    <SimpleLoading
      text='Loading genome sequencing service...'
      backgroundColor='bg-gray-50'
      size='md'
    />
  );
}