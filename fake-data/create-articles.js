#!/usr/bin/env node

/**
 * Script đơn giản để tạo articles cho blog KTBioTech
 * Sử dụng axios để call API
 */

const axios = require('axios');

// Cấu hình API hard code
const API_CONFIG = {
  baseUrl: 'http://103.90.225.225:1337',
  categoriesEndpoint: '/api/categories',
  articlesEndpoint: '/api/articles',
  uploadEndpoint: '/api/upload',
  token:
    '10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b',
  timeout: 15000, // 15 giây
};

// Nguồn hình ảnh online
const IMAGE_SOURCES = ['https://picsum.photos/800/600?random='];

// Danh sách chủ đề về công nghệ sinh học theo category
const TOPICS_BY_CATEGORY = {
  'Blog nghiên cứu': [
    'Nghiên cứu về CRISPR-Cas9 trong điều trị ung thư',
    'Ứng dụng AI trong phân tích dữ liệu sinh học',
    'Nghiên cứu vaccine mRNA cho các bệnh mới nổi',
    'Phát triển thuốc từ thực vật dược liệu',
    'Nghiên cứu microbiome và sức khỏe con người',
    'Công nghệ chỉnh sửa gen trong nông nghiệp',
    'Nghiên cứu protein folding và bệnh Alzheimer',
    'Ứng dụng blockchain trong quản lý dữ liệu y tế',
    'Nghiên cứu tế bào gốc trong tái tạo mô',
    'Phát triển phương pháp chẩn đoán không xâm lấn',
  ],
  'Tin Công Ty': [
    'KTBioTech ra mắt sản phẩm mới',
    'Hợp tác quốc tế với các đối tác lớn',
    'Thành tựu nghiên cứu của KTBioTech',
    'Triển lãm công nghệ sinh học 2024',
    'Giải thưởng khoa học cho KTBioTech',
    'Mở rộng nhà máy sản xuất',
    'Tuyển dụng chuyên gia hàng đầu',
    'Hội thảo khoa học quốc tế',
    'Đầu tư vào nghiên cứu và phát triển',
    'Chứng nhận chất lượng quốc tế',
  ],
  'Kiến thức': [
    'Hiểu về công nghệ sinh học',
    'Nguyên lý hoạt động của PCR',
    'Cách thức ELISA hoạt động',
    'CRISPR là gì và ứng dụng',
    'Phân biệt các loại vaccine',
    'Cách đọc kết quả xét nghiệm',
    'Quy trình sản xuất thuốc',
    'An toàn trong phòng thí nghiệm',
    'Bảo quản mẫu sinh học',
    'Chuẩn hóa quy trình nghiên cứu',
  ],
};

const TAGS = [
  'Công nghệ sinh học',
  'Nghiên cứu khoa học',
  'Y học',
  'Dược phẩm',
  'Chẩn đoán',
  'Điều trị',
  'Vaccine',
  'Genetics',
  'Microbiology',
  'Biotechnology',
];

// Hàm tạo slug từ title với unique identifier
function createSlug(title, index = 0) {
  const baseSlug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  // Thêm timestamp và index để đảm bảo unique
  const timestamp = Date.now().toString().slice(-6); // 6 số cuối của timestamp
  const randomSuffix = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');

  return `${baseSlug}-${timestamp}-${randomSuffix}`;
}

// Hàm tạo description ngắn gọn từ topic (giới hạn 80 ký tự)
function createDescription(topic) {
  // Tạo description ngắn gọn từ topic
  const descriptions = [
    `Bài viết về ${topic.toLowerCase()}`,
    `Tìm hiểu về ${topic.toLowerCase()}`,
    `Nghiên cứu ${topic.toLowerCase()}`,
    `Ứng dụng ${topic.toLowerCase()}`,
    `Phát triển ${topic.toLowerCase()}`,
    `Khám phá ${topic.toLowerCase()}`,
    `Cập nhật ${topic.toLowerCase()}`,
    `Thông tin ${topic.toLowerCase()}`,
  ];

  // Chọn description ngẫu nhiên
  let description =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  // Đảm bảo không quá 80 ký tự
  if (description.length > 80) {
    // Nếu vẫn quá dài, cắt topic và giữ lại phần đầu
    const maxTopicLength = 80 - description.split(' ')[0].length - 1; // Trừ đi từ đầu và khoảng trắng
    const shortTopic = topic.substring(0, maxTopicLength);
    description = `${descriptions[0].split(' ')[0]} ${shortTopic}`;

    // Nếu vẫn quá dài, cắt cứng
    if (description.length > 80) {
      description = `${description.substring(0, 77)}...`;
    }
  }

  return description;
}

// Hàm tạo excerpt từ content (giới hạn 80 ký tự)
function createExcerpt(content) {
  // Lấy 20 từ đầu
  const words = content.split(' ');
  let excerpt = words.slice(0, 20).join(' ');

  // Nếu quá 80 ký tự, cắt ngắn lại
  if (excerpt.length > 80) {
    excerpt = `${excerpt.substring(0, 77)}...`;
  } else {
    excerpt += '...';
  }

  return excerpt;
}

// Hàm tạo blocks content cho article (theo format Strapi) - Cover tất cả các case
function generateArticleBlocks(topic, categoryName) {
  // Các template blocks khác nhau với nhiều loại components
  const blockTemplates = [
    // Template 1: Technical focus với đầy đủ các loại blocks
    [
      {
        __component: 'shared.rich-text',
        body: `# ${topic}\n\nTrong lĩnh vực ${categoryName.toLowerCase()}, ${topic.toLowerCase()} đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học hiện đại. Công nghệ này đã được phát triển và tinh chỉnh qua nhiều năm nghiên cứu, mang lại những kết quả đáng kể trong việc cải thiện hiệu suất và độ chính xác của các quy trình sinh học.\n\n## Tổng quan kỹ thuật\n\nCông nghệ này sử dụng các thuật toán tiên tiến và phương pháp phân tích dữ liệu hiện đại để đạt được kết quả chính xác và hiệu quả cao. Việc tích hợp machine learning và artificial intelligence đã mở ra những khả năng mới trong việc xử lý và phân tích các dữ liệu phức tạp từ các thí nghiệm sinh học.\n\n### Nguyên lý hoạt động\n\nHệ thống hoạt động dựa trên việc thu thập dữ liệu từ nhiều nguồn khác nhau, sau đó áp dụng các thuật toán tiên tiến để phân tích và đưa ra kết quả. Quá trình này bao gồm các bước tiền xử lý dữ liệu, trích xuất đặc trưng, và phân loại thông tin một cách tự động và chính xác.`,
      },
      {
        __component: 'shared.quote',
        title: 'Dr. Nguyễn Văn An - Chuyên gia Công nghệ Sinh học',
        body: `"${topic.toLowerCase()} đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học vào thực tiễn. Chúng tôi tin rằng đây sẽ là chìa khóa để giải quyết nhiều thách thức trong lĩnh vực ${categoryName.toLowerCase()}. Việc áp dụng công nghệ này đã mang lại những kết quả tích cực và hứa hẹn cho tương lai của ngành công nghệ sinh học tại Việt Nam."`,
      },
      {
        __component: 'shared.media',
        file: null,
      },
      {
        __component: 'shared.rich-text',
        body: `## Các ứng dụng chính\n\n### 1. Ứng dụng trong nghiên cứu khoa học\n- **Phân tích dữ liệu**: Sử dụng AI và machine learning để xử lý các dataset lớn từ các thí nghiệm sinh học\n- **Mô phỏng**: Tạo mô hình 3D và simulation để dự đoán kết quả thí nghiệm\n- **Thử nghiệm**: Các phương pháp thí nghiệm tiên tiến với độ chính xác cao\n- **Tối ưu hóa**: Cải thiện quy trình nghiên cứu và giảm thiểu sai sót\n\n### 2. Ứng dụng trong sản xuất công nghiệp\n- **Tối ưu hóa quy trình**: Cải thiện hiệu suất sản xuất và giảm chi phí vận hành\n- **Kiểm soát chất lượng**: Đảm bảo tiêu chuẩn cao trong từng giai đoạn sản xuất\n- **Tự động hóa**: Giảm thiểu can thiệp thủ công và tăng tính nhất quán\n- **Giám sát**: Theo dõi liên tục các thông số quan trọng trong quá trình sản xuất\n\n### 3. Ứng dụng trong chẩn đoán y tế\n- **Phát hiện sớm**: Chẩn đoán bệnh ở giai đoạn đầu với độ chính xác cao\n- **Độ chính xác cao**: Giảm tỷ lệ sai sót và cải thiện chất lượng chẩn đoán\n- **Tốc độ nhanh**: Kết quả trong thời gian ngắn, hỗ trợ điều trị kịp thời\n- **Tiết kiệm chi phí**: Giảm chi phí xét nghiệm và điều trị cho bệnh nhân`,
      },
      {
        __component: 'shared.slider',
        files: [], // Slider với nhiều images
      },
      {
        __component: 'shared.rich-text',
        body: `## Thống kê và số liệu hiệu suất\n\n### Bảng thống kê chi tiết\n\n| Chỉ số | Giá trị | Đơn vị | Mô tả |\n|--------|---------|--------|--------|\n| Hiệu suất | 95% | % | Tỷ lệ thành công trong các thí nghiệm |\n| Thời gian xử lý | 2.5 | giây | Thời gian trung bình để xử lý một mẫu |\n| Độ chính xác | 98.7 | % | Độ chính xác trong việc phân loại và chẩn đoán |\n| Chi phí | 15% | giảm | Mức giảm chi phí so với phương pháp truyền thống |\n| Khả năng mở rộng | 10x | lần | Khả năng xử lý đồng thời nhiều mẫu |\n| Độ tin cậy | 99.5 | % | Tỷ lệ hoạt động ổn định của hệ thống |\n\n### Phân tích kết quả chi tiết\n\nDựa trên các số liệu trên, chúng ta có thể thấy rằng ${topic.toLowerCase()} mang lại hiệu quả cao trong việc:\n\n1. **Tăng hiệu suất**: Cải thiện 95% so với phương pháp truyền thống, giúp tiết kiệm thời gian và nguồn lực\n2. **Tiết kiệm thời gian**: Giảm thời gian xử lý xuống còn 2.5 giây, tăng tốc độ nghiên cứu và chẩn đoán\n3. **Độ chính xác cao**: Đạt 98.7% độ chính xác, giảm thiểu sai sót và cải thiện chất lượng kết quả\n4. **Tiết kiệm chi phí**: Giảm 15% chi phí vận hành, làm cho công nghệ này trở nên khả thi về mặt kinh tế\n5. **Khả năng mở rộng**: Có thể xử lý đồng thời nhiều mẫu, phù hợp với nhu cầu sản xuất quy mô lớn`,
      },
    ],

    // Template 2: Business focus với nhiều loại blocks
    [
      {
        __component: 'shared.rich-text',
        body: `# ${topic}\n\n## Tầm quan trọng trong thị trường hiện tại\n\nTrong bối cảnh thị trường ${categoryName.toLowerCase()} đang phát triển mạnh mẽ với tốc độ tăng trưởng hàng năm lên đến 15-20%, ${topic.toLowerCase()} đang trở thành một yếu tố quan trọng trong việc nâng cao năng lực cạnh tranh của các doanh nghiệp. Công nghệ này không chỉ giúp các công ty tiết kiệm chi phí mà còn cải thiện đáng kể chất lượng sản phẩm và dịch vụ.\n\n## Lợi ích kinh doanh cụ thể\n\n### Tiết kiệm chi phí vận hành\n- **Giảm chi phí nhân lực**: Tự động hóa các quy trình, giảm nhu cầu nhân lực thủ công\n- **Tiết kiệm nguyên liệu**: Tối ưu hóa quy trình sản xuất, giảm lãng phí nguyên liệu\n- **Giảm chi phí bảo trì**: Hệ thống tự động giám sát và báo cáo, giảm chi phí bảo trì định kỳ\n- **Tổng tiết kiệm**: Có thể tiết kiệm đến 30% tổng chi phí vận hành\n\n### Tăng năng suất và hiệu quả\n- **Tăng tốc độ sản xuất**: Xử lý nhanh hơn 5-10 lần so với phương pháp truyền thống\n- **Cải thiện chất lượng**: Giảm tỷ lệ sản phẩm lỗi xuống dưới 1%\n- **Tăng khả năng mở rộng**: Dễ dàng mở rộng quy mô sản xuất khi cần thiết\n- **Tối ưu hóa nguồn lực**: Sử dụng hiệu quả tài nguyên và thiết bị`,
      },
      {
        __component: 'shared.quote',
        title: 'Case Study - Bệnh viện Chợ Rẫy',
        body: `"Việc áp dụng ${topic.toLowerCase()} tại Bệnh viện Chợ Rẫy đã giúp chúng tôi cải thiện đáng kể quy trình chẩn đoán. Thời gian xử lý mẫu giảm từ 24 giờ xuống còn 2 giờ, và độ chính xác tăng lên 99.2%. Điều này không chỉ giúp bệnh nhân được chẩn đoán nhanh hơn mà còn giảm chi phí điều trị và tăng hiệu quả sử dụng giường bệnh."`,
      },
      {
        __component: 'shared.media',
        file: null,
      },
      {
        __component: 'shared.rich-text',
        body: `## Lộ trình phát triển và triển khai\n\n### Giai đoạn 1 (2024) - Nghiên cứu và phát triển\n- ✅ **Hoàn thành nghiên cứu cơ bản**: Đã hoàn thành các nghiên cứu về nguyên lý hoạt động và ứng dụng\n- ✅ **Phát triển prototype**: Tạo ra phiên bản đầu tiên với các tính năng cơ bản\n- ✅ **Thử nghiệm trong phòng lab**: Kiểm tra và đánh giá hiệu suất trong môi trường kiểm soát\n- ✅ **Tối ưu hóa thuật toán**: Cải thiện độ chính xác và tốc độ xử lý\n\n### Giai đoạn 2 (2025) - Thử nghiệm và tinh chỉnh\n- 🔄 **Thử nghiệm lâm sàng**: Áp dụng thực tế tại các bệnh viện và phòng khám\n- 🔄 **Tối ưu hóa thuật toán**: Tiếp tục cải thiện dựa trên phản hồi từ người dùng\n- 🔄 **Phát triển giao diện người dùng**: Tạo ra giao diện thân thiện và dễ sử dụng\n- 🔄 **Đào tạo nhân viên**: Huấn luyện đội ngũ kỹ thuật và người dùng cuối\n\n### Giai đoạn 3 (2026) - Thương mại hóa và mở rộng\n- ⏳ **Triển khai thương mại**: Đưa sản phẩm ra thị trường với quy mô lớn\n- ⏳ **Mở rộng thị trường**: Phát triển tại các tỉnh thành khác trong cả nước\n- ⏳ **Phát triển các ứng dụng mới**: Mở rộng sang các lĩnh vực khác như nông nghiệp, môi trường\n- ⏳ **Hợp tác quốc tế**: Ký kết các thỏa thuận hợp tác với các đối tác nước ngoài`,
      },
      {
        __component: 'shared.slider',
        files: [], // Slider với nhiều images
      },
      {
        __component: 'shared.quote',
        title: 'KTBioTech - Tầm nhìn và sứ mệnh',
        body: `"Chúng tôi đặt mục tiêu trở thành công ty công nghệ sinh học hàng đầu tại Việt Nam, với sứ mệnh mang đến những giải pháp tiên tiến nhất cho cộng đồng khoa học và y tế. ${topic.toLowerCase()} là một trong những bước tiến quan trọng trên con đường này, và chúng tôi cam kết sẽ tiếp tục đầu tư và phát triển để mang lại giá trị tốt nhất cho khách hàng và cộng đồng."`,
      },
    ],

    // Template 3: Research focus với đầy đủ các loại blocks
    [
      {
        __component: 'shared.rich-text',
        body: `# ${topic}\n\n## Nghiên cứu và phát triển trong lĩnh vực ${categoryName.toLowerCase()}\n\nTrong lĩnh vực ${categoryName.toLowerCase()}, ${topic.toLowerCase()} đang được nghiên cứu và phát triển với sự đầu tư lớn từ các tổ chức khoa học và công ty công nghệ. Dự án này được thực hiện bởi một đội ngũ chuyên gia có kinh nghiệm với sự hỗ trợ từ các trường đại học hàng đầu và các viện nghiên cứu quốc tế.\n\n## Phương pháp nghiên cứu và phát triển\n\n### Thuật toán chính và nguyên lý hoạt động\n\nHệ thống sử dụng một loạt các thuật toán tiên tiến bao gồm machine learning, deep learning, và các kỹ thuật xử lý tín hiệu số. Quá trình nghiên cứu được thực hiện theo phương pháp khoa học nghiêm ngặt với các thí nghiệm có kiểm soát và đánh giá định lượng.\n\n### Code example và implementation\n\n\`\`\`python\n# Ví dụ về thuật toán xử lý chính\ndef process_sample(data):\n    \"\"\"\n    Xử lý mẫu dữ liệu sinh học\n    Args:\n        data: Dữ liệu đầu vào từ thiết bị đo\n    Returns:\n        result: Kết quả phân tích\n    \"\"\"\n    # Bước 1: Tiền xử lý dữ liệu\n    cleaned_data = preprocess(data)\n    \n    # Bước 2: Trích xuất đặc trưng\n    features = extract_features(cleaned_data)\n    \n    # Bước 3: Phân loại và chẩn đoán\n    result = classify(features)\n    \n    # Bước 4: Đánh giá độ tin cậy\n    confidence = calculate_confidence(result)\n    \n    return {\n        'result': result,\n        'confidence': confidence,\n        'timestamp': datetime.now()\n    }\n\`\`\`\n\n### Quy trình xử lý chi tiết\n\n1. **Thu thập dữ liệu**: Từ các nguồn khác nhau bao gồm thiết bị đo, cơ sở dữ liệu, và các hệ thống giám sát\n2. **Tiền xử lý**: Làm sạch và chuẩn hóa dữ liệu, loại bỏ nhiễu và các giá trị bất thường\n3. **Trích xuất đặc trưng**: Sử dụng các thuật toán AI để xác định các đặc điểm quan trọng\n4. **Phân loại**: Áp dụng machine learning để phân loại và dự đoán kết quả\n5. **Đánh giá kết quả**: Kiểm tra độ chính xác và độ tin cậy của kết quả\n6. **Báo cáo**: Tạo báo cáo chi tiết với các biểu đồ và phân tích thống kê`,
      },
      {
        __component: 'shared.quote',
        title: 'Prof. Trần Thị Bình - Viện Nghiên cứu Khoa học',
        body: `"Nghiên cứu về ${topic.toLowerCase()} đã mở ra những cơ hội mới trong việc ứng dụng công nghệ sinh học vào thực tiễn. Chúng tôi tin rằng đây sẽ là một breakthrough quan trọng trong ngành, có khả năng thay đổi cách thức chúng ta tiếp cận các vấn đề sinh học phức tạp. Kết quả nghiên cứu cho thấy tiềm năng to lớn trong việc cải thiện chất lượng cuộc sống và phát triển bền vững."`,
      },
      {
        __component: 'shared.media',
        file: null,
      },
      {
        __component: 'shared.slider',
        files: [], // Slider với nhiều images
      },
      {
        __component: 'shared.rich-text',
        body: `## Kết quả nghiên cứu và đánh giá hiệu suất\n\n### Thống kê hiệu suất chi tiết\n\n| Metric | Value | Unit | Mô tả chi tiết |\n|--------|-------|------|----------------|\n| Accuracy | 98.7% | % | Độ chính xác trong việc phân loại và chẩn đoán |\n| Processing Time | 2.5s | seconds | Thời gian trung bình để xử lý một mẫu |\n| Memory Usage | 512MB | MB | Lượng RAM cần thiết để chạy hệ thống |\n| CPU Usage | 45% | % | Mức sử dụng CPU trung bình |\n| Throughput | 1000 | samples/hour | Số lượng mẫu có thể xử lý mỗi giờ |\n| Reliability | 99.9% | % | Tỷ lệ hoạt động ổn định của hệ thống |\n\n### So sánh với phương pháp truyền thống\n\nKết quả nghiên cứu cho thấy những cải tiến đáng kể so với các phương pháp truyền thống:\n\n- **Tốc độ**: Nhanh hơn 10 lần, từ 25 giây xuống còn 2.5 giây\n- **Độ chính xác**: Cao hơn 15%, từ 83.7% lên 98.7%\n- **Chi phí**: Thấp hơn 25% do giảm nhu cầu nhân lực và thiết bị\n- **Khả năng mở rộng**: Tốt hơn đáng kể, có thể xử lý đồng thời nhiều mẫu\n- **Tính nhất quán**: Giảm biến động trong kết quả, tăng độ tin cậy\n- **Khả năng tự động hóa**: Giảm 90% can thiệp thủ công\n\n### Phân tích thống kê và độ tin cậy\n\nCác thí nghiệm được thực hiện trên 10,000 mẫu với độ tin cậy 95%. Kết quả cho thấy:\n\n- **Confidence Interval**: 95% CI [98.2%, 99.1%] cho độ chính xác\n- **Standard Deviation**: ±0.8% cho thời gian xử lý\n- **P-value**: <0.001 cho sự khác biệt so với phương pháp truyền thống\n- **Effect Size**: Large (Cohen's d = 2.3) cho hiệu quả tổng thể`,
      },
      {
        __component: 'shared.rich-text',
        body: `## Tương lai và triển vọng phát triển\n\nKTBioTech cam kết tiếp tục đầu tư và phát triển các giải pháp tiên tiến nhất trong lĩnh vực ${categoryName.toLowerCase()}. Chúng tôi tin rằng ${topic.toLowerCase()} sẽ đóng góp quan trọng vào sự phát triển của ngành công nghệ sinh học tại Việt Nam và khu vực Đông Nam Á.\n\n### Hướng phát triển tiếp theo\n\n#### Mở rộng ứng dụng\n- **Nông nghiệp thông minh**: Áp dụng vào việc chẩn đoán bệnh cây trồng và tối ưu hóa năng suất\n- **Y học cá thể hóa**: Phát triển các giải pháp chẩn đoán và điều trị cá thể hóa\n- **Môi trường**: Giám sát chất lượng môi trường và phát hiện ô nhiễm\n- **An toàn thực phẩm**: Kiểm tra và đảm bảo chất lượng thực phẩm\n\n#### Tối ưu hóa và cải tiến\n- **Cải thiện hiệu suất**: Mục tiêu đạt 99.5% độ chính xác\n- **Giảm thời gian xử lý**: Hướng tới xử lý real-time\n- **Tối ưu hóa tài nguyên**: Giảm yêu cầu phần cứng và năng lượng\n- **Cải thiện giao diện**: Phát triển UX/UI thân thiện hơn\n\n#### Thương mại hóa và mở rộng\n- **Đưa ra thị trường**: Phát triển các sản phẩm cụ thể cho từng ngành\n- **Hợp tác quốc tế**: Mở rộng mạng lưới đối tác và khách hàng\n- **Đào tạo nhân lực**: Phát triển chương trình đào tạo chuyên sâu\n- **Nghiên cứu liên tục**: Duy trì và phát triển đội ngũ R&D\n\n### Tác động xã hội và kinh tế\n\nViệc phát triển và ứng dụng ${topic.toLowerCase()} sẽ mang lại những tác động tích cực:\n\n- **Cải thiện chất lượng cuộc sống**: Thông qua việc chẩn đoán và điều trị tốt hơn\n- **Thúc đẩy phát triển kinh tế**: Tạo ra các cơ hội việc làm và đầu tư mới\n- **Nâng cao vị thế quốc tế**: Đưa Việt Nam lên bản đồ công nghệ sinh học thế giới\n- **Phát triển bền vững**: Hỗ trợ các mục tiêu phát triển bền vững của Liên Hợp Quốc`,
      },
    ],

    // Template 4: Mixed content với tất cả các loại blocks
    [
      {
        __component: 'shared.rich-text',
        body: `# ${topic}\n\n## Giới thiệu tổng quan\n\n${topic.toLowerCase()} là một trong những công nghệ tiên tiến nhất hiện nay trong lĩnh vực ${categoryName.toLowerCase()}. Công nghệ này đã được phát triển và ứng dụng thành công tại nhiều quốc gia trên thế giới, mang lại những kết quả tích cực và hứa hẹn cho tương lai của ngành công nghệ sinh học.\n\n## Tầm quan trọng và ứng dụng\n\nCông nghệ này không chỉ giúp cải thiện hiệu suất và độ chính xác của các quy trình sinh học mà còn mở ra những khả năng mới trong việc nghiên cứu và phát triển các giải pháp tiên tiến. Việc áp dụng ${topic.toLowerCase()} đã mang lại những lợi ích đáng kể cho cả cộng đồng khoa học và người dân.`,
      },
      {
        __component: 'shared.quote',
        title: 'Dr. Lê Minh Cường - Giám đốc R&D KTBioTech',
        body: `"${topic.toLowerCase()} đại diện cho một bước tiến quan trọng trong việc ứng dụng công nghệ sinh học vào thực tiễn. Chúng tôi tin rằng đây sẽ là chìa khóa để giải quyết nhiều thách thức trong lĩnh vực ${categoryName.toLowerCase()}. Việc áp dụng công nghệ này đã mang lại những kết quả tích cực và hứa hẹn cho tương lai của ngành công nghệ sinh học tại Việt Nam."`,
      },
      {
        __component: 'shared.media',
        file: null,
      },
      {
        __component: 'shared.rich-text',
        body: `## Công nghệ và kỹ thuật\n\n### Nguyên lý hoạt động\n\nHệ thống hoạt động dựa trên việc thu thập và phân tích dữ liệu từ nhiều nguồn khác nhau. Quá trình này bao gồm các bước:\n\n1. **Thu thập dữ liệu**: Từ các thiết bị đo và hệ thống giám sát\n2. **Tiền xử lý**: Làm sạch và chuẩn hóa dữ liệu\n3. **Phân tích**: Sử dụng các thuật toán AI và machine learning\n4. **Đánh giá**: Kiểm tra độ chính xác và độ tin cậy\n5. **Báo cáo**: Tạo kết quả cuối cùng\n\n### Ưu điểm nổi bật\n\n- **Tốc độ cao**: Xử lý nhanh gấp 10 lần so với phương pháp truyền thống\n- **Độ chính xác**: Đạt 98.7% độ chính xác trong các thí nghiệm\n- **Tiết kiệm chi phí**: Giảm 25% chi phí vận hành\n- **Khả năng mở rộng**: Dễ dàng mở rộng quy mô khi cần thiết`,
      },
      {
        __component: 'shared.slider',
        files: [], // Slider với nhiều images
      },
      {
        __component: 'shared.quote',
        title: 'Case Study - Viện Pasteur TP.HCM',
        body: `"Việc áp dụng ${topic.toLowerCase()} tại Viện Pasteur TP.HCM đã giúp chúng tôi cải thiện đáng kể quy trình nghiên cứu và chẩn đoán. Thời gian xử lý mẫu giảm từ 48 giờ xuống còn 4 giờ, và độ chính xác tăng lên 99.5%. Điều này không chỉ giúp tăng hiệu quả nghiên cứu mà còn giảm chi phí vận hành đáng kể."`,
      },
      {
        __component: 'shared.rich-text',
        body: `## Kết quả và thành tựu\n\n### Thống kê hiệu suất\n\n| Chỉ số | Giá trị | Đơn vị | Mô tả |\n|--------|---------|--------|--------|\n| Hiệu suất | 95% | % | Tỷ lệ thành công trong các thí nghiệm |\n| Thời gian xử lý | 2.5 | giây | Thời gian trung bình để xử lý một mẫu |\n| Độ chính xác | 98.7 | % | Độ chính xác trong việc phân loại và chẩn đoán |\n| Chi phí | 25% | giảm | Mức giảm chi phí so với phương pháp truyền thống |\n| Khả năng mở rộng | 10x | lần | Khả năng xử lý đồng thời nhiều mẫu |\n| Độ tin cậy | 99.5 | % | Tỷ lệ hoạt động ổn định của hệ thống |\n\n### So sánh với phương pháp truyền thống\n\n- **Tốc độ**: Nhanh hơn 10 lần\n- **Độ chính xác**: Cao hơn 15%\n- **Chi phí**: Thấp hơn 25%\n- **Khả năng mở rộng**: Tốt hơn đáng kể\n- **Tính nhất quán**: Giảm biến động trong kết quả\n- **Khả năng tự động hóa**: Giảm 90% can thiệp thủ công`,
      },
      {
        __component: 'shared.rich-text',
        body: `## Tương lai và triển vọng\n\nKTBioTech cam kết tiếp tục đầu tư và phát triển các giải pháp tiên tiến nhất trong lĩnh vực ${categoryName.toLowerCase()}. Chúng tôi tin rằng ${topic.toLowerCase()} sẽ đóng góp quan trọng vào sự phát triển của ngành công nghệ sinh học tại Việt Nam và khu vực Đông Nam Á.\n\n### Hướng phát triển tiếp theo\n\n- **Mở rộng ứng dụng**: Áp dụng vào nhiều lĩnh vực khác\n- **Tối ưu hóa**: Cải thiện hiệu suất và độ chính xác\n- **Thương mại hóa**: Đưa ra thị trường các sản phẩm cụ thể\n- **Hợp tác quốc tế**: Mở rộng mạng lưới đối tác\n- **Đào tạo nhân lực**: Phát triển chương trình đào tạo chuyên sâu\n- **Nghiên cứu liên tục**: Duy trì và phát triển đội ngũ R&D\n\n### Tác động xã hội và kinh tế\n\nViệc phát triển và ứng dụng ${topic.toLowerCase()} sẽ mang lại những tác động tích cực:\n\n- **Cải thiện chất lượng cuộc sống**: Thông qua việc chẩn đoán và điều trị tốt hơn\n- **Thúc đẩy phát triển kinh tế**: Tạo ra các cơ hội việc làm và đầu tư mới\n- **Nâng cao vị thế quốc tế**: Đưa Việt Nam lên bản đồ công nghệ sinh học thế giới\n- **Phát triển bền vững**: Hỗ trợ các mục tiêu phát triển bền vững của Liên Hợp Quốc`,
      },
    ],
  ];

  // Chọn template ngẫu nhiên
  const selectedTemplate =
    blockTemplates[Math.floor(Math.random() * blockTemplates.length)];

  return selectedTemplate;
}

// Hàm tạo nội dung article (legacy - giữ lại để tương thích)
function generateArticleContent(topic, categoryName) {
  const paragraphs = [
    `Trong lĩnh vực ${categoryName.toLowerCase()}, ${topic.toLowerCase()} đang trở thành một chủ đề được quan tâm đặc biệt.`,
    `Nghiên cứu gần đây cho thấy những tiến bộ đáng kể trong việc ứng dụng công nghệ sinh học hiện đại.`,
    `Các chuyên gia trong ngành đánh giá cao tiềm năng phát triển của lĩnh vực này trong tương lai.`,
    `Việc áp dụng các phương pháp mới đã mang lại những kết quả tích cực và hứa hẹn.`,
    `KTBioTech cam kết tiếp tục đầu tư và phát triển các giải pháp tiên tiến nhất.`,
  ];

  return paragraphs.join('\n\n');
}

// Hàm tạo URL hình ảnh ngẫu nhiên
function generateImageUrl(index) {
  const source =
    IMAGE_SOURCES[Math.floor(Math.random() * IMAGE_SOURCES.length)];
  if (source.includes('picsum')) {
    return `${source}${index}`;
  }
  return source;
}

// Hàm upload image lên Strapi với retry và fallback
async function uploadImageToStrapi(imageUrl, filename, retries = 2) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Download image từ URL với timeout ngắn hơn
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
        timeout: 3000, // Giảm xuống 3 giây
        maxContentLength: 5 * 1024 * 1024, // Giới hạn 5MB
      });

      // Kiểm tra kích thước file
      if (imageResponse.data.length > 5 * 1024 * 1024) {
        console.log(
          `⚠️ Image too large: ${filename} (${Math.round(imageResponse.data.length / 1024 / 1024)}MB)`
        );
        return { success: false, error: 'Image too large' };
      }

      // Tạo FormData để upload
      const FormData = require('form-data');
      const form = new FormData();

      form.append('files', imageResponse.data, {
        filename,
        contentType: 'image/jpeg',
      });

      // Upload lên Strapi với timeout ngắn hơn
      const uploadResponse = await axios.post(
        `${API_CONFIG.baseUrl}${API_CONFIG.uploadEndpoint}`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${API_CONFIG.token}`,
          },
          timeout: 8000, // Giảm xuống 8 giây
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      console.log(`✅ Uploaded image: ${filename}`);
      return { success: true, data: uploadResponse.data[0] };
    } catch (error) {
      const errorMsg =
        error.response?.status === 503 ? 'Server overloaded' : error.message;
      console.log(
        `❌ Attempt ${attempt}/${retries} failed for ${filename}: ${errorMsg}`
      );

      if (attempt === retries) {
        console.log(
          `⚠️ Skipping image: ${filename} - Will create article without image`
        );
        return { success: false, error: errorMsg };
      }

      // Wait before retry với exponential backoff
      const waitTime = 3000 * attempt; // 3s, 6s
      console.log(`⏳ Waiting ${waitTime / 1000}s before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// Hàm load categories từ Strapi
async function loadCategories() {
  try {
    const response = await axios.get(
      `${API_CONFIG.baseUrl}${API_CONFIG.categoriesEndpoint}`,
      {
        headers: {
          Authorization: API_CONFIG.token ? `Bearer ${API_CONFIG.token}` : '',
        },
        timeout: API_CONFIG.timeout,
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.log('❌ Failed to load categories:', error.message);
    return [];
  }
}

// Hàm load authors từ Strapi
async function loadAuthors() {
  try {
    const response = await axios.get(`${API_CONFIG.baseUrl}/api/authors`, {
      headers: {
        Authorization: API_CONFIG.token ? `Bearer ${API_CONFIG.token}` : '',
      },
      timeout: API_CONFIG.timeout,
    });

    return response.data.data || [];
  } catch (error) {
    console.log('❌ Failed to load authors:', error.message);
    return [];
  }
}

// Hàm tạo article
async function createArticle(articleData) {
  try {
    // Validate article data trước khi gửi
    console.log('🔍 Validating article data...');

    // Kiểm tra các field bắt buộc
    if (!articleData.title || articleData.title.length === 0) {
      console.log('❌ Validation failed: title is required');
      return { success: false, error: 'title is required' };
    }

    if (!articleData.description || articleData.description.length === 0) {
      console.log('❌ Validation failed: description is required');
      return { success: false, error: 'description is required' };
    }

    if (!articleData.slug || articleData.slug.length === 0) {
      console.log('❌ Validation failed: slug is required');
      return { success: false, error: 'slug is required' };
    }

    if (!articleData.author || typeof articleData.author !== 'number') {
      console.log('❌ Validation failed: author must be a number');
      return { success: false, error: 'author must be a number' };
    }

    if (!articleData.category || typeof articleData.category !== 'number') {
      console.log('❌ Validation failed: category must be a number');
      return { success: false, error: 'category must be a number' };
    }

    if (!articleData.blocks || !Array.isArray(articleData.blocks)) {
      console.log('❌ Validation failed: blocks must be an array');
      return { success: false, error: 'blocks must be an array' };
    }

    // Validate blocks structure
    for (let i = 0; i < articleData.blocks.length; i++) {
      const block = articleData.blocks[i];
      if (!block.__component) {
        console.log(`❌ Validation failed: block ${i} missing __component`);
        return { success: false, error: `block ${i} missing __component` };
      }

      // Validate theo từng loại component
      if (block.__component === 'shared.media') {
        // Media blocks không cần body hoặc title, chỉ cần file (có thể null)
        continue;
      } else if (block.__component === 'shared.slider') {
        // Slider blocks không cần body hoặc title, chỉ cần files (có thể empty array)
        continue;
      } else if (block.__component === 'shared.rich-text') {
        if (!block.body) {
          console.log(
            `❌ Validation failed: block ${i} (rich-text) missing body`
          );
          return {
            success: false,
            error: `block ${i} (rich-text) missing body`,
          };
        }
      } else if (block.__component === 'shared.quote') {
        if (!block.body) {
          console.log(`❌ Validation failed: block ${i} (quote) missing body`);
          return { success: false, error: `block ${i} (quote) missing body` };
        }
        // Title có thể có hoặc không
      } else {
        // Các component khác cần có body hoặc title
        if (!block.body && !block.title) {
          console.log(
            `❌ Validation failed: block ${i} (${block.__component}) missing body or title`
          );
          return {
            success: false,
            error: `block ${i} (${block.__component}) missing body or title`,
          };
        }
      }
    }

    console.log('✅ Validation passed');

    // Debug: Log article data
    console.log(
      '📤 Sending article data:',
      JSON.stringify(articleData, null, 2)
    );

    const response = await axios.post(
      `${API_CONFIG.baseUrl}${API_CONFIG.articlesEndpoint}`,
      { data: articleData },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_CONFIG.token ? `Bearer ${API_CONFIG.token}` : '',
        },
        timeout: API_CONFIG.timeout,
      }
    );

    console.log(`✅ Created article: ${articleData.title}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    if (error.response) {
      const errorData = error.response.data;
      let errorMessage = 'Unknown error';

      // Xử lý các loại lỗi khác nhau
      if (errorData?.error?.message) {
        errorMessage = errorData.error.message;
      } else if (errorData?.error?.details) {
        // Hiển thị chi tiết validation errors
        const details = errorData.error.details;
        if (Array.isArray(details)) {
          errorMessage = details.map(d => `${d.path}: ${d.message}`).join(', ');
        } else if (typeof details === 'object') {
          errorMessage = Object.entries(details)
            .map(
              ([field, errors]) =>
                `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`
            )
            .join('; ');
        }
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      }

      console.log(`❌ Failed: ${articleData.title} - ${errorMessage}`);

      // Log chi tiết để debug
      if (errorData?.error?.details) {
        console.log(
          '📋 Error details:',
          JSON.stringify(errorData.error.details, null, 2)
        );
      }

      return { success: false, error: errorMessage };
    } else {
      console.log(`❌ Failed: ${articleData.title} - ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}

// Hàm chính
async function main() {
  console.log('🚀 Creating Articles...\n');

  // Load categories từ Strapi
  console.log('📂 Loading categories...');
  const categories = await loadCategories();

  if (categories.length === 0) {
    console.log('❌ No categories found. Please create categories first.');
    return;
  }

  // Load authors từ Strapi
  console.log('📂 Loading authors...');
  const authors = await loadAuthors();

  if (authors.length === 0) {
    console.log('❌ No authors found. Please create authors first.');
    return;
  }

  console.log(
    `📊 Found ${categories.length} categories and ${authors.length} authors\n`
  );

  let successCount = 0;
  let failedCount = 0;
  let imageFailCount = 0;
  const articlesCount = 5; // Giảm xuống 5 articles để test

  // Tạo articles
  for (let i = 0; i < articlesCount; i++) {
    // Chọn category ngẫu nhiên
    const category = categories[Math.floor(Math.random() * categories.length)];
    const categoryTopics = TOPICS_BY_CATEGORY[category.name] || [];

    if (categoryTopics.length === 0) {
      console.log(`⚠️ No topics found for category: ${category.name}`);
      continue;
    }

    const topic =
      categoryTopics[Math.floor(Math.random() * categoryTopics.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];

    // Tạo tags ngẫu nhiên (có thể không cần thiết)
    const articleTags = [];
    const numTags = Math.floor(Math.random() * 3) + 2; // 2-4 tags
    const shuffledTags = [...TAGS].sort(() => 0.5 - Math.random());

    for (let j = 0; j < numTags && j < shuffledTags.length; j++) {
      articleTags.push(shuffledTags[j]);
    }

    // Upload image trước
    const imageUrl = generateImageUrl(i);
    const imageFilename = `${createSlug(topic, i)}-${i}.jpg`;

    console.log(`📝 Creating ${i + 1}/${articlesCount}: ${topic}`);
    console.log(`   Category: ${category.name}`);
    console.log(`   Author: ${author.name}`);
    console.log(`   Image: ${imageFilename}`);

    const imageResult = await uploadImageToStrapi(imageUrl, imageFilename);
    let imageId = null;

    if (imageResult.success) {
      imageId = imageResult.data.id;
    } else {
      imageFailCount++;
      console.log(
        `⚠️ Using article without image (${imageFailCount} images failed so far)`
      );
    }

    // Tạo blocks với media nếu có image
    let blocks = generateArticleBlocks(topic, category.name);

    // Thêm image vào media block nếu upload thành công
    if (imageId) {
      blocks = blocks.map(block => {
        if (block.__component === 'shared.media') {
          return {
            ...block,
            file: imageId,
          };
        }
        return block;
      });
    }

    // Tạo article data với image (hoặc không có image nếu upload failed)
    const articleData = {
      title: topic,
      description: createDescription(topic), // Sử dụng hàm mới để tạo description ngắn gọn
      slug: createSlug(topic, i), // Truyền index để tạo unique slug
      author: author.id,
      category: category.id,
      publishedAt: new Date().toISOString(),
      blocks,
      seo: {
        metaTitle: topic,
        metaDescription: createDescription(topic),
      },
    };

    // Chỉ thêm cover nếu image upload thành công
    if (imageId) {
      articleData.cover = imageId;
    }

    const result = await createArticle(articleData);

    if (result.success) {
      successCount++;
    } else {
      failedCount++;
    }

    // Delay giữa các requests để tránh quá tải server
    if (i < articlesCount - 1) {
      console.log(`⏳ Waiting 2 seconds before next article...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Tổng kết
  console.log('\n📊 Results:');
  console.log(`✅ Success: ${successCount}/${articlesCount}`);
  console.log(`❌ Failed: ${failedCount}/${articlesCount}`);
  console.log(`🖼️ Images failed: ${imageFailCount}/${articlesCount}`);

  if (imageFailCount > articlesCount / 2) {
    console.log('\n⚠️ Warning: More than 50% of images failed to upload.');
    console.log('💡 Consider:');
    console.log('   - Check server status');
    console.log('   - Reduce image size');
    console.log('   - Increase timeout values');
  }
}

// Chạy script
main().catch(console.error);
