import type { Meta, StoryObj } from '@storybook/react';
import type { StrapiBlock } from '../../types';
import BlogContentBody from './index';

const meta = {
  title: 'Blog/BlogContentBody',
  component: BlogContentBody,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogContentBody>;

export default meta;
type Story = StoryObj<typeof meta>;

// Complete article data matching Strapi structure
const completeArticle: StrapiBlock[] = [
  {
    __component: 'shared.rich-text',
    id: 121,
    body: '# Hiểu về công nghệ sinh học\n\nTrong lĩnh vực kiến thức, hiểu về công nghệ sinh học đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học hiện đại. Công nghệ này đã được phát triển và tinh chỉnh qua nhiều năm nghiên cứu, mang lại những kết quả đáng kể trong việc cải thiện hiệu suất và độ chính xác của các quy trình sinh học.',
  },
  {
    __component: 'shared.rich-text',
    id: 122,
    body: '## Tổng quan kỹ thuật\n\nCông nghệ này sử dụng các thuật toán tiên tiến và phương pháp phân tích dữ liệu hiện đại để đạt được kết quả chính xác và hiệu quả cao. Việc tích hợp machine learning và artificial intelligence đã mở ra những khả năng mới trong việc xử lý và phân tích các dữ liệu phức tạp từ các thí nghiệm sinh học.\n\n### Nguyên lý hoạt động\n\nHệ thống hoạt động dựa trên việc thu thập dữ liệu từ nhiều nguồn khác nhau, sau đó áp dụng các thuật toán tiên tiến để phân tích và đưa ra kết quả. Quá trình này bao gồm các bước tiền xử lý dữ liệu, trích xuất đặc trưng, và phân loại thông tin một cách tự động và chính xác.',
  },
  {
    __component: 'shared.quote',
    id: 61,
    title: 'Dr. Nguyễn Văn An - Chuyên gia Công nghệ Sinh học',
    body: 'Hiểu về công nghệ sinh học đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học vào thực tiễn. Chúng tôi tin rằng đây sẽ là chìa khóa để giải quyết nhiều thách thức trong lĩnh vực kiến thức. Việc áp dụng công nghệ này đã mang lại những kết quả tích cực và hứa hẹn cho tương lai của ngành công nghệ sinh học tại Việt Nam.',
  },
  {
    __component: 'shared.media',
    id: 35,
    file: {
      url: 'https://picsum.photos/800/600?random=1',
      alternativeText: 'Biotechnology laboratory research',
      formats: {
        thumbnail: { url: 'https://picsum.photos/208/156?random=1' },
        small: { url: 'https://picsum.photos/500/375?random=1' },
        medium: { url: 'https://picsum.photos/750/563?random=1' },
      },
    },
  },
  {
    __component: 'shared.rich-text',
    id: 123,
    body: '## Các ứng dụng chính\n\n### 1. Ứng dụng trong nghiên cứu khoa học\n- **Phân tích dữ liệu**: Sử dụng AI và machine learning để xử lý các dataset lớn từ các thí nghiệm sinh học\n- **Mô phỏng**: Tạo mô hình 3D và simulation để dự đoán kết quả thí nghiệm\n- **Thử nghiệm**: Các phương pháp thí nghiệm tiên tiến với độ chính xác cao\n- **Tối ưu hóa**: Cải thiện quy trình nghiên cứu và giảm thiểu sai sót',
  },
  {
    __component: 'shared.slider',
    id: 17,
    slides: [
      {
        image: { url: 'https://picsum.photos/800/600?random=2' },
        caption: 'Laboratory equipment and research tools',
      },
      {
        image: { url: 'https://picsum.photos/800/600?random=3' },
        caption: 'Advanced biotechnology research facility',
      },
      {
        image: { url: 'https://picsum.photos/800/600?random=4' },
        caption: 'Innovative biotech solutions in action',
      },
    ],
  },
  {
    __component: 'shared.rich-text',
    id: 124,
    body: '### 2. Ứng dụng trong sản xuất công nghiệp\n- **Tối ưu hóa quy trình**: Cải thiện hiệu suất sản xuất và giảm chi phí vận hành\n- **Kiểm soát chất lượng**: Đảm bảo tiêu chuẩn cao trong từng giai đoạn sản xuất\n- **Tự động hóa**: Giảm thiểu can thiệp thủ công và tăng tính nhất quán\n- **Giám sát**: Theo dõi liên tục các thông số quan trọng trong quá trình sản xuất',
  },
  {
    __component: 'shared.media',
    id: 36,
    file: {
      url: 'https://picsum.photos/800/600?random=5',
      alternativeText: 'Industrial biotechnology applications',
      formats: {
        thumbnail: { url: 'https://picsum.photos/208/156?random=5' },
        small: { url: 'https://picsum.photos/500/375?random=5' },
        medium: { url: 'https://picsum.photos/750/563?random=5' },
      },
    },
  },
  {
    __component: 'shared.rich-text',
    id: 125,
    body: '### 3. Ứng dụng trong chẩn đoán y tế\n- **Phát hiện sớm**: Chẩn đoán bệnh ở giai đoạn đầu với độ chính xác cao\n- **Độ chính xác cao**: Giảm tỷ lệ sai sót và cải thiện chất lượng chẩn đoán\n- **Tốc độ nhanh**: Kết quả trong thời gian ngắn, hỗ trợ điều trị kịp thời\n- **Tiết kiệm chi phí**: Giảm chi phí xét nghiệm và điều trị cho bệnh nhân',
  },
  {
    __component: 'shared.rich-text',
    id: 126,
    body: '## Thống kê và số liệu hiệu suất\n\n### Bảng thống kê chi tiết\n\n| Chỉ số | Giá trị | Đơn vị | Mô tả |\n|--------|---------|--------|--------|\n| Hiệu suất | 95% | % | Tỷ lệ thành công trong các thí nghiệm |\n| Thời gian xử lý | 2.5 | giây | Thời gian trung bình để xử lý một mẫu |\n| Độ chính xác | 98.7 | % | Độ chính xác trong việc phân loại và chẩn đoán |\n| Chi phí | 15% | giảm | Mức giảm chi phí so với phương pháp truyền thống |\n| Khả năng mở rộng | 10x | lần | Khả năng xử lý đồng thời nhiều mẫu |\n| Độ tin cậy | 99.5 | % | Tỷ lệ hoạt động ổn định của hệ thống |\n\n### Phân tích kết quả chi tiết\n\nDựa trên các số liệu trên, chúng ta có thể thấy rằng hiểu về công nghệ sinh học mang lại hiệu quả cao trong việc:\n\n1. **Tăng hiệu suất**: Cải thiện 95% so với phương pháp truyền thống, giúp tiết kiệm thời gian và nguồn lực\n2. **Tiết kiệm thời gian**: Giảm thời gian xử lý xuống còn 2.5 giây, tăng tốc độ nghiên cứu và chẩn đoán\n3. **Độ chính xác cao**: Đạt 98.7% độ chính xác, giảm thiểu sai sót và cải thiện chất lượng kết quả\n4. **Tiết kiệm chi phí**: Giảm 15% chi phí vận hành, làm cho công nghệ này trở nên khả thi về mặt kinh tế\n5. **Khả năng mở rộng**: Có thể xử lý đồng thời nhiều mẫu, phù hợp với nhu cầu sản xuất quy mô lớn',
  },
];

const mockRichTextBlock: StrapiBlock = {
  __component: 'shared.rich-text',
  id: 1,
  body: `# Hiểu về công nghệ sinh học

Công nghệ sinh học đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học hiện đại.

## Tổng quan kỹ thuật

Công nghệ này sử dụng các thuật toán tiên tiến và phương pháp phân tích dữ liệu hiện đại.

### Nguyên lý hoạt động

Hệ thống hoạt động dựa trên việc thu thập dữ liệu từ nhiều nguồn khác nhau.`,
} as StrapiBlock;

const mockQuoteBlock: StrapiBlock = {
  __component: 'shared.quote',
  id: 2,
  title: 'Dr. Nguyễn Văn An - Chuyên gia Công nghệ Sinh học',
  body: 'Hiểu về công nghệ sinh học đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học vào thực tiễn.',
} as StrapiBlock;

const mockMediaBlock: StrapiBlock = {
  __component: 'shared.media',
  id: 3,
  file: {
    url: 'https://picsum.photos/800/600',
    alternativeText: 'Sample image',
    formats: {
      medium: { url: 'https://picsum.photos/800/600' },
    },
  },
} as StrapiBlock;

const mockSliderBlock: StrapiBlock = {
  __component: 'shared.slider',
  id: 4,
  slides: [
    {
      image: { url: 'https://picsum.photos/800/600?random=1' },
      caption: 'First slide',
    },
    {
      image: { url: 'https://picsum.photos/800/600?random=2' },
      caption: 'Second slide',
    },
  ],
} as StrapiBlock;

export const CompleteArticle: Story = {
  args: {
    blocks: completeArticle,
  },
};

export const Default: Story = {
  args: {
    blocks: [mockRichTextBlock],
  },
};

export const WithAllBlockTypes: Story = {
  args: {
    blocks: [
      mockRichTextBlock,
      mockQuoteBlock,
      mockMediaBlock,
      mockRichTextBlock,
      mockSliderBlock,
    ],
  },
};

export const WithQuoteOnly: Story = {
  args: {
    blocks: [mockQuoteBlock],
  },
};

export const WithMediaOnly: Story = {
  args: {
    blocks: [mockMediaBlock],
  },
};

export const WithRichTextOnly: Story = {
  args: {
    blocks: [mockRichTextBlock],
  },
};

export const EmptyBlocks: Story = {
  args: {
    blocks: [],
  },
};

export const MultipleRichTextBlocks: Story = {
  args: {
    blocks: [
      {
        __component: 'shared.rich-text',
        id: 1,
        body: '## Section 1\n\nContent for section one.',
      },
      {
        __component: 'shared.rich-text',
        id: 2,
        body: '## Section 2\n\nContent for section two with **bold** and *italic* text.',
      },
      {
        __component: 'shared.rich-text',
        id: 3,
        body: '## Section 3\n\nContent for section three with:\n\n- List item 1\n- List item 2\n- List item 3',
      },
    ] as StrapiBlock[],
  },
};

export const WithLinks: Story = {
  args: {
    blocks: [
      {
        __component: 'shared.rich-text',
        id: 100,
        body: `# Links in Blog Content

This article demonstrates various types of links used in blog content.

## Internal and External Links

Visit our [homepage](https://ktbiotech.com) to learn more about our services.

For detailed information, check out our [products page](https://ktbiotech.com/products).

You can also read more on [Wikipedia](https://en.wikipedia.org/wiki/Biotechnology) about biotechnology.

## Links with Inline Code

Here's how to create a link in markdown: [Example Link](https://example.com)

Visit [GitHub](https://github.com) for open source projects.

## Links in Lists

Important resources:
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## External Link Indicators

Notice how external links show a ↗ symbol to indicate they open in a new window.

Internal links without the symbol are local pages.`,
      },
    ] as StrapiBlock[],
  },
};

export const WithCodeAndLinks: Story = {
  args: {
    blocks: [
      {
        __component: 'shared.rich-text',
        id: 101,
        body: `# Technical Content with Links and Code

Learn more about [our API](https://api.ktbiotech.com) or check out this code example:

\`\`\`javascript
// Example API call
const response = await fetch('https://api.example.com/data');
const data = await response.json();
\`\`\`

For more information, visit the [official documentation](https://docs.ktbiotech.com).

## Inline Code with Links

Visit \`https://example.com\` or learn more about [Next.js](https://nextjs.org) framework.

You can also check [this article](https://blog.example.com/article) for detailed explanation.`,
      },
    ] as StrapiBlock[],
  },
};
