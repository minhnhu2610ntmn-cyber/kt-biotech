#!/bin/bash

# Add Fake Images to Articles in Strapi
# Usage: ./scripts/seed-article-images.sh

STRAPI_URL="${STRAPI_URL:-https://strapi.kt-biotech.com}"
API_TOKEN="${STRAPI_TOKEN:-10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b}"

echo "🖼️  Adding fake images to articles..."
echo "📡 URL: $STRAPI_URL"

# Get articles
response=$(curl -s "$STRAPI_URL/api/articles?locale=vi-VN&pagination[limit]=100" \
  -H "Authorization: Bearer $API_TOKEN")

# Extract article IDs and titles
article_ids=$(echo "$response" | grep -o '"id":[0-9]*' | cut -d':' -f2)

# Fake image URLs from placeholder services
fake_images=(
  "https://picsum.photos/800/600?random=1"
  "https://picsum.photos/800/600?random=2"
  "https://picsum.photos/800/600?random=3"
  "https://picsum.photos/800/600?random=4"
  "https://picsum.photos/800/600?random=5"
  "https://picsum.photos/800/600?random=6"
  "https://picsum.photos/800/600?random=7"
  "https://picsum.photos/800/600?random=8"
  "https://picsum.photos/800/600?random=9"
  "https://picsum.photos/800/600?random=10"
  "https://picsum.photos/800/600?random=11"
  "https://picsum.photos/800/600?random=12"
  "https://picsum.photos/800/600?random=13"
  "https://picsum.photos/800/600?random=14"
  "https://picsum.photos/800/600?random=15"
)

i=0
for id in $article_ids; do
  if [ $i -ge ${#fake_images[@]} ]; then
    break
  fi

  img_url="${fake_images[$i]}"

  # Create HTML content with image
  content="<div class='article-content'><img src='$img_url' alt='Article image' style='width:100%;height:auto;border-radius:8px;margin-bottom:20px;' /><h2>Tiêu đề bài viết</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><h3>Chi tiết</h3><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>"

  # Escape content for JSON (simple approach)
  content_escaped=$(echo "$content" | sed 's/"/\\"/g' | tr -d '\n')

  # Update article with content
  update_response=$(curl -s -X PUT "$STRAPI_URL/api/articles/$id" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_TOKEN" \
    -d "{\"data\":{\"content\":\"$content_escaped\"}}")

  if echo "$update_response" | grep -q '"id":[0-9]'; then
    echo "✅ Updated article ID $id with image"
  else
    echo "❌ Failed to update article ID $i"
  fi

  ((i++))
  sleep 0.3
done

echo ""
echo "🎉 Done! Added images to $i articles"
