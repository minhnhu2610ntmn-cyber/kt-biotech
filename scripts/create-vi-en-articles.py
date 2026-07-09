#!/usr/bin/env python3
"""
Create complete articles with Vietnamese and English content
Using POST to create new entries with all fields
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Articles data - both Vietnamese and English
articles_data = [
    {
        "title_vi": "Nghiên cứu protein folding và bệnh Alzheimer",
        "title_en": "Protein Folding Research and Alzheimer's Disease",
        "slug": "nghien-cuu-protein-folding-va-benh-alzheimer",
        "desc_vi": "Khám phá nghiên cứu protein folding và bệnh Alzheimer. Nghiên cứu chuyên sâu về cơ chế gấp xếp protein.",
        "desc_en": "Exploring protein folding research and Alzheimer's disease. In-depth study of protein folding mechanisms.",
        "type": "news"
    },
    {
        "title_vi": "Chuẩn hóa quy trình nghiên cứu",
        "title_en": "Standardized Research Processes",
        "slug": "chuan-hoa-quy-trinh-nghien-cuu",
        "desc_vi": "Thông tin chuẩn hóa quy trình nghiên cứu. KTBioTech tuân thủ tiêu chuẩn ISO và GMP.",
        "desc_en": "Information on standardized research processes. KTBioTech complies with ISO and GMP standards.",
        "type": "news"
    },
    {
        "title_vi": "Chứng nhận chất lượng quốc tế",
        "title_en": "International Quality Certifications",
        "slug": "chung-nhan-chat-luong-quoc-te",
        "desc_vi": "Các chứng nhận chất lượng quốc tế mà KTBioTech đã đạt được: ISO, CE, FDA.",
        "desc_en": "International quality certifications achieved by KTBioTech: ISO, CE, FDA.",
        "type": "news"
    },
    {
        "title_vi": "Giải thưởng khoa học cho KTBioTech",
        "title_en": "Science Awards for KTBioTech",
        "slug": "giai-thuong-khoa-hoc-cho-ktbiotech",
        "desc_vi": "Giải thưởng khoa học danh giá: Giải Nhì KHKTQG, Giải thưởng Sáng tạo TPHCM.",
        "desc_en": "Prestigious science awards: Second Prize National Science, Creative Award HCMC.",
        "type": "news"
    },
    {
        "title_vi": "Hiểu về công nghệ sinh học",
        "title_en": "Understanding Biotechnology",
        "slug": "hieu-ve-cong-nghe-sinh-hoc",
        "desc_vi": "Phát triển hiểu về công nghệ sinh học và ứng dụng thực tế trong y học.",
        "desc_en": "Developing understanding of biotechnology and practical medical applications.",
        "type": "news"
    },
    {
        "title_vi": "Tuyển dụng chuyên gia hàng đầu",
        "title_en": "Recruiting Top Experts",
        "slug": "tuyen-dung-chuyen-gia-hang-au",
        "desc_vi": "Tuyển dụng chuyên gia R&D, Kỹ thuật sinh học, QA/QC với lương cạnh tranh.",
        "desc_en": "Recruiting R&D experts, Biotech engineers, QA/QC with competitive salary.",
        "type": "news"
    },
    {
        "title_vi": "Hợp tác quốc tế với các đối tác lớn",
        "title_en": "International Cooperation with Major Partners",
        "slug": "hop-tac-quoc-te-voi-doi-tac",
        "desc_vi": "Hợp tác với Viện Pasteur, ĐH Y Dược, WHO. Mở rộng thị trường quốc tế.",
        "desc_en": "Cooperation with Pasteur Institute, Medical University, WHO. Expanding international market.",
        "type": "news"
    },
    {
        "title_vi": "Phát triển phương pháp chẩn đoán không xâm lấn",
        "title_en": "Developing Non-Invasive Diagnostic Methods",
        "slug": "phat-trien-phuong-phap-chan-doan",
        "desc_vi": "Test based trên máu, nước bọt. Không đau, không lây nhiễm.",
        "desc_en": "Blood and saliva-based testing. Pain-free, no infection risk.",
        "type": "news"
    },
    {
        "title_vi": "Phát triển thuốc từ thực vật dược liệu",
        "title_en": "Drug Development from Medicinal Plants",
        "slug": "phat-trien-thuoc-thuc-vat",
        "desc_vi": "Nghiên cứu dược liệu VN, chiết xuất hoạt chất, sản phẩm an toàn.",
        "desc_en": "Vietnamese medicinal herb research, extraction, safe products.",
        "type": "news"
    },
    {
        "title_vi": "Ứng dụng AI trong phân tích dữ liệu sinh học",
        "title_en": "AI Applications in Biological Data Analysis",
        "slug": "ung-dung-ai-phan-tich-sinh-hoc",
        "desc_vi": "AI phân tích gene sequencing, dự đoán protein, phát hiện biomarker.",
        "desc_en": "AI for gene sequencing analysis, protein prediction, biomarker detection.",
        "type": "news"
    },
]

# Available images
images = [
    "https://strapi.kt-biotech.com/uploads/daviddoe_strapi_ed0d44b6da.jpeg",
    "https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg",
    "https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg",
    "https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg",
    "https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg",
]

print("🌱 Creating articles with Vietnamese and English content...")
print("=" * 60)

for i, article in enumerate(articles_data):
    img_url = images[i % len(images)]

    # Create Vietnamese article first
    desc_vi = f'<div><img src="{img_url}" alt="cover" style="width:100%;border-radius:8px;margin-bottom:15px;" /><p>{article["desc_vi"]}</p><p>KTBioTech - Tiên phong công nghệ sinh học Việt Nam.</p></div>'

    payload_vi = {
        "data": {
            "title": article["title_vi"],
            "description": desc_vi,
            "slug": article["slug"],
            "type": article["type"],
            "locale": "vi-VN",
            "publishedAt": "2026-06-04T00:00:00.000Z"
        }
    }

    response_vi = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"{STRAPI_URL}/api/articles",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload_vi)
    ], capture_output=True, text=True)

    try:
        result_vi = json.loads(response_vi.stdout)
        if "data" in result_vi and result_vi["data"]:
            print(f"✅ VI: {article['title_vi'][:35]}...")
        else:
            print(f"❌ VI: {response_vi.stdout[:80]}")
    except:
        print(f"❌ VI Error: {article['title_vi'][:30]}")

    time.sleep(0.2)

    # Create English version
    slug_en = f"{article['slug']}-en"
    desc_en = f'<div><img src="{img_url}" alt="cover" style="width:100%;border-radius:8px;margin-bottom:15px;" /><p>{article["desc_en"]}</p><p>KTBioTech - Pioneering Vietnamese biotechnology.</p></div>'

    payload_en = {
        "data": {
            "title": article["title_en"],
            "description": desc_en,
            "slug": slug_en,
            "type": article["type"],
            "locale": "en",
            "publishedAt": "2026-06-04T00:00:00.000Z"
        }
    }

    response_en = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"{STRAPI_URL}/api/articles",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload_en)
    ], capture_output=True, text=True)

    try:
        result_en = json.loads(response_en.stdout)
        if "data" in result_en and result_en["data"]:
            print(f"✅ EN: {article['title_en'][:35]}...")
        else:
            print(f"❌ EN: {response_en.stdout[:80]}")
    except:
        print(f"❌ EN Error: {article['title_en'][:30]}")

    time.sleep(0.3)
    print("-" * 60)

print(f"\n🎉 Done! Created {len(articles_data)} articles (VI + EN)")
