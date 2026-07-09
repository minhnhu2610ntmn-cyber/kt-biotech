#!/usr/bin/env python3
"""
Enhance articles with image URLs in description
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Articles data
articles = [
    {"id": 507, "title": "Nghiên cứu protein folding và bệnh Alzheimer", "slug": "nghien-cuu-protein-folding-va-benh-alzheimer", "img": "https://strapi.kt-biotech.com/uploads/daviddoe_strapi_ed0d44b6da.jpeg"},
    {"id": 509, "title": "Chuẩn hóa quy trình nghiên cứu", "slug": "chuan-hoa-quy-trinh-nghien-cuu", "img": "https://strapi.kt-biotech.com/uploads/sarahbaker_strapi_ca3d1ebe4f.jpeg"},
    {"id": 511, "title": "Chứng nhận chất lượng quốc tế", "slug": "chung-nhan-chat-luong-quoc-te", "img": "https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg"},
    {"id": 513, "title": "Giải thưởng khoa học cho KTBioTech", "slug": "giai-thuong-khoa-hoc-cho-ktbiotech", "img": "https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg"},
    {"id": 515, "title": "Hiểu về công nghệ sinh học", "slug": "hieu-ve-cong-nghe-sinh-hoc", "img": "https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg"},
    {"id": 517, "title": "Tuyển dụng chuyên gia hàng đầu", "slug": "tuyen-dung-chuyen-gia-hang-au", "img": "https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg"},
    {"id": 519, "title": "Hợp tác quốc tế với các đối tác lớn", "slug": "hop-tac-quoc-te-voi-doi-tac", "img": "https://strapi.kt-biotech.com/uploads/coffee_beans_c78f963f37.jpeg"},
    {"id": 521, "title": "Phát triển phương pháp chẩn đoán không xâm lấn", "slug": "phat-trien-phuong-phap-chan-doan", "img": "https://strapi.kt-biotech.com/uploads/a_bug_is_becoming_a_meme_on_the_internet_022b93b40b.jpeg"},
    {"id": 523, "title": "Phát triển thuốc từ thực vật dược liệu", "slug": "phat-trien-thuoc-thuc-vat", "img": "https://strapi.kt-biotech.com/uploads/daviddoe_strapi_ed0d44b6da.jpeg"},
    {"id": 525, "title": "Ứng dụng AI trong phân tích dữ liệu sinh học", "slug": "ung-dung-ai-phan-tich-sinh-hoc", "img": "https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg"},
    {"id": 527, "title": "Quy trình sản xuất thuốc", "slug": "quy-trinh-san-xuat-thuoc", "img": "https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg"},
    {"id": 529, "title": "Hội thảo khoa học quốc tế", "slug": "hoi-thao-khoa-hoc", "img": "https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg"},
    {"id": 531, "title": "CRISPR là gì và ứng dụng", "slug": "crispr-la-gi-ung-dung", "img": "https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg"},
    {"id": 533, "title": "Quy trình sản xuất thuốc", "slug": "quy-trinh-san-xuat-thuoc-2", "img": "https://strapi.kt-biotech.com/uploads/coffee_beans_c78f963f37.jpeg"},
    {"id": 535, "title": "Hiểu về công nghệ sinh học", "slug": "hieu-ve-cong-nghe-sinh-hoc-2", "img": "https://strapi.kt-biotech.com/uploads/a_bug_is_becoming_a_meme_on_the_internet_022b93b40b.jpeg"},
]

print("🖼️  Enhancing articles with image URLs in description...")

for article in articles:
    # Enhanced description with image
    description = f'''<img src="{article["img"]}" alt="{article["title"]}" style="width:100%;max-height:300px;object-fit:cover;border-radius:8px;margin-bottom:15px;" />
<p style="margin-top:15px;">Khám phá chi tiết về {article["title"]}. Nghiên cứu chuyên sâu với phương pháp hiện đại và đội ngũ chuyên gia giàu kinh nghiệm.</p>
<p>KTBioTech cam kết mang đến những giải pháp y sinh học tiên tiến nhất, đóng góp vào sự phát triển của ngành khoa học Việt Nam.</p>'''

    payload = {
        "data": {
            "description": description
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{article['id']}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            print(f"✅ Article {article['id']} ({article['title'][:30]}...)")
        else:
            print(f"❌ Article {article['id']}: Error")
    except:
        print(f"❌ Article {article['id']}: Connection error")

    time.sleep(0.2)

print(f"\n🎉 Done! Enhanced {len(articles)} articles with images")
