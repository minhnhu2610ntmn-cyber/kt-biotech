#!/bin/bash

# Seed Articles Script for Strapi
# Usage: ./scripts/seed-articles.sh

STRAPI_URL="${STRAPI_URL:-http://103.90.225.225:1337}"
API_TOKEN="${STRAPI_TOKEN:-}"

echo "🌱 Seeding articles to Strapi..."
echo "📡 URL: $STRAPI_URL"

# Articles array (title|description|slug|type)
declare -a ARTICLES=(
  "Nghiên cứu protein folding và bệnh Alzheimer|Khám phá nghiên cứu protein folding và bệnh alzheimer|nghien-cuu-protein-folding-va-benh-alzheimer|"
  "Chuẩn hóa quy trình nghiên cứu|Thông tin chuẩn hóa quy trình nghiên cứu|chuan-hoa-quy-trinh-nghien-cuu|news"
  "Chứng nhận chất lượng quốc tế|Tìm hiểu về chứng nhận chất lượng quốc tế|chung-nhan-chat-luong-quoc-te|news"
  "Giải thưởng khoa học cho KTBioTech|Khám phá giải thưởng khoa học cho ktbiotech|giai-thuong-khoa-hoc-cho-ktbiotech-151676-719|news"
  "Hiểu về công nghệ sinh học|Phát triển hiểu về công nghệ sinh học|hieu-ve-cong-nghe-sinh-hoc|news"
  "Tuyển dụng chuyên gia hàng đầu|Nghiên cứu tuyển dụng chuyên gia hàng đầu|tuyen-dung-chuyen-gia-hang-au-607142-010|news"
  "Hợp tác quốc tế với các đối tác lớn|Phát triển hợp tác quốc tế với các đối tác lớn|hop-tac-quoc-te-voi-cac-oi-tac-lon|news"
  "Phát triển phương pháp chẩn đoán không xâm lấn|Phát triển phát triển phương pháp chẩn đoán không xâm lấn|phat-trien-phuong-phap-chan-oan-khong-xam-lan-612929-913|news"
  "Phát triển thuốc từ thực vật dược liệu|Thông tin phát triển thuốc từ thực vật dược liệu|phat-trien-thuoc-tu-thuc-vat-duoc-lieu-161172-920|news"
  "Ứng dụng AI trong phân tích dữ liệu sinh học|Khám phá ứng dụng ai trong phân tích dữ liệu sinh học|ung-dung-ai-trong-phan-tich-du-lieu-sinh-hoc-158299-418|news"
  "Quy trình sản xuất thuốc|Thông tin quy trình sản xuất thuốc|quy-trinh-san-xuat-thuoc-154671-684|"
  "Hội thảo khoa học quốc tế|Ứng dụng hội thảo khoa học quốc tế|hoi-thao-khoa-hoc-quoc-te-610163-199|"
  "CRISPR là gì và ứng dụng|Ứng dụng crispr là gì và ứng dụng|crispr-la-gi-va-ung-dung-600816-066|news"
  "Quy trình sản xuất thuốc|Phát triển quy trình sản xuất thuốc|quy-trinh-san-xuat-thuoc|news"
  "Hiểu về công nghệ sinh học|Nghiên cứu hiểu về công nghệ sinh học|hieu-ve-cong-nghe-sinh-hoc-148370-352|news"
)

for article in "${ARTICLES[@]}"; do
  IFS='|' read -r title description slug type <<< "$article"

  # Generate fake content
  content="<h2>$title</h2><p>$description</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><h3>Chi tiết</h3><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><ul><li>Tính năng nổi bật</li><li>Hiệu suất cao</li><li>An toàn và đáng tin cậy</li></ul>"

  # Build JSON payload
  json_payload=$(cat <<EOF
{
  "data": {
    "title": "$title",
    "description": "$description",
    "slug": "$slug",
    "type": ${type:+\"$type\"},
    "locale": "vi-VN",
    "content": "$content",
    "publishedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")"
  }
}
EOF
)

  # Create article
  if [ -n "$API_TOKEN" ]; then
    response=$(curl -s -X POST "$STRAPI_URL/api/articles" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_TOKEN" \
      -d "$json_payload")
  else
    response=$(curl -s -X POST "$STRAPI_URL/api/articles" \
      -H "Content-Type: application/json" \
      -d "$json_payload")
  fi

  # Check if successful
  if echo "$response" | grep -q '"id":[0-9]'; then
    echo "✅ Created: $title"
  else
    echo "❌ Failed: $title"
    echo "Response: ${response:0:100}"
  fi

  # Delay to avoid rate limiting
  sleep 0.5
done

echo "🎉 Seeding complete!"
