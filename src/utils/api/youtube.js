import axios from 'axios';
const KEY = 'AIzaSyA8iE-MuhylwAONwCfWZf9E1caNDpMWV6U';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: KEY
    }
})