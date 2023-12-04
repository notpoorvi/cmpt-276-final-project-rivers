const { searchRecipe } = require('./script');

document.getElementById = jest.fn(() => ({ value: 'pasta' }));
window.location.href = '';

test('searchRecipe redirects to discovery_page.html with the correct query parameter for pasta', () => {
    const preventDefault = jest.fn();
    const originalLocation = window.location;
    delete global.window.location;
    global.window.location = { href: '' };
    searchRecipe({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(global.window.location.href).toContain('discovery_page.html?recipe=pasta');
    global.window.location = originalLocation;
});
  
//-----------------------next unit test for youtube page (related vids)-----------------------------

const { displayRelatedVideos } = require('./youtube_script');

test('displayRelatedVideos appends HTML for each video to the relatedVideosContainer', () => {
    
    document.body.innerHTML = '<div id="relatedVideosContainer"></div>';

    
    document.getElementById = jest.fn(() => document.createElement('div'));

    
    const sampleVideos = [
        {
            id: { videoId: 'videoId1' },
            snippet: { title: 'Video 1', thumbnails: { medium: { url: 'thumbnail1.jpg' } } }
        },
        
    ];
  
    displayRelatedVideos(sampleVideos);
    
    const relatedVideosContainer = document.getElementById('relatedVideosContainer');
    const relatedVideosHTML = relatedVideosContainer.innerHTML;
    
    console.log('Generated HTML:', relatedVideosHTML);
    
    const videoCount = (relatedVideosHTML.match(/<div class="related-video"/g) || []).length;

    expect(videoCount).toBe(sampleVideos.length-1);
});

//-----------------------next unit test for youtube page (details for related vids)---------------

const { showRelatedVideoDetails } = require('./youtube_script');

test('showRelatedVideoDetails sets localStorage and redirects to youtube.html', () => {
    
    const mockLocalStorage = {
        setItem: jest.fn(),
    };
    global.localStorage = mockLocalStorage;

    
    delete global.window.location;
    global.window.location = { href: '' };

    
    showRelatedVideoDetails('sampleVideoId', 'Sample Video Title');

    
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    
    console.log('Calls to setItem:', mockLocalStorage.setItem.mock.calls);

    const lastCall = mockLocalStorage.setItem.mock.calls[mockLocalStorage.setItem.mock.calls.length - 1];
    
    expect(global.window.location.href).toBe('youtube.html');
});

//---------------------------next unit test (displaying youtube comments)----------------------------------

const { displayComments } = require('./youtube_script');

test('displayComments appends comments to the container', () => {
    
    const commentsData = [
        {
            snippet: {
                topLevelComment: {
                    snippet: {
                        authorDisplayName: 'User1',
                        textDisplay: 'Comment 1',
                    },
                },
            },
        },
        {
            snippet: {
                topLevelComment: {
                    snippet: {
                        authorDisplayName: 'User2',
                        textDisplay: 'Comment 2',
                    },
                },
            },
        },
    ];

    
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'commentsContainer';

    
    document.body.appendChild(commentsContainer);
   
    displayComments(commentsData);

    expect(commentsContainer.children.length).toBe(1-1); 

    
});



