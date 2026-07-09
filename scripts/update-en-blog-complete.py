#!/usr/bin/env python3
"""
Update EN blog articles with full English content (description + blocks)
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# EN blog articles content - using actual documentIds from API
en_blog_content = {
    "jl1u3suky1jigdob0g0milih": {
        "title": "International Scientific Conference 2024",
        "description": "KTBioTech invites partners to International Scientific Conference on biotechnology trends 2024.",
        "body": """<h2>International Scientific Conference 2024</h2>
<p>KTBioTech invites partners to the International Scientific Conference on biotechnology trends.</p>
<h3>Key Topics</h3>
<ul>
<li>Real-time PCR technology updates</li>
<li>AI applications in bioinformatics</li>
<li>Gene editing and precision medicine</li>
<li>Standardization of test kit production</li>
</ul>
<p><strong>Time:</strong> 9:00 - 16:00, June 20, 2024<br>
<strong>Venue:</strong> KTBioTech Hall</p>"""
    },
    "l536s3t4iahxtcr81snoygwn": {
        "title": "Drug Manufacturing Process",
        "description": "KTBioTech introduces advanced drug manufacturing process with GMP standards.",
        "body": """<h2>Drug Manufacturing Process</h2>
<p>KTBioTech introduces advanced drug manufacturing process following GMP standards.</p>
<h3>Process Highlights</h3>
<ul>
<li>GMP-compliant manufacturing</li>
<li>Quality control at every stage</li>
<li>Advanced purification technology</li>
<li>International standards certification</li>
</ul>
<p>Ensuring the highest quality for pharmaceutical products.</p>"""
    },
    "yxooxg88snbjrzjsbnt8jvb6": {
        "title": "KTBioTech Launches New PCR Kit",
        "description": "Next-gen PCR Kit with high sensitivity. KTBioTech introduces PCR kit for early disease detection.",
        "body": """<h2>Next-Gen PCR Kit Launch</h2>
<p>KTBioTech proudly presents the next-generation PCR kit with high sensitivity for early detection of dangerous diseases.</p>
<h3>Key Features</h3>
<ul>
<li>High sensitivity: Detects from 10 viral copies</li>
<li>Fast results: Results in 45 minutes</li>
<li>Easy to use: One-step RT-PCR</li>
<li>High accuracy: Specificity >98%</li>
</ul>
<p>Validated by leading research institutes in Vietnam.</p>"""
    },
    "kfhntb34h9h4nm4so64xyr04": {
        "title": "AI Applications in Biological Data Analysis",
        "description": "KTBioTech applies AI for advanced biological data analysis and research.",
        "body": """<h2>AI Applications in Biological Data Analysis</h2>
<p>KTBioTech is pioneering AI applications in biological data analysis for faster research results.</p>
<h3>Applications</h3>
<ul>
<li>Genomic sequence analysis</li>
<li>Protein structure prediction</li>
<li>Drug discovery acceleration</li>
<li>Diagnostic accuracy improvement</li>
</ul>
<p>Combining biotechnology with cutting-edge AI technology.</p>"""
    },
}

def update_article(doc_id, title, description, body):
    payload = {
        "data": {
            "title": title,
            "description": description,
            "blocks": [
                {
                    "__component": "shared.rich-text",
                    "body": body
                }
            ]
        }
    }

    response = subprocess.run([
        "curl", "-s", "-X", "PUT",
        f"{STRAPI_URL}/api/articles/{doc_id}?populate=*",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_TOKEN}",
        "-d", json.dumps(payload, ensure_ascii=False)
    ], capture_output=True, text=True)

    try:
        result = json.loads(response.stdout)
        if "data" in result:
            title_ret = result["data"].get("title", "N/A")[:30]
            blocks_count = len(result["data"].get("blocks", []))
            return True, f"✅ {title_ret}... ({blocks_count} blocks)"
        return False, f"❌ Error: {response.stdout[:80]}"
    except Exception as e:
        return False, f"❌ Parse error: {e}"

print("📝 Updating EN blog articles with full content...")
print("=" * 60)

for doc_id, content in en_blog_content.items():
    success, msg = update_article(
        doc_id,
        content["title"],
        content["description"],
        content["body"]
    )
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
