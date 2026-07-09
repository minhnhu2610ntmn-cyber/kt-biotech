#!/bin/bash

# Link Existing Media to Articles (macOS compatible)
# Usage: ./scripts/link-article-images-v2.sh

STRAPI_URL="https://strapi.kt-biotech.com"
API_TOKEN="10e807beb945d1aac3f34a50e35c4b94eb1fddc4d2a5b817714235552428df72e326fc59334cfd51c2dc3ec772bfff8248f6a2ed0697905d748aaa25b9d29d967fdb36fb10c1318ad932d1d05234e1d333817d05594746a52a67c5892d7791fbd8b0ab8b9f5782fd027bc234c6050db571d049de492f12334ed35f9d473f996b"

echo "🖼️  Linking existing media to articles..."

# Article IDs (newly created ones)
article_ids="507 509 511 513 515 517 519 521 523 525 527 529 531 533 535"

# Media IDs from Strapi
media_ids="1 2 3 4 5 6 7 8 9 10 11 12 13 14 15"

i=1
for article_id in $article_ids; do
  # Get corresponding media ID
  media_id=$(echo "$media_ids" | awk -v i="$i" '{print $i}')

  # Add image to content
  img_url="https://strapi.kt-biotech.com/uploads/thumbnail_daviddoe_strapi_ed0d44b6da.jpeg"
  if [ $i -eq 2 ]; then
    img_url="https://strapi.kt-biotech.com/uploads/this_shrimp_is_awesome_e45aa501b4.jpeg"
  elif [ $i -eq 3 ]; then
    img_url="https://strapi.kt-biotech.com/uploads/what_s_inside_a_black_hole_e88b6950cc.jpeg"
  elif [ $i -eq 4 ]; then
    img_url="https://strapi.kt-biotech.com/uploads/beautiful_picture_5804a62831.jpeg"
  elif [ $i -eq 5 ]; then
    img_url="https://strapi.kt-biotech.com/uploads/coffee_art_cd187469ce.jpeg"
  fi

  content="<div class='article-cover'><img src='$img_url' alt='Article cover' style='width:100%;max-height:400px;object-fit:cover;border-radius:8px;margin-bottom:20px;' /></div><div class='article-body'><h2>Tiêu đề</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></div>"

  # Escape content for JSON
  content_escaped=$(echo "$content" | sed 's/"/\\"/g' | tr -d '\n' | sed 's/>/\\>/g')

  # Update article
  response=$(curl -s -X PUT "$STRAPI_URL/api/articles/$article_id" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $API_TOKEN" \
    -d "{\"data\":{\"content\":\"$content_escaped\"}}")

  if echo "$response" | grep -q '"id":[0-9]'; then
    echo "✅ Article $article_id updated with image"
  else
    echo "❌ Failed article $article_id: ${response:0:50}"
  fi

  ((i++))
  sleep 0.2
done

echo ""
echo "🎉 Done! Updated $((i-1)) articles with images"
