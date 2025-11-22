#!/bin/bash

set -e

IMAGE_DIR="client/public/images"

echo "🔧 Fixing image filenames in $IMAGE_DIR ..."

find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read FILE; do
  BASENAME=$(basename "$FILE")
  DIRNAME=$(dirname "$FILE")

  # Lowercase filename
  NEWNAME=$(echo "$BASENAME" \
    | tr '[:upper:]' '[:lower:]' \
    | sed 's/ /-/g' \
    | sed 's/,+/-/g' \
    | sed 's/+/-/g' \
    | sed 's/,/-/g' \
    | sed 's/(/-/g' \
    | sed 's/)/-/g' \
    | sed 's/--/-/g' \
  )

  if [ "$BASENAME" != "$NEWNAME" ]; then
    echo "➡️  Renaming: $BASENAME → $NEWNAME"
    mv "$FILE" "$DIRNAME/$NEWNAME"

    # Update references everywhere in the project
    grep -rl "$BASENAME" . | xargs sed -i '' "s/$BASENAME/$NEWNAME/g"
  fi
done

echo "✅ Image filenames normalized"

