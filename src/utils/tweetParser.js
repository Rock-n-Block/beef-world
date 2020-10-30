export default (url) => {
    var regExp = /https?:\/\/twitter.com\/[a-zA-Z_]{1,20}\/status\/([0-9]*)/;
    var match = url.match(regExp);
    return (match && match[1].length) ? match[1] : false;
}