export default {
    share: (url) => {
        return new Promise(resolve => {
            window.FB.ui({
                display: 'popup',
                method: 'share',
                href: url,
            }, function (res) {
                resolve(res)
            });
        })
    },
    logout: () => {
        return new Promise((resolve) => {
            window.FB.logout((res) => {
                resolve(res)
            })
        })
    },
    getLoginStatus: () => {
        return new Promise((resolve, reject) => {
            window.FB.getLoginStatus((res) => {
                if (res.status === 'connected') {
                    resolve(res)
                } else {
                    reject(res)
                }
            });
        })
    },
    login: () => {
        return new Promise((resolve, reject) => {
            window.FB.login(function (res) {
                if (res.status === 'connected') {
                    resolve(res)
                } else {
                    reject(res)
                }
            });
        })
    },
    getUserPhoto: (userId) => {
        return new Promise((resolve) => {
            window.FB.api(
                `/${userId}/picture?redirect=false`,
                'GET',
                {},
                function ({ data }) {
                    resolve(data.url)
                }
            );
        })
    },
    getMe: () => {
        return new Promise((resolve) => {
            window.FB.api('/me', function ({ name }) {
                resolve(name)
            });
        })
    },
    getFacebookApi: () => {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}