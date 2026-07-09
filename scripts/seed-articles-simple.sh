#!/bin/bash

# Simple Seed Articles Script for Strapi
# Usage: ./scripts/seed-articles-simple.sh

STRAPI_URL="${STRAPI_URL:-https://strapi.kt-biotech.com}"
API_TOKEN="${STRAPI_TOKEN:-10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b}"

echo "🌱 Seeding articles to Strapi..."
echo "📡 URL: $STRAPI_URL"

# Function to create article
create_article() {
  local title="$1"
  local description="$2"
  local slug="$3"
  local type="$4"

  # Build JSON with simple escaping
  json_data=$(cat <<EOF
{
  "data": {
    "title": "$title",
    "description": "$description",
    "slug": "$slug",
    "locale": "vi-VN",
    $( [ -n "$type" ] && echo -n "\"type\": \"$type\"," )
    "publishedAt": "$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")"
  }
}
EOF
)

  # Create article via API
  response=$(curl -s -X POST "$STRAPI_URL/api/articles" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_TOKEN" \
    -d "$json_data")

  # Check response
  if echo "$response" | grep -q '"id":[0-9]'; then
    id=$(echo "$response" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    echo "✅ Created (ID: $id): $title"
    return 0
  else
    echo "❌ Failed: $title"
    echo "   Error: ${response:0:80}"
    return 1
  fi
}

# Create articles
create_article "Nghiên cứu protein folding và bệnh Alzheimer" \
  "Khám phá nghiên cứu protein folding và bệnh alzheimer" \
  "nghien-cuu-protein-folding-va-benh-alzheimer" \
  ""

create_article "Chuẩn hóa quy trình nghiên cứu" \
  "Thông tin chuẩn hóa quy trình nghiên cứu" \
  "chuan-hoa-quy-trinh-nghien-cuu" \
  "news"

create_article "Chứng nhận chất lượng quốc tế" \
  "Tìm hiểu về chứng nhận chất lượng quốc tế" \
  "chung-nhan-chat-luong-quoc-te" \
  "news"

create_article "Giải thưởng khoa học cho KTBioTech" \
  "Khám phá giải thưởng khoa học cho ktbiotech" \
  "giai-thuong-khoa-hoc-cho-ktbiotech-151676-719" \
  "news"

create_article "Hiểu về công nghệ sinh học" \
  "Phát triển hiểu về công nghệ sinh học" \
  "hieu-ve-cong-nghe-sinh-hoc" \
  "news"

create_article "Tuyển dụng chuyên gia hàng đầu" \
  "Nghiên cứu tuyển dụng chuyên gia hàng đầu" \
  "tuyen-dung-chuyen-gia-hang-au-607142-010" \
  "news"

create_article "Hợp tác quốc tế với các đối tác lớn" \
  "Phát triển hợp tác quốc tế với các đối tác lớn" \
  "hop-tac-quoc-te-voi-cac-oi-tac-lon" \
  "news"

create_article "Phát triển phương pháp chẩn đoán không xâm lấn" \
  "Phát triển phát triển phương pháp chẩn đoán không xâm lấn" \
  "phat-trien-phuong-phap-chan-oan-khong-xam-lan-612929-913" \
  "news"

create_article "Phát triển thuốc từ thực vật dược liệu" \
  "Thông tin phát triển thuốc từ thực vật dược liệu" \
  "phat-trien-thuoc-tu-thuc-vat-duoc-lieu-161172-920" \
  "news"

create_article "Ứng dụng AI trong phân tích dữ liệu sinh học" \
  "Khám phá ứng dụng ai trong phân tích dữ liệu sinh học" \
  "ung-dung-ai-trong-phan-tich-du-lieu-sinh-hoc-158299-418" \
  "news"

create_article "Quy trình sản xuất thuốc" \
  "Thông tin quy trình sản xuất thuốc" \
  "quy-trinh-san-xuat-thuoc-154671-684" \
  ""

create_article "Hội thảo khoa học quốc tế" \
  "Ứng dụng hội thảo khoa học quốc tế" \
  "hoi-thao-khoa-hoc-quoc-te-610163-199" \
  ""

create_article "CRISPR là gì và ứng dụng" \
  "Ứng dụng crispr là gì và ứng dụng" \
  "crispr-la-gi-va-ung-dung-600816-066" \
  "news"

create_article "Quy trình sản xuất thuốc" \
  "Phát triển quy trình sản xuất thuốc" \
  "quy-trinh-san-xuat-thuoc" \
  "news"

create_article "Hiểu về công nghệ sinh học" \
  "Nghiên cứu hiểu về công nghệ sinh học" \
  "hieu-ve-cong-nghe-sinh-hoc-148370-352" \
  "news"

echo ""
echo "🎉 Seeding complete!"
