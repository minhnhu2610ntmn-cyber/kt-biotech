#!/usr/bin/env python3
"""
Update recruitment articles with full content (VI + EN)
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Recruitment articles content (VI + EN)
recruitment_content = {
    # Vietnamese recruitment
    "recruit-vi-1": {
        "doc_id": "kvh51x09s74wie1jvmwwxpje",
        "locale": "vi",
        "title": "Tuyển dụng Kỹ sinh học",
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
<p>Gửi CV về: hr@kt-biotech.com</p>"""
    },
    "recruit-vi-2": {
        "doc_id": "lwi62j10t85xjf2kwnxyxqkf",
        "locale": "vi",
        "title": "Tuyển dụng QC Manager",
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
<p>Ứng tuyển ngay!</p>"""
    },
    "recruit-vi-3": {
        "doc_id": "mxj73k21u96ykg3lxozyzrlg",
        "locale": "vi",
        "title": "Tuyển dụng R&D Scientist",
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
<p>Liên hệ ngay!</p>"""
    },
    "recruit-vi-4": {
        "doc_id": "nyk84l32v70zlh4mypzzasmh",
        "locale": "vi",
        "title": "Tuyển dụng Sales Executive",
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
<p>Ứng tuyển ngay!</p>"""
    },
    # English recruitment
    "recruit-en-1": {
        "doc_id": "oz95m43w81ami5jnqqaabtni",
        "locale": "en",
        "title": "Hiring Biotech Engineer",
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
<p>Send CV to: hr@kt-biotech.com</p>"""
    },
    "recruit-en-2": {
        "doc_id": "p0a6n54x92bnj6okrrbbcuoj",
        "locale": "en",
        "title": "Hiring QC Manager",
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
<p>Apply now!</p>"""
    },
    "recruit-en-3": {
        "doc_id": "q1b7o65y3c9ok7plssccdvpk",
        "locale": "en",
        "title": "Hiring R&D Scientist",
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
<p>Contact us!</p>"""
    },
    "recruit-en-4": {
        "doc_id": "r2c8p76z4d0pl8qmmtddewql",
        "locale": "en",
        "title": "Hiring Sales Executive",
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
<p>Apply now!</p>"""
    },
}

def update_article(doc_id, title, description, body, locale):
    payload = {
        "data": {
            "title": title,
            "description": description,
            "locale": locale,
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

print("📝 Updating recruitment articles with full content...")
print("=" * 60)

for key, content in recruitment_content.items():
    success, msg = update_article(
        content["doc_id"],
        content["title"],
        content["description"],
        content["body"],
        content["locale"]
    )
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
