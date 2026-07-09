#!/usr/bin/env python3
"""
Update VI blog articles with full Vietnamese content (under 3000 chars)
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# VI blog articles content (documentId: description)
vi_blog_content = {
    "o0r4rba4q4wjie2iycnvf3ra": """<h2>Kit PCR thế hệ mới</h2><p>KTBioTech giới thiệu kit PCR thế hệ mới với độ nhạy cao, phát hiện sớm các bệnh lý nguy hiểm.</p><p><strong>Đặc điểm:</strong> Độ nhạy cao (10 bản sao), tốc độ nhanh (45 phút), dễ sử dụng, độ đặc hiệu >98%.</p><p>Đã được kiểm chứng bởi các viện nghiên cứu hàng đầu Việt Nam.</p>""",
    "nw75c8c85p4qdzlsvmmpad4q": """<h2>Hội thảo khoa học 2024</h2><p>KTBioTech mời tham gia hội thảo "Xu hướng công nghệ sinh học y tế 2024".</p><p><strong>Nội dung:</strong> Cập nhật PCR thời gian thực, AI trong sinh học, gene editing, chuẩn hóa quy trình.</p><p><strong>Thời gian:</strong> 9:00-16:00, 20/06/2024 | <strong>Địa điểm:</strong> Hội trường KTBioTech</p>""",
    "u28gwvjtkdv01g6stcg6fire": """<h2>Hợp tác với Viện Pasteur</h2><p>KTBioTech ký kết hợp tác chiến lược với Viện Pasteur TP.HCM.</p><p><strong>Mục tiêu:</strong> Phát triển kit chẩn đoán mới, chuyển giao công nghệ, đào tạo nhân sự, công bố khoa học.</p><p>Hợp tác thúc đẩy phát triển công nghệ sinh học Việt Nam.</p>""",
    "dh2auzsyhcgiote1kmy057ji": """<h2>Giải thưởng Sáng tạo TPHCM 2024</h2><p>KTBioTech vinh dự nhận Giải thưởng Sáng tạo TPHCM 2024.</p><p><strong>Thành tích:</strong> Giải Nhì KHKTQG, Giải thưởng Sáng tạo TPHCM, Bằng khen Bộ Y tế, Công trình cấp Bộ xuất sắc.</p><p>Ghi nhận nỗ lực đội ngũ nghiên cứu.</p>""",
    "dvzf2rdl2rzdtce2i9s1nr7y": """<h2>Nghiên cứu Gene Editing</h2><p>Đội ngũ R&D KTBioTech nghiên cứu ứng dụng CRISPR-Cas9.</p><p><strong>Định hướng:</strong> Chỉnh sửa gene chính xác, chi phí thấp, điều trị bệnh di truyền, kit chẩn đoán mới.</p><p>Mở ra kỷ nguyên mới trong y học chính xác.</p>""",
    "r7sjxpyxjg22mhbmir3vq4no": """<h2>Tin từ KTBioTech</h2><p>Cập nhật tin tức mới nhất về R&D công nghệ sinh học.</p><p><strong>Hoạt động:</strong> Nghiên cứu sản phẩm mới, hợp tác quốc tế, hội thảo, đào tạo nhân sự.</p><p>KTBioTech cam kết giải pháp y sinh tiên tiến.</p>"""
}

def update_article(document_id, description):
    """Update article description"""
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
            return True, f"✅ {title}..."
        else:
            return False, f"❌ {response.stdout[:60]}"
    except Exception as e:
        return False, f"❌ Error: {e}"

print("📝 Updating VI blog articles...")
print("=" * 50)

for doc_id, desc in vi_blog_content.items():
    success, msg = update_article(doc_id, desc)
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
