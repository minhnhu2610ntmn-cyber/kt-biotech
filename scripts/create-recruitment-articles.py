#!/usr/bin/env python3
"""
Create recruitment articles (VI + EN) with full content
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Recruitment articles data
recruitment_articles = [
    # Vietnamese
    {
        "title": "Tuyển dụng Kỹ sinh học",
        "slug": "tuyen-dung-ky-sinh-hoc",
        "description": "Tuyển dụng Kỹ sinh học. KTBioTech tìm kiếm kỹ sinh học có kinh nghiệm về PCR, ELISA.",
        "body": """<h2>Tuyển dụng Kỹ sinh học</h2>
<p>KTBioTech đang tìm kiếm ứng viên Kỹ sinh học nhiệt huyết gia nhập đội ngũ.</p>
<h3>Yêu cầu</h3>
<ul>
<li>Tốt nghiệp Đại học chuyên ngành Sinh học, Công nghệ sinh học</li>
<li>Kinh nghiệm về PCR, ELISA</li>
<li>Kỹ năng lab tốt</li>
</ul>
<h3>Quyền lợi</h3>
<ul>
<li>Lương cạnh tranh</li>
<li>Môi trường chuyên nghiệp</li>
<li>Cơ hội đào tạo</li>
</ul>
<p>Gửi CV về: hr@kt-biotech.com</p>""",
        "locale": "vi-VN",
        "type": "recruitment"
    },
    {
        "title": "Tuyển dụng QC Manager",
        "slug": "tuyen-dung-qc-manager",
        "description": "Tuyển dụng QC Manager. KTBioTech tìm kiếm QC Manager có kinh nghiệm trong lĩnh vực kit test.",
        "body": """<h2>Tuyển dụng QC Manager</h2>
<p>KTBioTech tuyển dụng QC Manager quản lý chất lượng sản phẩm kit test.</p>
<h3>Yêu cầu</h3>
<ul>
<li>Kinh nghiệm 2 năm trong QC</li>
<li>Am hiểu ISO, GMP</li>
<li>Kỹ năng quản lý tốt</li>
</ul>
<h3>Quyền lợi</h3>
<ul>
<li>Lương hấp dẫn</li>
<li>Phụ cấp</li>
<li>Bảo hiểm full</li>
</ul>
<p>Ứng tuyển ngay!</p>""",
        "locale": "vi-VN",
        "type": "recruitment"
    },
    {
        "title": "Tuyển dụng R&D Scientist",
        "slug": "tuyen-dung-rd-scientist",
        "description": "Tuyển dụng R&D Scientist. KTBioTech tìm kiếm nhà nghiên cứu cho phòng R&D.",
        "body": """<h2>Tuyển dụng R&D Scientist</h2>
<p>KTBioTech tìm kiếm R&D Scientist cho các dự án nghiên cứu mới.</p>
<h3>Yêu cầu</h3>
<ul>
<li>Thạc sĩ/Cử nhân Sinh học</li>
<li>Kinh nghiệm nghiên cứu</li>
<li>Tiếng Anh tốt</li>
</ul>
<h3>Quyền lợi</h3>
<ul>
<li>Môi trường R&D chuyên nghiệp</li>
<li>Công bố khoa học</li>
<li>Lương cao</li>
</ul>
<p>Liên hệ ngay!</p>""",
        "locale": "vi-VN",
        "type": "recruitment"
    },
    {
        "title": "Tuyển dụng Sales Executive",
        "slug": "tuyen-dung-sales-executive",
        "description": "Tuyển dụng Sales Executive. KTBioTech tìm kiếm sales có kinh nghiệm trong y học.",
        "body": """<h2>Tuyển dụng Sales Executive</h2>
<p>KTBioTech tuyển dụng Sales Executive cho thị trường kit test y sinh.</p>
<h3>Yêu cầu</h3>
<ul>
<li>Kinh nghiệm sales y học</li>
<li>Giao tiếp tốt</li>
<li>Năng động</li>
</ul>
<h3>Quyền lợi</h3>
<ul>
<li>Commission cao</li>
<li>Thưởng doanh số</li>
<li>Đào tạo chuyên sâu</li>
</ul>
<p>Ứng tuyển ngay!</p>""",
        "locale": "vi-VN",
        "type": "recruitment"
    },
    # English
    {
        "title": "Hiring Biotech Engineer",
        "slug": "hiring-biotech-engineer",
        "description": "Hiring Biotech Engineer. KTBioTech seeks experienced engineer in PCR, ELISA.",
        "body": """<h2>Hiring Biotech Engineer</h2>
<p>KTBioTech is seeking a passionate Biotech Engineer to join our team.</p>
<h3>Requirements</h3>
<ul>
<li>Bachelor's in Biology, Biotechnology</li>
<li>Experience with PCR, ELISA</li>
<li>Good lab skills</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>Competitive salary</li>
<li>Professional environment</li>
<li>Training opportunities</li>
</ul>
<p>Send CV to: hr@kt-biotech.com</p>""",
        "locale": "en",
        "type": "recruitment"
    },
    {
        "title": "Hiring QC Manager",
        "slug": "hiring-qc-manager",
        "description": "Hiring QC Manager. KTBioTech seeks QC Manager with experience in test kit field.",
        "body": """<h2>Hiring QC Manager</h2>
<p>KTBioTech is hiring QC Manager for product quality management.</p>
<h3>Requirements</h3>
<ul>
<li>2 years QC experience</li>
<li>Knowledge of ISO, GMP</li>
<li>Good management skills</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>Attractive salary</li>
<li>Allowances</li>
<li>Full insurance</li>
</ul>
<p>Apply now!</p>""",
        "locale": "en",
        "type": "recruitment"
    },
    {
        "title": "Hiring R&D Scientist",
        "slug": "hiring-rd-scientist",
        "description": "Hiring R&D Scientist. KTBioTech seeks researcher for R&D department.",
        "body": """<h2>Hiring R&D Scientist</h2>
<p>KTBioTech is seeking R&D Scientist for new research projects.</p>
<h3>Requirements</h3>
<ul>
<li>Master/Bachelor in Biology</li>
<li>Research experience</li>
<li>Good English</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>Professional R&D environment</li>
<li>Scientific publications</li>
<li>High salary</li>
</ul>
<p>Contact us!</p>""",
        "locale": "en",
        "type": "recruitment"
    },
    {
        "title": "Hiring Sales Executive",
        "slug": "hiring-sales-executive",
        "description": "Hiring Sales Executive. KTBioTech seeks sales with medical field experience.",
        "body": """<h2>Hiring Sales Executive</h2>
<p>KTBioTech is hiring Sales Executive for biotech test kit market.</p>
<h3>Requirements</h3>
<ul>
<li>Medical sales experience</li>
<li>Good communication</li>
<li>Dynamic</li>
</ul>
<h3>Benefits</h3>
<ul>
<li>High commission</li>
<li>Sales bonus</li>
<li>In-depth training</li>
</ul>
<p>Apply now!</p>""",
        "locale": "en",
        "type": "recruitment"
    },
]

def create_article(title, slug, description, body, locale, article_type):
    payload = {
        "data": {
            "title": title,
            "description": description,
            "slug": slug,
            "locale": locale,
            "type": article_type,
            "publishedAt": "2026-06-04T00:00:00.000Z",
            "blocks": [
                {
                    "__component": "shared.rich-text",
                    "body": body
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

    try:
        result = json.loads(response.stdout)
        if "data" in result and result["data"]:
            doc_id = result["data"].get("documentId", "N/A")
            return True, f"✅ {title[:35]}... ({doc_id[:12]}...)"
        else:
            return False, f"❌ Error: {response.stdout[:100]}"
    except Exception as e:
        return False, f"❌ Parse error: {e}"

print("📝 Creating recruitment articles with full content...")
print("=" * 60)

for article in recruitment_articles:
    success, msg = create_article(
        title=article["title"],
        slug=article["slug"],
        description=article["description"],
        body=article["body"],
        locale=article["locale"],
        article_type=article["type"]
    )
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
