#!/usr/bin/env python3
"""
Update existing articles to add category linkage for blog posts
and type='recruitment' for recruitment posts
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Blog categories (type='blog')
BLOG_CATEGORY_THONG_BAO_ID = 84  # "Thông Báo"
BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID = 87  # "Tin Chuyên Ngành"

# Articles to update for blog (Vietnamese and English)
# Using existing articles that have relevant content
blog_article_updates = [
    {"id": 511, "category": BLOG_CATEGORY_THONG_BAO_ID, "title": "Chứng nhận chất lượng quốc tế"},  # ISO, CE, FDA
    {"id": 513, "category": BLOG_CATEGORY_THONG_BAO_ID, "title": "Giải thưởng khoa học cho KTBioTech"},  # Awards
    {"id": 519, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Hợp tác quốc tế với các đối tác lớn"},  # Partners
    {"id": 521, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Phát triển phương pháp chẩn đoán không xâm lấn"},  # R&D
    {"id": 525, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Ứng dụng AI trong phân tích dữ liệu sinh học"},  # AI
]

# English articles for blog
blog_article_updates_en = [
    {"id": 539, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Recruiting Top Experts"},
    {"id": 543, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Developing Non-Invasive Diagnostic Methods"},
    {"id": 547, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "Drug Development from Medicinal Plants"},
    {"id": 551, "category": BLOG_CATEGORY_TIN_CHUYEN_NGANH_ID, "title": "AI Applications in Biological Data Analysis"},
]

# Articles to update for recruitment (Vietnamese)
recruitment_article_updates_vi = [
    {"id": 517, "title": "Tuyển dụng chuyên gia hàng đầu"},
]

# Articles to update for recruitment (English)
recruitment_article_updates_en = [
    {"id": 537, "title": "Understanding Biotechnology"},  # Using as placeholder
]

def update_article_category(article_id, category_id, title):
    """Update article to add category linkage"""
    payload = {
        "data": {
            "category": category_id
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{article_id}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            return True, f"✅ {title[:40]}... (ID: {article_id} -> Category: {category_id})"
        else:
            return False, f"❌ Error: {response.stdout[:100]}"
    except:
        return False, f"❌ Parse error"

def update_article_type(article_id, article_type, title):
    """Update article to set type (e.g., 'recruitment')"""
    payload = {
        "data": {
            "type": article_type
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{article_id}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            return True, f"✅ {title[:40]}... (ID: {article_id} -> Type: {article_type})"
        else:
            return False, f"❌ Error: {response.stdout[:100]}"
    except:
        return False, f"❌ Parse error"

print("🔄 Updating Articles for Blog and Recruitment...")
print("=" * 60)

# Update Vietnamese blog articles with category
print("\n📝 Updating Vietnamese Blog Articles (add category)...")
for article in blog_article_updates:
    success, msg = update_article_category(
        article_id=article["id"],
        category_id=article["category"],
        title=article["title"]
    )
    print(msg)
    time.sleep(0.2)

# Update English blog articles with category
print("\n📝 Updating English Blog Articles (add category)...")
for article in blog_article_updates_en:
    success, msg = update_article_category(
        article_id=article["id"],
        category_id=article["category"],
        title=article["title"]
    )
    print(msg)
    time.sleep(0.2)

# Update Vietnamese recruitment articles with type
print("\n💼 Updating Vietnamese Recruitment Articles (set type=recruitment)...")
for article in recruitment_article_updates_vi:
    success, msg = update_article_type(
        article_id=article["id"],
        article_type="recruitment",
        title=article["title"]
    )
    print(msg)
    time.sleep(0.2)

# Update English recruitment articles with type
print("\n💼 Updating English Recruitment Articles (set type=recruitment)...")
for article in recruitment_article_updates_en:
    success, msg = update_article_type(
        article_id=article["id"],
        article_type="recruitment",
        title=article["title"]
    )
    print(msg)
    time.sleep(0.2)

print("\n" + "=" * 60)
print(f"🎉 Done! Updated articles for blog and recruitment sections")
