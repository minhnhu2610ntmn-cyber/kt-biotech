#!/usr/bin/env python3
"""
Update VI articles with full Vietnamese description (rich content)
Using documentId for updates
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Article IDs and their documentIds
vi_articles_map = {
    559: "r7sjxpyxjg22mhbmir3vq4no",  # KTBioTech ra mắt kit PCR mới
    561: "op2qojvjynemwa4ylr6s7sxw",  # Hội thảo khoa học
    563: "mlh3tsah2vovzw1ghyls8p71",  # Đối tác chiến lược
    565: "kuopwzy7qkk4p5swq8vrrqof",  # Giải thưởng Sáng tạo
    567: "j49twbmf9n7sw8h8k3hbjx2m",  # Nghiên cứu gene editing
    595: "r7sjxpyxjg22mhbmir3vq4no",  # Test Blog Article
}

# Full content for Vietnamese blog articles (HTML in description)
vi_articles_content = {
    "r7sjxpyxjg22mhbmir3vq4no": """<h2>Kit PCR thế hệ mới</h2>
<p>KTBioTech tự hào giới thiệu kit PCR thế hệ mới với độ nhạy cao, giúp phát hiện sớm các bệnh lý nguy hiểm.</p>
<h3>Đặc điểm nổi bật</h3>
<ul>
<li>Độ nhạy cao: Phát hiện từ 10 bản sao viral</li>
<li>Tốc độ nhanh: Kết quả trong 45 phút</li>
<li>Dễ sử dụng: One-step RT-PCR</li>
<li>Chính xác: Độ đặc hiệu >98%</li>
</ul>
<p>Sản phẩm đã được kiểm chứng bởi các viện nghiên cứu hàng đầu Việt Nam.</p>""",
    "op2qojvjynemwa4ylr6s7sxw": """<h2>Hội thảo khoa học 2024</h2>
<p>Mời quý đối tác tham gia hội thảo khoa học với chủ đề "Xu hướng công nghệ sinh học y tế 2024".</p>
<h3>Nội dung chính</h3>
<ul>
<li>Cập nhật công nghệ PCR thời gian thực</li>
<li>Ứng dụng AI trong phân tích dữ liệu sinh học</li>
<li>Gene editing và y học chính xác</li>
<li>Chuẩn hóa quy trình sản xuất kit test</li>
</ul>
<p><strong>Thời gian:</strong> 9:00 - 16:00, ngày 20/06/2024<br>
<strong>Địa điểm:</strong> Hội trường KTBioTech</p>""",
    "mlh3tsah2vovzw1ghyls8p71": """<h2>Hợp tác chiến lược với Viện Pasteur</h2>
<p>KTBioTech và Viện Pasteur TP.HCM chính thức ký kết hợp tác chiến lược.</p>
<h3>Mục tiêu hợp tác</h3>
<ul>
<li>Nghiên cứu và phát triển kit chẩn đoán mới</li>
<li>Chuyển giao công nghệ tiên tiến</li>
<li>Đào tạo nhân sự chất lượng cao</li>
<li>Công bố khoa học chung</li>
</ul>
<p>Sự hợp tác này sẽ thúc đẩy sự phát triển của ngành công nghệ sinh học Việt Nam.</p>""",
    "kuopwzy7qkk4p5swq8vrrqof": """<h2>Giải thưởng Sáng tạo TPHCM 2024</h2>
<p>KTBioTech vinh dự nhận Giải thưởng Sáng tạo TPHCM 2024.</p>
<h3>Thành tích đạt được</h3>
<ul>
<li>Giải Nhì Cuộc thi Khoa học Kỹ thuật Quốc gia</li>
<li>Giải thưởng Sáng tạo TPHCM 2024</li>
<li>Bằng khen của Bộ Y tế</li>
<li>Công trình khoa học cấp Bộ xuất sắc</li>
</ul>
<p>Những giải thưởng này là ghi nhận cho những nỗ lực không ngừng của đội ngũ nghiên cứu.</p>""",
    "j49twbmf9n7sw8h8k3hbjx2m": """<h2>Nghiên cứu Gene Editing tại KTBioTech</h2>
<p>Đội ngũ R&D của KTBioTech đang nghiên cứu ứng dụng công nghệ CRISPR-Cas9 trong y học.</p>
<h3>Định hướng nghiên cứu</h3>
<ul>
<li>Chỉnh sửa gene chính xác cao</li>
<li>Chi phí thấp so với phương pháp cũ</li>
<li>Ứng dụng trong điều trị bệnh di truyền</li>
<li>Nghiên cứu kit chẩn đoán mới</li>
</ul>
<p>Công nghệ này mở ra kỷ nguyên mới trong y học chính xác tại Việt Nam.</p>"""
}

def update_article_description(document_id, description):
    """Update article description using documentId"""
    payload = {
        "data": {
            "description": description
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{document_id}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload, ensure_ascii=False)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            title = result["data"].get("title", "N/A")[:30]
            return True, f"✅ {title}... (docId: {document_id[:10]}...)"
        else:
            return False, f"❌ Error: {response.stdout[:100]}"
    except Exception as e:
        return False, f"❌ Parse error: {e}"

print("📝 Updating VI articles with full description (HTML content)...")
print("=" * 60)

for doc_id, content in vi_articles_content.items():
    success, msg = update_article_description(
        document_id=doc_id,
        description=content
    )
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done! Updated articles with rich content")
