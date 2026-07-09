#!/usr/bin/env python3
"""
Update VI blog articles with full Vietnamese content (description + blocks)
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Full content for VI blog articles (description < 300 chars + blocks with full HTML)
vi_blog_content = {
    "o0r4rba4q4wjie2iycnvf3ra": {
        "description": "Kit PCR thế hệ mới với độ nhạy cao. KTBioTech giới thiệu kit PCR giúp phát hiện sớm bệnh lý nguy hiểm.",
        "body": """<h2>Kit PCR thế hệ mới</h2>
<p>KTBioTech tự hào giới thiệu kit PCR thế hệ mới với độ nhạy cao, giúp phát hiện sớm các bệnh lý nguy hiểm.</p>
<h3>Đặc điểm nổi bật</h3>
<ul>
<li>Độ nháy cao: Phát hiện từ 10 bản sao viral</li>
<li>Tốc độ nhanh: Kết quả trong 45 phút</li>
<li>Dễ sử dụng: One-step RT-PCR</li>
<li>Chính xác: Độ đặc hiệu >98%</li>
</ul>
<p>Sản phẩm đã được kiểm chứng bởi các viện nghiên cứu hàng đầu Việt Nam.</p>"""
    },
    "nw75c8c85p4qdzlsvmmpad4q": {
        "description": "Hội thảo khoa học 2024. KTBioTech mời tham gia hội thảo Xu hướng công nghệ sinh học y tế 2024.",
        "body": """<h2>Hội thảo khoa học 2024</h2>
<p>Mời quý đối tác tham gia hội thảo khoa học với chủ đề "Xu hướng công nghệ sinh học y tế 2024".</p>
<h3>Nội dung chính</h3>
<ul>
<li>Cập nhật công nghệ PCR thời gian thực</li>
<li>Ứng dụng AI trong phân tích dữ liệu sinh học</li>
<li>Gene editing và y học chính xác</li>
<li>Chuẩn hóa quy trình sản xuất kit test</li>
</ul>
<p><strong>Thời gian:</strong> 9:00 - 16:00, ngày 20/06/2024<br>
<strong>Địa điểm:</strong> Hội trường KTBioTech</p>"""
    },
    "u28gwvjtkdv01g6stcg6fire": {
        "description": "Hợp tác chiến lược với Viện Pasteur. KTBioTech ký kết hợp tác thúc đẩy phát triển công nghệ sinh học Việt Nam.",
        "body": """<h2>Hợp tác chiến lược với Viện Pasteur</h2>
<p>KTBioTech và Viện Pasteur TP.HCM chính thức ký kết hợp tác chiến lược.</p>
<h3>Mục tiêu hợp tác</h3>
<ul>
<li>Nghiên cứu và phát triển kit chẩn đoán mới</li>
<li>Chuyển giao công nghệ tiên tiến</li>
<li>Đào tạo nhân sự chất lượng cao</li>
<li>Công bố khoa học chung</li>
</ul>
<p>Sự hợp tác này sẽ thúc đẩy sự phát triển của ngành công nghệ sinh học Việt Nam.</p>"""
    },
    "dh2auzsyhcgiote1kmy057ji": {
        "description": "Giải thưởng Sáng tạo TPHCM 2024. KTBioTech vinh dự nhận giải thưởng ghi nhận nỗ lực đội ngũ nghiên cứu.",
        "body": """<h2>Giải thưởng Sáng tạo TPHCM 2024</h2>
<p>KTBioTech vinh dự nhận Giải thưởng Sáng tạo TPHCM 2024.</p>
<h3>Thành tích đạt được</h3>
<ul>
<li>Giải Nhì Cuộc thi Khoa học Kỹ thuật Quốc gia</li>
<li>Giải thưởng Sáng tạo TPHCM 2024</li>
<li>Bằng khen của Bộ Y tế</li>
<li>Công trình khoa học cấp Bộ xuất sắc</li>
</ul>
<p>Những giải thưởng này là ghi nhận cho những nỗ lực không ngừng của đội ngũ nghiên cứu.</p>"""
    },
    "dvzf2rdl2rzdtce2i9s1nr7y": {
        "description": "Nghiên cứu Gene Editing tại KTBioTech. Đội ngũ R&D nghiên cứu ứng dụng CRISPR-Cas9 trong y học chính xác.",
        "body": """<h2>Nghiên cứu Gene Editing tại KTBioTech</h2>
<p>Đội ngũ R&D của KTBioTech đang nghiên cứu ứng dụng công nghệ CRISPR-Cas9 trong y học.</p>
<h3>Định hướng nghiên cứu</h3>
<ul>
<li>Chỉnh sửa gene chính xác cao</li>
<li>Chi phí thấp so với phương pháp cũ</li>
<li>Ứng dụng trong điều trị bệnh di truyền</li>
<li>Nghiên cứu kit chẩn đoán mới</li>
</ul>
<p>Công nghệ này mở ra kỷ nguyên mới trong y học chính xác tại Việt Nam.</p>"""
    },
    "r7sjxpyxjg22mhbmir3vq4no": {
        "description": "Tin từ KTBioTech. Cập nhật tin tức mới nhất về R&D công nghệ sinh học và hoạt động của công ty.",
        "body": """<h2>Tin từ KTBioTech</h2>
<p>Cập nhật những tin tức mới nhất về nghiên cứu và phát triển công nghệ sinh học.</p>
<h3>Các hoạt động nổi bật</h3>
<ul>
<li>Nghiên cứu và phát triển sản phẩm mới</li>
<li>Hợp tác với các đối tác quốc tế</li>
<li>Tham gia các hội thảo khoa học</li>
<li>Đào tạo nhân sự R&D</li>
</ul>
<p>KTBioTech cam kết mang đến những giải pháp y sinh học tiên tiến nhất.</p>"""
    },
    "a7d3h17dkghk98t49pjevrqf": {
        "description": "KTBioTech tiên phong công nghệ sinh học. Chuyên cung cấp kit test PCR, ELISA, tế bào học đạt chuẩn ISO.",
        "body": """<h2>KTBioTech tiên phong công nghệ sinh học</h2>
<p>KTBioTech là đơn vị tiên phong trong lĩnh vực công nghệ sinh học tại Việt Nam.</p>
<h3>Sản phẩm & Dịch vụ</h3>
<ul>
<li>Kit test PCR với độ chính xác cao</li>
<li>Kit ELISA thương hiệu quốc tế</li>
<li>Sản phẩm tế bào học</li>
<li>Dịch vụ OEM theo yêu cầu</li>
</ul>
<p>Sản phẩm đạt chuẩn ISO, GMP. Đội ngũ chuyên gia giàu kinh nghiệm luôn sẵn sàng phục vụ.</p>"""
    },
}

def update_article(doc_id, description, body):
    """Update article with description and blocks"""
    payload = {
        "data": {
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
            title = result["data"].get("title", "N/A")[:30]
            blocks_count = len(result["data"].get("blocks", []))
            return True, f"✅ {title}... ({blocks_count} blocks)"
        return False, f"❌ Error: {response.stdout[:80]}"
    except Exception as e:
        return False, f"❌ Parse error: {e}"

print("📝 Updating VI blog articles with full content...")
print("=" * 60)

for doc_id, content in vi_blog_content.items():
    success, msg = update_article(doc_id, content["description"], content["body"])
    print(msg)
    time.sleep(0.3)

print("\n🎉 Done!")
