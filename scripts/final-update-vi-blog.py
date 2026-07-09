#!/usr/bin/env python3
"""
Update all VI blog articles with full Vietnamese content
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# All VI blog articles content
vi_blog_content = {
    "o0r4rba4q4wjie2iycnvf3ra": """Kit PCR thế hệ mới với độ nhạy cao. KTBioTech giới thiệu kit PCR thế hệ mới giúp phát hiện sớm các bệnh lý nguy hiểm. Đặc điểm: độ nhạy cao (10 bản sao), tốc độ nhanh (45 phút), dễ sử dụng, độ chính xác >98%. Sản phẩm đã được kiểm chứng bởi các viện nghiên cứu hàng đầu Việt Nam.""",
    "nw75c8c85p4qdzlsvmmpad4q": """Hội thảo khoa học 2024. KTBioTech mời quý đối tác tham gia hội thảo "Xu hướng công nghệ sinh học y tế 2024". Nội dung: cập nhật PCR thời gian thực, AI trong sinh học, gene editing, chuẩn hóa quy trình. Thời gian: 9:00-16:00 ngày 20/06/2024 tại Hội trường KTBioTech.""",
    "u28gwvjtkdv01g6stcg6fire": """Hợp tác chiến lược với Viện Pasteur. KTBioTech ký kết hợp tác với Viện Pasteur TP.HCM. Mục tiêu: phát triển kit chẩn đoán mới, chuyển giao công nghệ, đào tạo nhân sự, công bố khoa học. Hợp tác thúc đẩy phát triển công nghệ sinh học Việt Nam.""",
    "dh2auzsyhcgiote1kmy057ji": """Giải thưởng Sáng tạo TPHCM 2024. KTBioTech vinh dự nhận giải thưởng. Thành tích: Giải Nhì KHKTQG, Giải thưởng Sáng tạo TPHCM, Bằng khen Bộ Y tế, Công trình cấp Bộ xuất sắc. Giải ghi nhận nỗ lực đội ngũ nghiên cứu.""",
    "dvzf2rdl2rzdtce2i9s1nr7y": """Nghiên cứu Gene Editing tại KTBioTech. Đội ngũ R&D nghiên cứu ứng dụng CRISPR-Cas9. Định hướng: chỉnh sửa gene chính xác, chi phí thấp, điều trị bệnh di truyền, kit chẩn đoán mới. Mở ra kỷ nguyên mới trong y học chính xác.""",
    "r7sjxpyxjg22mhbmir3vq4no": """Tin mới từ KTBioTech. Cập nhật tin tức R&D công nghệ sinh học. Hoạt động: nghiên cứu sản phẩm mới, hợp tác quốc tế, hội thảo, đào tạo nhân sự. KTBioTech cam kết giải pháp y sinh tiên tiến.""",
    "a7d3h17dkghk98t49pjevrqf": """KTBioTech tiên phong công nghệ sinh học. Chuyên cung cấp kit test PCR, ELISA, tế bào học. Sản phẩm đạt chuẩn ISO, GMP. Đội ngũ chuyên gia giàu kinh nghiệm, luôn sẵn sàng phục vụ khách hàng.""",
}

def update_article(doc_id, description):
    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{doc_id}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps({"data": {"description": description}}, ensure_ascii=False)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result:
            title = result["data"].get("title", "N/A")[:25]
            return True, f"✅ {title}..."
        return False, f"❌ Error"
    except:
        return False, f"❌ Parse error"

print("📝 Updating all VI blog articles...")
print("=" * 50)

for doc_id, desc in vi_blog_content.items():
    res = update_article(doc_id, desc)
    print(res)
    time.sleep(0.3)

print("\n🎉 Done!")
