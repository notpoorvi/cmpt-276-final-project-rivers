const apiKey = 'AIzaSyDvtNzdBCepDaWXlERreRS1HRl1vU_Z4mA';

document.addEventListener('DOMContentLoaded', () => {
    const videoDetails = localStorage.getItem('selectedVideoDetails');
    
    if (videoDetails) {
        const { videoId, title } = JSON.parse(videoDetails);
        document.getElementById('videoTitle').textContent = title;
        embedYouTubePlayer(videoId);
        fetchYouTubeComments(videoId);
        fetchRelatedVideos(videoId);
    } else {
        console.error('No video details found.');
    }
});

function embedYouTubePlayer(videoId) {
    const playerContainer = document.getElementById('youtubePlayer');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = '1160';
    iframe.height = '715';
    iframe.allowFullscreen = true;

    playerContainer.appendChild(iframe);
}
function fetchYouTubeComments(videoId) {
     const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;
     // Make the API request
     fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
         displayComments(data.items);
     })
     .catch(error => {
         console.error('Error fetching comments:', error);
     });
 }

function displayComments(comments) {
    const commentsContainer = document.getElementById('commentsContainer');
    // Clear existing content
    commentsContainer.innerHTML = '';
    // Iterate through comments and create HTML elements
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        const authorElement = document.createElement('p');
        authorElement.textContent = comment.snippet.topLevelComment.snippet.authorDisplayName;
        const textElement = document.createElement('p');
        textElement.textContent = comment.snippet.topLevelComment.snippet.textDisplay;
        commentElement.appendChild(authorElement);
        commentElement.appendChild(textElement);
        commentsContainer.appendChild(commentElement);
    });
}

function fetchRelatedVideos(videoId) {
    const youtubeResultsDiv = document.getElementById('relatedVideosContainer');
    const youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/search';
    const youtubeResponse = fetch('${youtubeBaseURL}?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${apiKey}');
    const youtubeData = youtubeResponse.json;
    displayRelatedVideos(youtubeData.items);
    youtubeResultsDiv.classList.remove('hidden');
}

function displayRelatedVideos(videos) {
    let generatedItems = '';
    relatedVideos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnailUrl = video.snippet.thumbnails.medium.url;

        generatedItems += `
            <div class="related-video" onclick="showRelatedVideoDetails('${videoId}', '${title}')">
                <a href="#">
                    <img src="${thumbnailUrl}" alt="${title}">
                    <p class="related-video-title">${title}</p>
                </a>
            </div>
        `;
    });

    const relatedVideosDiv = document.getElementById('relatedVideosContainer');
    relatedVideosDiv.innerHTML = generatedItems;
};

function showYoutubeRecipeDetails(videoId, title) {
    // Store the selected video details in localStorage
    localStorage.setItem('selectedVideoDetails', JSON.stringify({ videoId, title }));
    // Redirect to the youtube.html page
    window.location.href = 'youtube.html';
}