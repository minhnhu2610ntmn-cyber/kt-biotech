import { Container, Heading, Text } from '@ktbiotech/system-design';
import { MasterLayout } from '../../components/layout';

export default function CompanyPage() {
  return (
    <MasterLayout>
      <div className='min-h-screen bg-[#F7FBFD]'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16'>
          <Container>
            <div className='text-center'>
              <Heading level={1} color='white' className='mb-6'>
                Về chúng tôi
              </Heading>
              <Text
                variant='subtitle'
                color='white'
                className='text-xl max-w-3xl mx-auto'
              >
                Khám phá câu chuyện và hành trình phát triển của KTBioTech
              </Text>
            </div>
          </Container>
        </section>

        {/* Company Story */}
        <section className='py-16'>
          <Container>
            <div className='max-w-4xl mx-auto'>
              <Heading level={2} color='#215778' className='mb-8 text-center'>
                Câu chuyện của chúng tôi
              </Heading>

              <div className='space-y-8'>
                <div className='bg-white rounded-lg shadow-lg p-8'>
                  <Heading level={3} color='#215778' className='mb-4'>
                    Khởi đầu từ đam mê
                  </Heading>
                  <Text variant='body' className='mb-4'>
                    KTBioTech được thành lập vào năm 2014 bởi một nhóm các nhà
                    khoa học và chuyên gia công nghệ sinh học có kinh nghiệm lâu
                    năm trong ngành. Với niềm đam mê nghiên cứu và mong muốn
                    đóng góp vào sự phát triển của ngành công nghệ sinh học tại
                    Việt Nam, chúng tôi đã bắt đầu hành trình của mình.
                  </Text>
                  <Text variant='body'>
                    Từ những ngày đầu với chỉ vài nhân viên và một phòng thí
                    nghiệm nhỏ, chúng tôi đã không ngừng nỗ lực để phát triển và
                    mở rộng quy mô hoạt động.
                  </Text>
                </div>

                <div className='bg-white rounded-lg shadow-lg p-8'>
                  <Heading level={3} color='#215778' className='mb-4'>
                    Những cột mốc quan trọng
                  </Heading>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-4'>
                      <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        1
                      </div>
                      <div>
                        <Text variant='body' className='font-semibold'>
                          2014 - Thành lập công ty
                        </Text>
                        <Text variant='caption' color='muted'>
                          KTBioTech được thành lập với sứ mệnh mang công nghệ
                          sinh học đến Việt Nam
                        </Text>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        2
                      </div>
                      <div>
                        <Text variant='body' className='font-semibold'>
                          2016 - Mở rộng phòng thí nghiệm
                        </Text>
                        <Text variant='caption' color='muted'>
                          Đầu tư trang thiết bị hiện đại và mở rộng đội ngũ
                          nghiên cứu
                        </Text>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        3
                      </div>
                      <div>
                        <Text variant='body' className='font-semibold'>
                          2018 - Hợp tác quốc tế
                        </Text>
                        <Text variant='caption' color='muted'>
                          Thiết lập quan hệ đối tác với các công ty công nghệ
                          sinh học hàng đầu thế giới
                        </Text>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        4
                      </div>
                      <div>
                        <Text variant='body' className='font-semibold'>
                          2020 - Mở rộng thị trường
                        </Text>
                        <Text variant='caption' color='muted'>
                          Bắt đầu xuất khẩu sản phẩm và dịch vụ ra thị trường
                          khu vực Đông Nam Á
                        </Text>
                      </div>
                    </div>
                    <div className='flex items-start gap-4'>
                      <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                        5
                      </div>
                      <div>
                        <Text variant='body' className='font-semibold'>
                          2024 - Hiện tại
                        </Text>
                        <Text variant='caption' color='muted'>
                          Trở thành một trong những công ty công nghệ sinh học
                          hàng đầu tại Việt Nam
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white rounded-lg shadow-lg p-8'>
                  <Heading level={3} color='#215778' className='mb-4'>
                    Tương lai phía trước
                  </Heading>
                  <Text variant='body' className='mb-4'>
                    Chúng tôi tiếp tục đầu tư vào nghiên cứu và phát triển, mở
                    rộng danh mục sản phẩm và dịch vụ để đáp ứng nhu cầu ngày
                    càng cao của thị trường. Mục tiêu của chúng tôi là trở thành
                    công ty công nghệ sinh học hàng đầu tại Việt Nam và khu vực
                    Đông Nam Á.
                  </Text>
                  <Text variant='body'>
                    Chúng tôi cam kết tiếp tục đóng góp vào sự phát triển của
                    ngành công nghệ sinh học, mang đến những giải pháp tiên tiến
                    nhất cho khách hàng và đối tác.
                  </Text>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </MasterLayout>
  );
}
