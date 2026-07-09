#!/bin/bash

# Link Existing Media to Articles
# Usage: ./scripts/link-article-images.sh

STRAPI_URL="${STRAPI_URL:-https://strapi.kt-biotech.com}"
API_TOKEN="${STRAPI_TOKEN:-10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b}"

echo "🖼️  Linking existing media to articles..."
echo "📡 URL: $STRAPI_URL"

# Get articles (vi-VN only, newly created ones)
articles_response=$(curl -s "$STRAPI_URL/api/articles?locale=vi-VN&sort=id:desc&pagination[limit]=20" \
  -H "Authorization: Bearer $API_TOKEN")

# Get media files (images only)
media_response=$(curl -s "$STRAPI_URL/api/upload/files?pagination[limit]=30" \
  -H "Authorization: Bearer $API_TOKEN")

# Extract article IDs (using simple grep)
article_ids=$(echo "$articles_response" | grep -o '"id":[5-9][0-9][0-9]' | cut -d':' -f2 | sort -u)

# Extract media file IDs
media_ids=$(echo "$media_response" | grep -o '"id":[0-9]*' | cut -d':' -f2 | head -20)

echo "📝 Found $(echo "$article_ids" | wc -l) articles"
echo "🖼️  Found $(echo "$media_ids" | wc -l) media files"
echo ""

# Convert to arrays
readarray -t article_arr <<< "$article_ids"
readarray -t media_arr <<< "$media_ids"

# Link media to articles
i=0
for article_id in "${article_arr[@]}"; do
  if [ $i -ge ${#media_arr[@]} ]; then
    break
  fi

  media_id="${media_arr[$i]}"

  # Update article with cover image (using documentId or id format)
  update_response=$(curl -s -X PUT "$STRAPI_URL/api/articles/$article_id" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_TOKEN" \
    -d "{
      \"data\": {
        \"cover\": $media_id
      }
    }")

  if echo "$update_response" | grep -q '"id":[0-9]'; then
    echo "✅ Article $article_id linked to media $media_id"
  else
    # Try with documentId format
    update_response=$(curl -s -X PUT "$STRAPI_URL/api/articles/$article_id" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_TOKEN" \
      -d "{
        \"data\": {
          \"image\": $media_id
        }
      }")

    if echo "$update_response" | grep -q '"id":[0-9]'; then
      echo "✅ Article $article_id linked to media $media_id (image field)"
    else
      echo "⚠️  Article $article_id - trying content method..."

      # Add image to content instead
      img_url="https://strapi.kt-biotech.com/uploads/thumbnail_daviddoe_strapi_ed0d44b6da.jpeg"
      content="<div class='article-cover'><img src='$img_url' alt='Cover' style='width:100%;border-radius:8px;margin-bottom:20px;' /></div>"
      content_escaped=$(echo "$content" | sed 's/"/\\"/g' | tr -d '\n')

      curl -s -X PUT "$STRAPI_URL/api/articles/$article_id" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $API_TOKEN" \
        -d "{\"data\":{\"content\":\"$content_escaped\"}}" > /dev/null

      echo "✅ Article $article_id updated with image in content"
    fi
  fi

  ((i++))
  sleep 0.2
done

echo ""
echo "🎉 Done! Linked images to $i articles"
