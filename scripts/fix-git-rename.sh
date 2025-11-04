#!/bin/bash

# Set the repository root directory
REPO_ROOT="$(pwd)"

# Directories to process
directories=("src/components" "src/screen" "src/pages")

# First, let's find all files that need to be renamed
find "${directories[@]}" -type f | while read -r file; do
  # Get the directory and filename
  dir=$(dirname "$file")
  filename=$(basename "$file")
  
  # Skip if already lowercase
  if [[ $filename =~ ^[a-z] ]]; then
    continue
  fi
  
  # Create the new filename with first letter lowercase
  new_filename=$(echo "$filename" | sed 's/^\(.\)/\L\1/')
  
  # Only proceed if the filename actually changes
  if [ "$filename" != "$new_filename" ]; then
    # Rename the file using git mv
    echo "Renaming $dir/$filename to $dir/$new_filename"
    git mv -f "$file" "$dir/$new_filename"
  fi
done

echo "Renaming complete. Please check the changes with: git status"
