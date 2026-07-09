#!/usr/bin/env python3
"""
Create gene-editing-research English article
"""

import json
import subprocess

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

payload = {
    "data": {
        "title": "Gene Editing Research at KTBioTech",
        "slug": "gene-editing-research",
        "description": "Gene editing research at KTBioTech. Our R&D team studies CRISPR-Cas9 applications in precision medicine.",
        "locale": "en",
        "publishedAt": "2026-06-04T00:00:00.000Z",
        "blocks": [
            {
                "__component": "shared.rich-text",
                "body": """<h2>Gene Editing Research at KTBioTech</h2>
<p>Our R&D team is researching CRISPR-Cas9 applications in medicine.</p>
<h3>Research Focus</h3>
<ul>
<li>High-precision gene editing</li>
<li>Lower costs than traditional methods</li>
<li>Applications for genetic disease treatment</li>
<li>Development of new diagnostic kits</li>
</ul>
<p>Opening a new era in precision medicine in Vietnam.</p>"""
            }
        ]
    }
}

response = subprocess.run([
    "curl", "-s", "-X", "POST",
    f"{STRAPI_URL}/api/articles",
    "-H", "Content-Type: application/json",
    "-H", f"Authorization: Bearer {API_TOKEN}",
    "-d", json.dumps(payload, ensure_ascii=False)
], capture_output=True, text=True)

print("Response:")
print(response.stdout)

try:
    result = json.loads(response.stdout)
    if "data" in result and result["data"]:
        print("\n✅ Created successfully!")
        print(f'DocumentId: {result["data"].get("documentId", "N/A")}')
        print(f'Title: {result["data"].get("title", "N/A")}')
    else:
        print("\n❌ Error in response")
except Exception as e:
    print(f"\n❌ Parse error: {e}")
