const { fetchYouTubeComments } = require('./youtube_script');

global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({
        items: [
            {
                snippet: {
                    topLevelComment: {
                        snippet: {
                            authorDisplayName: '@lukeroberts3401',
                            textDisplay: 'Why do Americans call pasta, noodles 😭'
                        }
                    }
                }
            },
            {
                snippet: {
                    topLevelComment: {
                        snippet: {
                            authorDisplayName: '@dragon5064',
                            textDisplay: '.'
                        }
                    }
                }
            },
            {
                snippet: {
                    topLevelComment: {
                        snippet: {
                            authorDisplayName: '@Kimnicpat',
                            textDisplay: 'The link to the written recipes is gone. I want to try making recipe 2. Anyone able to help me out and post the written recipe ?'
                        }
                    }
                }
            },
            {
                snippet: {
                    topLevelComment: {
                        snippet: {
                            authorDisplayName: '@JimmyHeller',
                            textDisplay: 'I don\'t know why you talked so fast on it! You know there is no limit for it right?'
                        }
                    }
                }
            }
        ]
    })
});

test('fetchYouTubeComments should fetch comments with the correct URL', async () => {
    const videoId = 'LSYEnH5fGfk';
    await fetchYouTubeComments(videoId);

    expect(fetch).toHaveBeenCalledWith(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyCB3qbGjQvnioKgkvGKGLvC261taR8tejE&maxResults=30`
    );
});
