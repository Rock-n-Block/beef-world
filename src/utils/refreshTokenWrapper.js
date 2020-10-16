import { userApi } from './api';

export default (promise, methodFulfilled, methodRejected, ...args) => {
    return new Promise((resolve, reject) => {
        promise(...args)
            .then((data) => {
                resolve(data)
                methodFulfilled && methodFulfilled()
            })
            .catch(() => {
                if (localStorage.refresh_token) {
                    userApi.refreshToken().then(() => {

                        promise(...args)
                            .then((data) => {
                                resolve(data)
                                methodFulfilled && methodFulfilled()
                            })
                            .catch(err => {
                                reject(err)
                            })

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