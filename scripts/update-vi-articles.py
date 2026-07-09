#!/usr/bin/env python3
"""
Update articles with Vietnamese content and images
"""

import json
import subprocess
import time

STRAPI_URL = "https://strapi.kt-biotech.com"
API_TOKEN = "10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

# Vietnamese content for articles
articles_vi = [
    {
        "id": 507,
        "title": "Nghiên cứu protein folding và bệnh Alzheimer",
        "description": "Khám phá nghiên cứu protein folding và bệnh Alzheimer. Nghiên cứu chuyên sâu về cơ chế gấp xếp protein và mối liên quan với bệnh lý thần kinh thoái hóa.",
        "content": """<p>Nghiên cứu protein folding là một trong những lĩnh vực quan trọng nhất trong sinh học phân tử hiện đại. Tại KTBioTech, chúng tôi tập trung vào việc:</p>
<ul>
<li>Nghiên cứu cơ chế gấp xếp protein</li>
<li>Phát triển phương pháp chẩn đoán sớm</li>
<li>Tìm kiếm các giải pháp điều trị mới</li>
</ul>
<p>Sử dụng công nghệ CRISPR và các kỹ thuật sinh học phân tử tiên tiến, đội ngũ nghiên cứu của chúng tôi đang nỗ lực không ngừng để góp phần vào cuộc chiến chống lại bệnh Alzheimer.</p>"""
    },
    {
        "id": 509,
        "title": "Chuẩn hóa quy trình nghiên cứu",
        "description": "Thông tin về quy trình nghiên cứu chuẩn hóa quốc tế. KTBioTech tuân thủ các quy trình chất lượng nghiêm ngặt theo tiêu chuẩn ISO và GMP.",
        "content": """<p>Hệ thống quản lý chất lượng của KTBioTech được thiết kế theo các tiêu chuẩn quốc tế:</p>
<ul>
<li>ISO 13485:2016 - Thiết bị y tế</li>
<li>GMP (Good Manufacturing Practice)</li>
<li>ISO 9001:2015 - Quản lý chất lượng</li>
</ul>
<p>Qui trình chuẩn hóa đảm bảo tính nhất quán và độ tin cậy trong mọi khâu từ nghiên cứu đến sản xuất.</p>"""
    },
    {
        "id": 511,
        "title": "Chứng nhận chất lượng quốc tế",
        "description": "Tìm hiểu về các chứng nhận chất lượng quốc tế mà KTBioTech đã đạt được. Công ty chúng tôi tự hào với nhiều chứng chỉ uy tín.",
        "content": """<p>KTBioTech tự hào đã đạt được nhiều chứng nhận chất lượng quan trọng:</p>
<ul>
<li>Chứng nhận ISO 13485</li>
<li>Chứng nhận CE Marking</li>
<li>Đăng ký thiết bị y tế Bộ Y tế</li>
<li>Chứng nhận FDA (đang hồ sơ)</li>
</ul>
<p>Những chứng nhận này cam kết với khách hàng về chất lượng và an toàn của sản phẩm.</p>"""
    },
    {
        "id": 513,
        "title": "Giải thưởng khoa học cho KTBioTech",
        "description": "Khám phá các giải thưởng khoa học danh giá mà KTBioTech đã nhận được. Công ty vinh dự được công nhận về những đóng góp cho y học.",
        "content": """<p>Suốt quá trình hình thành và phát triển, KTBioTech đã vinh dự nhận được:</p>
<ul>
<li>Giải Nhì Cuộc thi Khoa học Kỹ thuật Quốc gia</li>
<li>Giải thưởng Sáng tạo TPHCM</li>
<li>Bằng khen của Bộ Y tế</li>
<li>Công trình khoa học cấp Bộ xuất sắc</li>
</ul>
<p>Những giải thưởng này là sự ghi nhận cho những nỗ lực không ngừng của đội ngũ nghiên cứu.</p>"""
    },
    {
        "id": 515,
        "title": "Hiểu về công nghệ sinh học",
        "description": "Phát triển hiểu về công nghệ sinh học và ứng dụng thực tế. Công nghệ sinh học đang thay đổi cách chúng ta tiếp cận y học và đời sống.",
        "content": """<p>Công nghệ sinh học là lĩnh vực khoa học sử dụng hệ thống sinh sống để sản xuất sản phẩm. Tại KTBioTech, chúng tôi ứng dụng:</p>
<ul>
<li>Kỹ thuật CRISPR-Cas9 chỉnh sửa gene</li>
<li>Công nghệ PCR thời gian thực</li>
<li>Nghiên cứu tế bào gốc</li>
<li>Sản xuất kit chẩn đoán phân tử</li>
</ul>
<p>Các ứng dụng này đang mang lại lợi ích to lớn cho y tế, nông nghiệp và môi trường.</p>"""
    },
    {
        "id": 517,
        "title": "Tuyển dụng chuyên gia hàng đầu",
        "description": "Nghiên cứu tuyển dụng chuyên gia hàng đầu tại KTBioTech. Chúng tôi luôn tìm kiếm những nhân tài muốn đóng góp cho khoa học.",
        "content": """<p>KTBioTech đang tuyển dụng các vị trí:</p>
<ul>
<li>Chuyên gia Nghiên cứu và Phát triển (R&D)</li>
<li>Kỹ thuật sinh học phân tử</li>
<li>Chuyên gia chất lượng (QA/QC)</li>
<li>Nhân sự kinh tế - Kỹ thuật</li>
</ul>
<p>Chúng tôi offer: Mức lương cạnh tranh, môi trường làm việc chuyên nghiệp, cơ hội đào tạo nâng cao.</p>"""
    },
    {
        "id": 519,
        "title": "Hợp tác quốc tế với các đối tác lớn",
        "description": "Phát triển hợp tác quốc tế với các đối tác lớn. KTBioTech xây dựng mối quan hệ với các tổ chức uy tín toàn cầu.",
        "content": """<p>KTBioTech tự hào là đối tác của:</p>
<ul>
<li>Viện Pasteur TP.HCM</li>
<li>Đại học Y Dược TPHCM</li>
<li>Bệnh viện Nhi Đồng 2</li>
<li>Tổ chức Y tế Thế giới (WHO)</li>
</ul>
<p>Sự hợp tác giúp chúng tôi tiếp cận công nghệ tiên tiến và mở rộng thị trường quốc tế.</p>"""
    },
    {
        "id": 521,
        "title": "Phát triển phương pháp chẩn đoán không xâm lấn",
        "description": "Nghiên cứu phương pháp chẩn đoán không xâm lấn tiên tiến. Kỹ thuật mới giúp phát hiện bệnh sớm mà không cần phẫu thuật.",
        "content": """<p>Phương pháp chẩn đoán không xâm lấn của KTBioTech bao gồm:</p>
<ul>
<li>Test based trên máu và nước bọt</li>
<li>Kỹ thuật PCR thực thời</li>
<li>Biosensor điện hóa</li>
<li>Công nghệ microrna</li>
</ul>
<p>Ưu điểm: Không gây đau, giảm nguy cơ lây nhiễm, kết quả nhanh, chi phí thấp.</p>"""
    },
    {
        "id": 523,
        "title": "Phát triển thuốc từ thực vật dược liệu",
        "description": "Thông tin về nghiên cứu thuốc từ thực vật dược liệu. KTBioTech phát triển các sản phẩm thiên nhiên an toàn và hiệu quả.",
        "content": """<p>Dự án nghiên cứu dược liệu của KTBioTech tập trung vào:</p>
<ul>
<li>Trawl cứu dược liệu Việt Nam</li>
<li>Chiết xuất và tinh chế hoạt chất</li>
<li>Nghiên cứu tác dụng dược lý</li>
<li>Phát triển sản phẩm hoàn chỉnh</li>
</ul>
<p>Các sản phẩm từ thiên nhiên mang lại hiệu quả điều trị cao với ít tác dụng phụ.</p>"""
    },
    {
        "id": 525,
        "title": "Ứng dụng AI trong phân tích dữ liệu sinh học",
        "description": "Khám phá ứng dụng trí tuệ nhân tạo trong phân tích dữ liệu sinh học. AI giúp xử lý dữ liệu gene và protein nhanh hơn gấp nhiều lần.",
        "content": """<p>KTBioTech ứng dụng AI trong:</p>
<ul>
<li>Phân tích dữ liệu gene sequencing</li>
<li>Dự đoán cấu trúc protein</li>
<li>Phát hiện biomarker bệnh</li>
<li>Tối ưu hóa quy trình sản xuất</li>
</ul>
<p>AI giúp rút ngắn thời gian nghiên cứu từ vài tháng xuống còn vài ngày.</p>"""
    },
    {
        "id": 527,
        "title": "Quy trình sản xuất thuốc",
        "description": "Thông tin quy trình sản xuất thuốc chuẩn GMP. KTBioTech tuân thủ nghiêm ngặt quy trình chất lượng.",
        "content": """<p>Quy trình sản xuất của KTBioTech:</p>
<ul>
<li>Kiểm soát nguyên liệu đầu vào</li>
<li>Sản xuất trong môi trường sạch</li>
<li>Kiểm soát quá trình (in-process control)</li>
kiểm tra thành phẩm (QC)
<li>Phát hành và theo dõi sau sản phẩm</li>
</ul>
<p>Mọi batch đều được ghi nhận đầy đủ theo tiêu chuẩn GMP.</p>"""
    },
    {
        "id": 529,
        "title": "Hội thảo khoa học quốc tế",
        "description": "Ứng dụng các hội thảo khoa học quốc tế. KTBioTech thường xuyên tham gia và tổ chức hội thảo chuyên ngành.",
        "content": """<p>KTBioTech tham gia các hội thảo quốc tế:</p>
<ul>
<li>Hội nghị Gene Editing Châu Á</li>
<li>Hội thảo PCR Quốc tế</li>
<li>Các hội nghị của WHO</li>
<li>Hội thảo Y học hạt nhân Việt Nam</li>
</ul>
<p>Đây là cơ hội chia sẻ kiến thức và cập nhật công nghệ mới.</p>"""
    },
    {
        "id": 531,
        "title": "CRISPR là gì và ứng dụng",
        "description": "Tìm hiểu về công nghệ CRISPR và ứng dụng trong y học. Công nghệ chỉnh sửa gene đang thay đổi y học hiện đại.",
        "content": """<p>CRISPR-Cas9 là công nghệ chỉnh sửa gene đột phá:</p>
<ul>
<li>Chỉnh sửa gene chính xác cao</li>
<li>Chi phí thấp so với phương pháp cũ</li>
<li>Ứng dụng: điều trị bệnh di truyền, cải giống cây trồng, nghiên cứu</li>
<li>KTBioTech sử dụng CRISPR trong R&D kit chẩn đoán</li>
</ul>
<p>Công nghệ này mở ra kỷ nguyên mới trong y học chính xác.</p>"""
    },
    {
        "id": 533,
        "title": "Quy trình sản xuất thuốc (Phát triển)",
        "description": "Phát triển quy trình sản xuất thuốc theo chuẩn quốc tế. Nghiên cứu và tối ưu hóa quy trình liên tục.",
        "content": """<p>Phát triển quy trình sản xuất:</p>
<ul>
<li>Nghiên cứu quy trình scale-up</li>
<li>Tối ưu hóa parameter sản xuất</li>
<li>Thiết lập validation method</li>
<li>Đào tạo nhân sự sản xuất</li>
</ul>
<p>Mục tiêu: Tăng năng suất, giảm chi phí, đảm bảo chất lượng đồng nhất.</p>"""
    },
    {
        "id": 535,
        "title": "Hiểu về công nghệ sinh học (Nghiên cứu)",
        "description": "Nghiên cứu chuyên sâu về công nghệ sinh học và xu hướng phát triển. Định hướng tương lai của ngành.",
        "content": """<p>Xu hướng công nghệ sinh học tương lai:</p>
<ul>
<li>Gene therapy và cell therapy</li>
<li>Synthetic biology</li>
<li>Personalized medicine</li>
<li>Biosensor và point-of-care testing</li>
</ul>
<p>KTBioTech đang đầu tư R&D để tiên phong trong các lĩnh vực mới này.</p>"""
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

print("📝 Updating articles with Vietnamese content...")

for i, article in enumerate(articles_vi):
    img_url = images[i % len(images)]

    # Add image to description
    full_desc = f'<div style="margin-bottom:15px;"><img src="{img_url}" alt="{article["title"]}" style="width:100%;max-height:300px;object-fit:cover;border-radius:8px;" /></div>{article["description"]}'

    payload = {
        "data": {
            "description": full_desc
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
            print(f"✅ {article['title'][:40]}...")
        else:
            print(f"❌ {article['id']}: {response.stdout[:100]}")
    except:
        print(f"❌ {article['id']}: Connection error")

    time.sleep(0.2)

print(f"\n🎉 Done! Updated {len(articles_vi)} articles")
