#!/usr/bin/env python3
"""
Update all articles with blocks content using current documentIds
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Articles content mapped by keywords in title
articles_content = {
    "CRISPR": {
        "description": "Nghiên cứu Gene Editing tại KTBioTech. Đội ngũ R&D nghiên cứu ứng dụng CRISPR-Cas9 trong y học chính xác.",
        "body": """<h2>Nghiên cứu Gene Editing tại KTBioTech</h2>
<p>Đội ngũ R&D của KTBioTech đang nghiên cứu ứng dụng công nghệ CRISPR-Cas9 trong y học.</p>
<h3>Định hướng nghiên cứu</h3>
<ul>
<li>Chỉnh sửa gene chính xác cao</li>
<li>Chi phí thấp so với phương pháp cũ</li>
<li>Ứng dụng trong điều trị bệnh di truyền</li>
<li>Nghiên cứu kit chẩn đoán mới</li>
</ul>
<p>Công nghệ này mở ra kỷ nguyên mới trong y học chính xác tại Việt Nam.</p>"""
    },
    "AI": {
        "description": "Ứng dụng AI trong phân tích dữ liệu sinh học. KTBioTech áp dụng AI để phân tích dữ liệu sinh học nhanh hơn.",
        "body": """<h2>Ứng dụng AI trong phân tích dữ liệu sinh học</h2>
<p>KTBioTech tiên phong ứng dụng AI trong phân tích dữ liệu sinh học.</p>
<h3>Ứng dụng</h3>
<ul>
<li>Phân tích trình tự gen</li>
<li>Dự đoán cấu trúc protein</li>
<li>Tăng tốc phát hiện thuốc</li>
<li>Cải thiện độ chính xác chẩn đoán</li>
</ul>
<p>Kết hợp công nghệ sinh học với AI tiên tiến.</p>"""
    },
    "Hội thảo": {
        "description": "Hội thảo khoa học 2024. KTBioTech mời tham gia hội thảo Xu hướng công nghệ sinh học y tế 2024.",
        "body": """<h2>Hội thảo khoa học 2024</h2>
<p>Mời quý đối tác tham gia hội thảo khoa học với chủ đề "Xu hướng công nghệ sinh học y tế 2024".</p>
<h3>Nội dung chính</h3>
<ul>
<li>Cập nhật công nghệ PCR thời gian thực</li>
<li>Ứng dụng AI trong phân tích dữ liệu sinh học</li>
<li>Gene editing và y học chính xác</li>
<li>Chuẩn hóa quy trình sản xuất kit test</li>
</ul>
<p><strong>Thời gian:</strong> 9:00 - 16:00, ngày 20/06/2024<br>
<strong>Địa điểm:</strong> Hội trường KTBioTech</p>"""
    },
    "Chuẩn hóa": {
        "description": "Chuẩn hóa quy trình nghiên cứu. KTBioTech áp dụng quy trình chuẩn hóa theo tiêu chuẩn quốc tế.",
        "body": """<h2>Chuẩn hóa quy trình nghiên cứu</h2>
<p>KTBioTech áp dụng quy trình chuẩn hóa theo tiêu chuẩn ISO và GMP.</p>
<h3>Quy trình chuẩn</h3>
<ul>
<li>Tuân thủ ISO 13485</li>
<li>GMP trong sản xuất</li>
<li>Kiểm soát chất lượng từng giai đoạn</li>
<li>Document và traceability</li>
</ul>
<p>Đảm bảo chất lượng nhất cho sản phẩm.</p>"""
    },
    "Chứng nhận": {
        "description": "Chứng nhận chất lượng quốc tế. KTBioTech đạt các chứng nhận ISO, GMP cho sản phẩm kit test.",
        "body": """<h2>Chứng nhận chất lượng quốc tế</h2>
<p>KTBioTech tự hào đạt các chứng nhận chất lượng quốc tế.</p>
<h3>Chứng nhận</h3>
<ul>
<li>ISO 13485</li>
<li>GMP certification</li>
<li>CE marking</li>
<li>ISO 9001</li>
</ul>
<p>Cam kết chất lượng cao nhất.</p>"""
    },
    "Giải thưởng": {
        "description": "Giải thưởng khoa học cho KTBioTech. Vinh dự nhận giải thưởng ghi nhận nỗ lực đội ngũ nghiên cứu.",
        "body": """<h2>Giải thưởng khoa học cho KTBioTech</h2>
<p>KTBioTech vinh dự nhận giải thưởng khoa học uy tín.</p>
<h3>Thành tích</h3>
<ul>
<li>Giải Nhì KHKT Quốc gia</li>
<li>Giải thưởng Sáng tạo TPHCM</li>
<li>Bằng khen Bộ Y tế</li>
<li>Công trình cấp Bộ xuất sắc</li>
</ul>
<p>Ghi nhận nỗ lực đội ngũ.</p>"""
    },
    "Hợp tác": {
        "description": "Hợp tác quốc tế với các đối tác lớn. KTBioTech mở rộng hợp tác với đối tác quốc tế.",
        "body": """<h2>Hợp tác quốc tế với các đối tác lớn</h2>
<p>KTBioTech ký kết hợp tác với các đối tác quốc tế.</p>
<h3>Đối tác</h3>
<ul>
<li>Viện nghiên cứu quốc tế</li>
<li>Công ty công nghệ sinh học</li>
<li>Đại học và viện nghiên cứu</li>
<li>Tổ chức y tế</li>
</ul>
<p>Mở rộng hợp tác toàn cầu.</p>"""
    },
    "Hiểu về": {
        "description": "Hiểu về công nghệ sinh học. Giới thiệu tổng quan về công nghệ sinh học và ứng dụng.",
        "body": """<h2>Hiểu về công nghệ sinh học</h2>
<p>Công nghệ sinh học là lĩnh vực ứng dụng sinh học vào công nghiệp.</p>
<h3>Ứng dụng</h3>
<ul>
<li>Y học và chẩn đoán</li>
<li>Nông nghiệp</li>
<li>Môi trường</li>
<li>Công nghiệp thực phẩm</li>
</ul>
<p>KTBioTech tiên phong ứng dụng.</p>"""
    },
    "Phát triển chẩn đoán": {
        "description": "Phát triển phương pháp chẩn đoán không xâm lấn. KTBioTech nghiên cứu chẩn đoán không xâm lấn.",
        "body": """<h2>Phát triển phương pháp chẩn đoán không xâm lấn</h2>
<p>KTBioTech nghiên cứu các phương pháp chẩn đoán không xâm lấn.</p>
<h3>Phương pháp</h3>
<ul>
<li>Test based on blood</li>
<li>Test based on saliva</li>
<li>Không cần thủ tục phức tạp</li>
<li>Nhanh và chính xác</li>
</ul>
<p>Tiện lợi và chính xác.</p>"""
    },
    "Phát triển thuốc": {
        "description": "Phát triển thuốc từ thực vật dược liệu. KTBioTech nghiên cứu dược liệu truyền thống.",
        "body": """<h2>Phát triển thuốc từ thực vật dược liệu</h2>
<p>KTBioTech nghiên cứu phát triển thuốc từ dược liệu truyền thống.</p>
<h3>Định hướng</h3>
<ul>
<li>Chiết xuất từ thảo dược</li>
<li>Chuẩn hóa quy trình</li>
<li>Nghiên cứu lâm sàng</li>
<li>Đăng ký thuốc</li>
</ul>
<p>Kết hợp truyền thống và hiện đại.</p>"""
    },
    "Quy trình sản xuất": {
        "description": "Quy trình sản xuất thuốc theo GMP. KTBioTech áp dụng quy trình GMP trong sản xuất.",
        "body": """<h2>Quy trình sản xuất thuốc</h2>
<p>Quy trình sản xuất thuốc tuân thủ GMP tại KTBioTech.</p>
<h3>Giai đoạn</h3>
<ul>
<li>Nghiên cứu và phát triển</li>
<li>Thử nghiệm lâm sàng</li>
<li>Sản xuất thử nghiệm</li>
<li>Sản xuất thương mại</li>
</ul>
<p>Đảm bảo chất lượng.</p>"""
    },
    "Tuyển dụng chuyên gia": {
        "description": "Tuyển dụng chuyên gia hàng đầu. KTBioTech tìm kiếm chuyên gia hàng đầu gia nhập đội ngũ.",
        "body": """<h2>Tuyển dụng chuyên gia hàng đầu</h2>
<p>KTBioTech tìm kiếm chuyên gia hàng đầu gia nhập đội ngũ.</p>
<h3>Vị trí</h3>
<ul>
<li>Chuyên gia R&D</li>
<li>Giảng sư tư vấn</li>
<li>Lãnh đạo dự án</li>
<li>Chuyên gia quốc tế</li>
</ul>
<p>Liên hệ ngay!</p>"""
    },
}

def update_article(doc_id, description, body, title_hint=""):
    payload = {
        "data": {
            "description": description,
            "blocks": [
                {
                    "__component": "shared.rich-text",
                    "body": body
                }
            ]
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{doc_id}?populate=*",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload, ensure_ascii=False)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result:
            title = result["data"].get("title", "N/A")[:30]
            blocks_count = len(result["data"].get("blocks", []))
            return True, f"✅ {title}... ({blocks_count} blocks)"
        return False, f"❌ Error: {response.stdout[:80]}"
    except Exception as e:
        return False, f"❌ Parse error: {e}"

print("📝 Mapping articles to content...")
print("=" * 60)

# First, get all articles
response = subprocess.run([
    "curl", "-s",
    f"{STRAPI_URL}/api/articles?locale=vi-VN&populate=*",
    "-H", f"Authorization: Bearer {API_TOKEN}"
], capture_output=True, text=True)

articles = json.loads(response.stdout).get('data', [])

# Match and update
for article in articles:
    doc_id = article.get('documentId', '')
    title = article.get('title', '')

    # Find matching content
    for keyword, content in articles_content.items():
        if keyword in title:
            success, msg = update_article(doc_id, content["description"], content["body"])
            print(f'{msg} - {title[:30]}')
            time.sleep(0.3)
            break

print("\n🎉 Done!")
