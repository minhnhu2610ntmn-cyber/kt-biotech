#!/usr/bin/env python3
"""
Update VI blog articles with full Vietnamese content (plain text)
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# VI blog articles content (plain text)
vi_blog_content = {
    "o0r4rba4q4wjie2iycnvf3ra": """Kit PCR thế hệ mới với độ nhạy cao. KTBioTech giới thiệu kit PCR thế hệ mới giúp phát hiện sớm các bệnh lý nguy hiểm. Đặc điểm nổi bật: độ nhạy cao (phát hiện từ 10 bản sao viral), tốc độ nhanh (kết quả trong 45 phút), dễ sử dụng (one-step RT-PCR), độ chính xác cao (>98%). Sản phẩm đã được kiểm chứng bởi các viện nghiên cứu hàng đầu Việt Nam.""",
    "nw75c8c85p4qdzlsvmmpad4q": """Hội thảo khoa học 2024. KTBioTech mời quý đối tác tham gia hội thảo khoa học với chủ đề "Xu hướng công nghệ sinh học y tế 2024". Nội dung chính: cập nhật công nghệ PCR thời gian thực, ứng dụng AI trong phân tích dữ liệu sinh học, gene editing và y học chính xác, chuẩn hóa quy trình sản xuất kit test. Thời gian: 9:00-16:00 ngày 20/06/2024. Địa điểm: Hội trường KTBioTech.""",
    "a7d3h17dkghk98t49pjevrqf": """Tin mới từ KTBioTech. Cập nhật những tin tức mới nhất về nghiên cứu và phát triển công nghệ sinh học tại KTBioTech. Các hoạt động nổi bật: nghiên cứu và phát triển sản phẩm mới, hợp tác với các đối tác quốc tế, tham gia các hội thảo khoa học, đào tạo nhân sự R&D. KTBioTech cam kết mang đến những giải pháp y sinh học tiên tiến nhất cho người dân Việt Nam.""",
    "r7sjxpyxjg22mhbmir3vq4no": """Bài viết mới. KTBioTech tiếp tục ra mắt các sản phẩm kit test mới với chất lượng cao và giá thành cạnh tranh. Sản phẩm đáp ứng các tiêu chuẩn ISO và GMP, mang lại sự an tâm cho khách hàng. Đội ngũ nghiên cứu giàu kinh nghiệm, always ready to serve.""",
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

print("📝 Updating VI blog articles (plain text)...")
print("=" * 50)

for doc_id, desc in vi_blog_content.items():
    success, msg = update_article(doc_id, desc)
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
