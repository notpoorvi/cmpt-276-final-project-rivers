// Get the video ID from the URL parameter
const videoId = getQueryParam('v');

// Fetch video details using the YouTube Data API
async function fetchVideoDetails() {
    const youtubeAPIKey = 'AIzaSyDoWT8CPztZQtjIrLpuVI_w5aAm5FdvIuE'; // Replace with your actual YouTube API key
    const youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/videos';

    const response = await fetch(`${youtubeBaseURL}?part=snippet&id=${videoId}&key=${youtubeAPIKey}`);
    const data = await response.json();

    // Display video details on the page
    displayVideoDetails(data.items[0].snippet);
}

function displayVideoDetails(videoDetails) {
    // Update elements on the page with the fetched data
    document.getElementById('search-title').textContent = videoDetails.title;

    // Create and append an iframe for the YouTube video
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;

    document.getElementById('youtube-video').appendChild(iframe);
}

// Call the function to fetch and display video details
fetchVideoDetails();
