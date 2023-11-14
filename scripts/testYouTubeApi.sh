#!/bin/bash

# Replace 'YOUR_API_KEY' with your actual YouTube API key
api_key='YOUR_API_KEY'

# YouTube API endpoint for searching videos
api_url="https://www.googleapis.com/youtube/v3/search"

# Define the search query
search_query="OpenAI GPT-3"

# Make a GET request using curl
response=$(curl -s "$api_url?key=$api_key&q=$search_query")

# Check if the request was successful (HTTP status code 200)
if [[ $(echo "$response" | jq -r '.error') == null ]]; then
    # Extract video information from the response
    video_title=$(echo "$response" | jq -r '.items[0].snippet.title')
    video_id=$(echo "$response" | jq -r '.items[0].id.videoId')

    echo "Video Title: $video_title"
    echo "Video ID: $video_id"
else
    error_message=$(echo "$response" | jq -r '.error.message')
    echo "Error: $error_message"
fi
