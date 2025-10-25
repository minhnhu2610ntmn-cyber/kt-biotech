// eslint-disable-next-line no-restricted-imports
import { AboutSection } from '../components/containers';

export default function AboutPage() {
  const items = [
    {
      title: 'Về chúng tôi',
      description:
        'KTBioTech là công ty công nghệ sinh học hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp và dịch vụ nghiên cứu khoa học tiên tiến. Với đội ngũ chuyên gia giàu kinh nghiệm và trang thiết bị hiện đại.',
      link: '/about/company',
    },
    {
      title: 'Đội ngũ chuyên gia',
      description:
        'Chúng tôi có đội ngũ hơn 50 chuyên gia với kinh nghiệm trung bình 15 năm trong lĩnh vực công nghệ sinh học. Đội ngũ của chúng tôi được đào tạo bài bản và có kinh nghiệm làm việc tại nhiều quốc gia.',
      link: '/about/team',
    },
    {
      title: 'Sứ mệnh & Tầm nhìn',
      description:
        'Sứ mệnh của chúng tôi là mang đến những giải pháp công nghệ sinh học tiên tiến, góp phần nâng cao chất lượng chăm sóc sức khỏe. Tầm nhìn là trở thành công ty hàng đầu tại Việt Nam và khu vực Đông Nam Á.',
      link: '/about/mission',
    },
    {
      title: 'Cơ cấu',
      description:
        'Sứ mệnh của chúng tôi là mang đến những giải pháp công nghệ sinh học tiên tiến, góp phần nâng cao chất lượng chăm sóc sức khỏe. Tầm nhìn là trở thành công ty hàng đầu tại Việt Nam và khu vực Đông Nam Á.',
      link: '/about/mission',
    },
    {
      title: 'CHỨNG NHẬN',
      description:
        'Sứ mệnh của chúng tôi là mang đến những giải pháp công nghệ sinh học tiên tiến, góp phần nâng cao chất lượng chăm sóc sức khỏe. Tầm nhìn là trở thành công ty hàng đầu tại Việt Nam và khu vực Đông Nam Á.',
      link: '/about/mission',
    },
  ];
  return <AboutSection items={items} />;
}
