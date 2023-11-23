document.addEventListener('DOMContentLoaded', () => {
    const videoDetails = localStorage.getItem('selectedVideoDetails');
    
    if (videoDetails) {
        const { videoId, title } = JSON.parse(videoDetails);
        document.getElementById('videoTitle').textContent = title;
        embedYouTubePlayer(videoId);
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