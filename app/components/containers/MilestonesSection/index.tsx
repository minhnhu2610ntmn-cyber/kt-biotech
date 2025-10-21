import { Heading, Text, Timeline } from '@ktbiotech/system-design';

export default function MilestonesSection() {
  const timelineItems = [
    {
      id: 1,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 2,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 3,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
    {
      id: 4,
      description:
        'Tiêu đề mốc thời gian - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      date: '01/01/2025',
    },
  ];

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Left Column - Content */}
          <div className='flex flex-col gap-10'>
            <Heading
              level={2}
              color='#215778'
              className='font-bold !text-2xl  underline decoration-[#2C3E50] decoration-1 underline-offset-4'
            >
              BỀ DÀY LỊCH SỬ
            </Heading>

            {/* Large Placeholder Box */}
            <div className='w-full h-64 bg-[#DDEBF7] rounded-lg '></div>

            {/* Description Text */}
            <Text color='#333333' className='text-base leading-relaxed'>
              Mô tả mốc thời gian Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries
            </Text>
          </div>

          {/* Right Column - Timeline */}
          <div className='flex flex-col'>
            <Timeline items={timelineItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
