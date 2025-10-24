import { Heading, Text, Timeline } from '@ktbiotech/system-design';

export default function TechnologySection() {
  const timelineItems = [
    {
      id: 1,
      title: 'Tiêu đề mốc thời gian',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 2,
      title: 'Tiêu đề mốc thời gian',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 3,
      title: 'Tiêu đề mốc thời gian',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 4,
      title: 'Tiêu đề mốc thời gian',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
  ];

  return (
    <section className='py-16 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Left Column - Timeline */}
          <div className='flex flex-col order-1 lg:order-1'>
            <Timeline items={timelineItems} />
          </div>

          {/* Right Column - Content */}
          <div className='flex flex-col gap-10 order-2 lg:order-2'>
            <Heading
              level={2}
              color='#215778'
              className='font-bold !text-2xl  underline decoration-[#2C3E50] decoration-1 underline-offset-4'
            >
              ĐỈNH CAO CÔNG NGHỆ
            </Heading>

            {/* Large Placeholder Box */}
            <div className='w-full h-64 bg-[#DDEBF7] rounded-lg'></div>

            {/* Description Text */}
            <Text color='#333333' className='text-base leading-relaxed'>
              Mô tả mốc thời gian Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
