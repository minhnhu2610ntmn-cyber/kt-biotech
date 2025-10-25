import { Container, Heading, Text } from '@ktbiotech/system-design';
import { MasterLayout } from '../../../components/layout';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Dr. Nguyễn Văn A',
      position: 'Giám đốc điều hành',
      expertise: 'Công nghệ sinh học',
      experience: '15 năm kinh nghiệm',
      image: '/images/team-member-1.jpg',
    },
    {
      name: 'Dr. Trần Thị B',
      position: 'Giám đốc nghiên cứu',
      expertise: 'Tin sinh học',
      experience: '12 năm kinh nghiệm',
      image: '/images/team-member-2.jpg',
    },
    {
      name: 'Dr. Lê Văn C',
      position: 'Trưởng phòng phát triển',
      expertise: 'Chẩn đoán phân tử',
      experience: '10 năm kinh nghiệm',
      image: '/images/team-member-3.jpg',
    },
    {
      name: 'Dr. Phạm Thị D',
      position: 'Chuyên gia nghiên cứu',
      expertise: 'Nghiên cứu lâm sàng',
      experience: '8 năm kinh nghiệm',
      image: '/images/team-member-4.jpg',
    },
  ];

  return (
    <MasterLayout>
      <div className='min-h-screen bg-[#F7FBFD]'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16'>
          <Container>
            <div className='text-center'>
              <Heading level={1} color='white' className='mb-6'>
                Đội ngũ của chúng tôi
              </Heading>
              <Text
                variant='subtitle'
                color='white'
                className='text-xl max-w-3xl mx-auto'
              >
                Gặp gỡ những chuyên gia tài năng đang làm việc tại KTBioTech
              </Text>
            </div>
          </Container>
        </section>

        {/* Team Stats */}
        <section className='py-16'>
          <Container>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-16'>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>50+</div>
                <Text variant='caption' color='muted'>
                  Chuyên gia
                </Text>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>15+</div>
                <Text variant='caption' color='muted'>
                  Năm kinh nghiệm TB
                </Text>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>80%</div>
                <Text variant='caption' color='muted'>
                  Tiến sĩ & Thạc sĩ
                </Text>
              </div>
              <div className='text-center'>
                <div className='text-4xl font-bold text-blue-600 mb-2'>10+</div>
                <Text variant='caption' color='muted'>
                  Quốc gia
                </Text>
              </div>
            </div>
          </Container>
        </section>

        {/* Team Members */}
        <section className='py-16 bg-white'>
          <Container>
            <div className='text-center mb-12'>
              <Heading level={2} color='#215778' className='mb-4'>
                Đội ngũ lãnh đạo
              </Heading>
              <Text variant='subtitle' className='max-w-2xl mx-auto'>
                Những người đứng đầu với kinh nghiệm và tầm nhìn chiến lược
              </Text>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-lg overflow-hidden'
                >
                  <div className='h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center'>
                    <div className='w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
                      {member.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                  </div>
                  <div className='p-6'>
                    <Heading level={4} color='#215778' className='mb-2'>
                      {member.name}
                    </Heading>
                    <Text variant='caption' color='primary' className='mb-2'>
                      {member.position}
                    </Text>
                    <Text variant='caption' color='muted' className='mb-1'>
                      Chuyên môn: {member.expertise}
                    </Text>
                    <Text variant='caption' color='muted'>
                      {member.experience}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Culture */}
        <section className='py-16'>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <Heading level={2} color='#215778' className='mb-8 text-center'>
                Văn hóa công ty
              </Heading>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                  <Heading level={3} color='#215778' className='mb-4'>
                    Môi trường làm việc
                  </Heading>
                  <Text variant='body' className='mb-4'>
                    Chúng tôi tạo ra một môi trường làm việc năng động, sáng tạo
                    và hỗ trợ lẫn nhau. Mỗi thành viên trong đội ngũ đều được
                    khuyến khích phát triển kỹ năng và đóng góp ý tưởng mới.
                  </Text>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <Text variant='caption'>
                        Làm việc linh hoạt và cân bằng cuộc sống
                      </Text>
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <Text variant='caption'>
                        Cơ hội học tập và phát triển nghề nghiệp
                      </Text>
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-blue-600 rounded-full'></div>
                      <Text variant='caption'>
                        Hỗ trợ nghiên cứu và đổi mới
                      </Text>
                    </li>
                  </ul>
                </div>

                <div className='bg-white rounded-lg shadow-lg p-8'>
                  <Heading level={3} color='#215778' className='mb-4'>
                    Phát triển đội ngũ
                  </Heading>
                  <Text variant='body' className='mb-4'>
                    Chúng tôi đầu tư mạnh vào việc phát triển đội ngũ thông qua
                    các chương trình đào tạo, hội thảo và cơ hội hợp tác quốc
                    tế. Mục tiêu là xây dựng một đội ngũ chuyên nghiệp và tài
                    năng.
                  </Text>
                  <ul className='space-y-2'>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <Text variant='caption'>Đào tạo chuyên môn định kỳ</Text>
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <Text variant='caption'>Tham gia hội nghị quốc tế</Text>
                    </li>
                    <li className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-600 rounded-full'></div>
                      <Text variant='caption'>Chương trình mentoring</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Join Us CTA */}
        <section className='py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white'>
          <Container>
            <div className='text-center'>
              <Heading level={2} color='white' className='mb-4'>
                Tham gia đội ngũ của chúng tôi
              </Heading>
              <Text
                variant='subtitle'
                color='white'
                className='mb-8 max-w-2xl mx-auto'
              >
                Bạn có đam mê với công nghệ sinh học và muốn đóng góp vào sự
                phát triển của ngành?
              </Text>
              <a
                href='/careers'
                className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block'
              >
                Xem cơ hội nghề nghiệp
              </a>
            </div>
          </Container>
        </section>
      </div>
    </MasterLayout>
  );
}
