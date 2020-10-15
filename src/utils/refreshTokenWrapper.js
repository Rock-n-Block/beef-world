import { userApi } from './api';

export default (promise, methodFulfilled, methodRejected, ...args) => {
    return new Promise((resolve, reject) => {
        promise(...args)
            .then((data) => {
                resolve(data)
            })
            .catch(() => {
                if (localStorage.refresh_token) {
                    userApi.refreshToken().then(() => {

                        promise(...args)
                            .then((data) => {
                                resolve(data)
                            })
                            .catch(err => {
                                reject(err)
                            })

                        methodFulfilled && methodFulfilled()
                    })
                        .catch(() => {
                            methodRejected && methodRejected()
                        })
                } else {
                    methodRejected && methodRejected()
                }
            })
    })
}