import axios from 'axios';
const KEY = 'AIzaSyDs_8Q1zjqL-x6UH5UgTtpxrlO-5rYAXj0';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: KEY
    }
})