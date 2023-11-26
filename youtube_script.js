/* super-linter-disable */
const apiKey = 'AIzaSyDvtNzdBCepDaWXlERreRS1HRl1vU_Z4mA'
// const apiKey = 'AIzaSyCB3qbGjQvnioKgkvGKGLvC261taR8tejE'
/* super-linter-enable */

document.addEventListener('DOMContentLoaded', () => {
  const videoDetails = localStorage.getItem('selectedVideoDetails')

  if (videoDetails) {
    const { videoId, title } = JSON.parse(videoDetails)
    document.getElementById('video-title').textContent = title
    embedYouTubePlayer(videoId)
    fetchYouTubeComments(videoId)
    fetchRelatedVideos(title)
  } else {
    console.error('No video details found.')
  }
})

function embedYouTubePlayer (videoId) {
  const playerContainer = document.getElementById('youtube-player')

  const iframe = document.createElement('iframe')
  iframe.src = `https://www.youtube.com/embed/${videoId}`
  iframe.width = '1160'
  iframe.height = '715'
  iframe.allowFullscreen = true

  playerContainer.appendChild(iframe)
}

function fetchYouTubeComments (videoId) {
  const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=30`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayComments(data.items)
    })
    .catch(error => {
      console.error('Error fetching comments:', error)
    })
}

function displayComments (comments) {
  const commentsContainer = document.getElementById('comments-container')

  commentsContainer.innerHTML = ''

  comments.forEach(comment => {
    const commentElement = document.createElement('div')
    commentElement.classList.add('comment')

    const authorElement = document.createElement('p')
    /* super-linter-disable */
    const authorId = `author`
    authorElement.setAttribute('id', authorId)
    authorElement.innerHTML = comment.snippet.topLevelComment.snippet.authorDisplayName

    const textElement = document.createElement('p')
    const textId = `comment`
    textElement.setAttribute('id', textId)
    textElement.innerHTML = comment.snippet.topLevelComment.snippet.textDisplay

    commentElement.appendChild(authorElement)
    commentElement.appendChild(textElement)
    commentsContainer.appendChild(commentElement)
    /* super-linter-enable */
  })
}

function fetchRelatedVideos (query) {
  const youtubeResultsDiv = document.getElementById('related-videos-container')
  const youtubeBaseURL = 'https://www.googleapis.com/youtube/v3/search'
  const youtubeResponse = fetch(`${youtubeBaseURL}?part=snippet&maxResults=10&q=${query}&type=video&key=${apiKey}`)

  youtubeResponse
    .then(response => response.json())
    .then(data => {
      displayRelatedVideos(data.items)
      youtubeResultsDiv.classList.remove('hidden')
    })
    .catch(error => {
      console.error('Error fetching related videos:', error)
    })
}

function displayRelatedVideos (videos) {
  let generatedItems = ''

  videos.forEach(video => {
    const videoId = video.id.videoId
    const title = video.snippet.title
    const thumbnailUrl = video.snippet.thumbnails.medium.url

    generatedItems += `
            <div class="related-video" onclick="showRelatedVideoDetails('${videoId}', '${title}')">
                <a href="#">
                    <img src="${thumbnailUrl}" alt="${title}">
                    <p class="related-video-title">${title}</p>
                </a>
            </div>
        `
  })

  const relatedVideosDiv = document.getElementById('related-videos-container')
  relatedVideosDiv.innerHTML = generatedItems
}

/* super-linter-disable */
function showRelatedVideoDetails (videoId, title) {
  localStorage.setItem('selectedVideoDetails', JSON.stringify({ videoId, title }))
  window.location.href = 'youtube.html'
}
/* super-linter-enable */