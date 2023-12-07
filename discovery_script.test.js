const { fetchAPI, fetchYouTubeAPI } = require('./discovery_script');

describe('fetchYouTubeAPI', () => {
    test('should fetch YouTube API data', async () => {
        document.getElementById = jest.fn(() => ({ classList: { remove: jest.fn() }, innerHTML: '' }));
        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ items: [] }) }));

        await fetchYouTubeAPI('testQuery');

        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('testQuery'));
        expect(document.getElementById).toHaveBeenCalledWith('youtubeResults');
    });
});