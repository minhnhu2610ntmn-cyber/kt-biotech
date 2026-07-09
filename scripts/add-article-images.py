#!/usr/bin/env python3
"""
Add images to articles using Python for proper JSON handling
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Articles to update
article_ids = [507, 509, 511, 513, 515, 517, 519, 521, 523, 525, 527, 529, 531, 533, 535]

# Available images from Strapi
images = [
    "https://strapi.kt-biotech.com/uploads/daviddoe_strapi_ed0d44b6da.jpeg",
    "https://strapi.kt-biotech.com/uploads/sarahbaker_strapi_ca3d1ebe4f.jpeg",
    "https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg",
    "https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg",
    "https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg",
    "https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg",
    "https://strapi.kt-biotech.com/uploads/coffee_beans_c78f963f37.jpeg",
]

print("🖼️  Adding images to articles...")

for i, article_id in enumerate(article_ids):
    img_url = images[i % len(images)]

    # Create content with image
    content = f'''<div class="article-cover">
        <img src="{img_url}" alt="Article cover" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:20px;" />
    </div>
    <div class="article-body">
        <h2>Tiêu đề bài viết</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <h3>Chi tiết</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>'''

    # Prepare payload
    payload = {
        "data": {
            "content": content
        }
    }

    # Make request
    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{article_id}",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload)
    ], capture_output=True, text=True)

    # Check result
    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            print(f"✅ Article {article_id} updated")
        else:
            print(f"⚠️  Article {article_id}: {response.stdout[:100]}")
    except:
        print(f"❌ Article {article_id}: Error")

    time.sleep(0.2)

print(f"\n🎉 Done! Updated {len(article_ids)} articles")
