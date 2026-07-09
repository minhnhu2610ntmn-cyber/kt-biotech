#!/usr/bin/env python3
"""
Seed blog and recruitment articles with proper category linkage
Blog articles are linked to categories with type='blog'
Recruitment articles have type='recruitment'
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Blog categories (type='blog')
BLOG_CATEGORY_THONG_BAO_ID = 84  # "Thông Báo"
BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID = 87  # "Tin Chuyên Ngành"

# Available images
images = [
    "https://strapi.kt-biotech.com/uploads/daviddoe_strapi_ed0d44b6da.jpeg",
    "https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg",
    "https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg",
    "https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg",
    "https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg",
]

# Blog articles data - Vietnamese (linked to blog categories)
blog_articles_vi = [
    {
        "title": "KTBioTech ra mắt kit PCR mới với độ chính xác cao",
        "slug": "ktbiotech-ra-mat-kit-pcr-moi",
        "desc": "KTBioTech tự hào giới thiệu kit PCR thế hệ mới với độ nhạy cao, giúp phát hiện sớm các bệnh lý nguy hiểm.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
    {
        "title": "Hội thảo khoa học: Xu hướng công nghệ sinh học 2024",
        "slug": "hoi-thao-khoa-hoc-2024",
        "desc": "Tham gia hội thảo để cập nhật những xu hướng mới nhất trong ngành công nghệ sinh học y tế.",
        "category_id": BLOG_CATEGORY_THONG_BAO_ID,
    },
    {
        "title": "Đối tác chiến lược với Viện Pasteur",
        "slug": "doi-tac-chien-luoc-pasteur",
        "desc": "KTBioTech ký kết hợp tác với Viện Pasteur TP.HCM để phát triển các kit chẩn đoán mới.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
    {
        "title": "Giải thưởng Sáng tạo TPHCM 2024",
        "slug": "giai-thuong-sang-tao-tphcm-2024",
        "desc": "KTBioTech vinh dự nhận Giải thưởng Sáng tạo TPHCM cho sản phẩm kit test tiên tiến.",
        "category_id": BLOG_CATEGORY_THONG_BAO_ID,
    },
    {
        "title": "Nghiên cứu gene editing tại KTBioTech",
        "slug": "nghien-cuu-gene-editing",
        "desc": "Đội ngũ R&D của KTBioTech đang nghiên cứu ứng dụng công nghệ CRISPR trong y học.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
]

# Blog articles data - English
blog_articles_en = [
    {
        "title": "KTBioTech Launches New High-Accuracy PCR Kit",
        "slug": "ktbiotech-launches-new-pcr-kit",
        "desc": "KTBioTech proudly introduces the next-generation PCR kit with high sensitivity for early disease detection.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
    {
        "title": "Scientific Workshop: Biotechnology Trends 2024",
        "slug": "scientific-workshop-2024",
        "desc": "Join our workshop to update on the latest trends in medical biotechnology.",
        "category_id": BLOG_CATEGORY_THONG_BAO_ID,
    },
    {
        "title": "Strategic Partnership with Pasteur Institute",
        "slug": "strategic-partnership-pasteur",
        "desc": "KTBioTech signs cooperation agreement with Pasteur Institute HCMC to develop new diagnostic kits.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
    {
        "title": "HCMC Creative Award 2024",
        "slug": "hcmc-creative-award-2024",
        "desc": "KTBioTech honored with HCMC Creative Award for innovative test kit products.",
        "category_id": BLOG_CATEGORY_THONG_BAO_ID,
    },
    {
        "title": "Gene Editing Research at KTBioTech",
        "slug": "gene-editing-research",
        "desc": "KTBioTech R&D team is researching CRISPR applications in medicine.",
        "category_id": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID,
    },
]

# Recruitment articles data - Vietnamese
recruitment_articles_vi = [
    {
        "title": "Tuyển dụng Kỹ sư Sinh học Phân tử",
        "slug": "tuyen-dung-ky-su-sinh-hoc-phan-tu",
        "desc": "Tìm kiếm 02 Kỹ sư Sinh học Phân tử với kinh nghiệm PCR, sequencing. Lương cạnh tranh 15-25 triệu.",
    },
    {
        "title": "Tuyển dụng Chuyên gia R&D",
        "slug": "tuyen-dung-chuyen-gia-r-d",
        "desc": "KTBioTech tuyển Chuyên gia Nghiên cứu và Phát triển làm việc trên dự án kit test mới.",
    },
    {
        "title": "Tuyển dụng Nhân viên QA/QC",
        "slug": "tuyen-dung-nhan-vien-qa-qc",
        "desc": "Tuyển dụng nhân viên QA/QC cho hệ thống quản lý chất lượng ISO 13485.",
    },
    {
        "title": "Thực tập sinh Kỹ thuật Sinh học",
        "slug": "thuc-tap-sinh-ky-thuat-sinh-hoc",
        "desc": "Cơ hội thực tập cho sinh viên ngành Công nghệ sinh học tại KTBioTech.",
    },
]

# Recruitment articles data - English
recruitment_articles_en = [
    {
        "title": "Hiring Molecular Biology Engineers",
        "slug": "hiring-molecular-biology-engineers",
        "desc": "Looking for 02 Molecular Biology Engineers with PCR, sequencing experience. Competitive salary 15-25M VND.",
    },
    {
        "title": "Hiring R&D Specialists",
        "slug": "hiring-r-d-specialists",
        "desc": "KTBioTech is recruiting R&D Specialists to work on new test kit projects.",
    },
    {
        "title": "Hiring QA/QC Staff",
        "slug": "hiring-qa-qc-staff",
        "desc": "Recruiting QA/QC staff for ISO 13485 quality management system.",
    },
    {
        "title": "Biotechnology Engineering Internships",
        "slug": "biotechnology-internships",
        "desc": "Internship opportunities for Biotechnology students at KTBioTech.",
    },
]

def create_article(title, slug, description, category_id=None, article_type=None, locale="vi-VN"):
    """Create a single article with optional category and type"""
    # Use plain description without HTML to avoid length limit
    # Keep it simple and short

    payload = {
        "data": {
            "title": title,
            "description": description,
            "slug": slug,
            "locale": locale,
            "publishedAt": "2026-06-04T00:00:00.000Z"
        }
    }

    # Add category if provided (for blog articles)
    if category_id:
        payload["data"]["category"] = category_id

    # Add type if provided (for recruitment articles)
    if article_type:
        payload["data"]["type"] = article_type

    response = subprocess.run([
        "curl", "-s", "-X", "POST",
        f"{STRAPI_URL}/api/articles",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            article_id = result["data"].get("id", result["data"].get("documentId", "N/A"))
            return True, f"✅ {title[:40]}... (ID: {article_id})"
        else:
            return False, f"❌ Error: {response.stdout[:100]}"
    except:
        return False, f"❌ Parse error"

print("🌱 Seeding Blog and Recruitment Articles...")
print("=" * 60)

# Create Vietnamese blog articles
print("\n📝 Creating Vietnamese Blog Articles...")
for article in blog_articles_vi:
    success, msg = create_article(
        title=article["title"],
        slug=article["slug"],
        description=article["desc"],
        category_id=article["category_id"],
        locale="vi-VN"
    )
    print(msg)
    time.sleep(0.2)

# Create English blog articles
print("\n📝 Creating English Blog Articles...")
for article in blog_articles_en:
    success, msg = create_article(
        title=article["title"],
        slug=article["slug"],
        description=article["desc"],
        category_id=article["category_id"],
        locale="en"
    )
    print(msg)
    time.sleep(0.2)

# Create Vietnamese recruitment articles
print("\n💼 Creating Vietnamese Recruitment Articles...")
for article in recruitment_articles_vi:
    success, msg = create_article(
        title=article["title"],
        slug=article["slug"],
        description=article["desc"],
        article_type="recruitment",
        locale="vi-VN"
    )
    print(msg)
    time.sleep(0.2)

# Create English recruitment articles
print("\n💼 Creating English Recruitment Articles...")
for article in recruitment_articles_en:
    success, msg = create_article(
        title=article["title"],
        slug=article["slug"],
        description=article["desc"],
        article_type="recruitment",
        locale="en"
    )
    print(msg)
    time.sleep(0.2)

print("\n" + "=" * 60)
print(f"🎉 Done! Created:")
print(f"   - {len(blog_articles_vi)} Vietnamese blog articles")
print(f"   - {len(blog_articles_en)} English blog articles")
print(f"   - {len(recruitment_articles_vi)} Vietnamese recruitment articles")
print(f"   - {len(recruitment_articles_en)} English recruitment articles")
print(f"\n📊 Total: {len(blog_articles_vi) + len(blog_articles_en) + len(recruitment_articles_vi) + len(recruitment_articles_en)} articles")
