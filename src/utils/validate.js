export default ({ isAuth, values, errors }) => {

    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Enter your email';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    value
                )
            ) {
                errors.email = 'Incorrect email';
            }
        },
        password: (value) => {
            if (!value) {
                errors.password = 'enter password'
            } else if (!isAuth && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) {
                errors.password = 'Password too light'
            }

        },
        username: (value) => {
            if (!value) {
                errors.username = 'Enter your name'
            }
        },
        first_oponent: (value) => {
            if (!value) {
                errors.first_oponent = 'Enter your Theme'
            }
        },
        second_oponent: (value) => {
            if (!value) {
                errors.second_oponent = 'Enter your Theme'
            }
        },
        title: (value) => {
            if (!value) {
                errors.title = 'Enter your Title'
            }
        },
        descr: (value) => {
            if (!value) {
                errors.descr = 'Enter your Description'
            }
        },
        confirm_password: (value) => {
            if (!values.password || !values.confirm_password) {
                errors.confirm_password = 'Repeat new password'
            } else if (values.password !== value) {
                errors.confirm_password = 'Пароли не совпадают'
            }
        },
        youtube_link: (value) => {
            let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            let match = value.match(regExp);

            if (!value) {
                errors.youtube_link = 'enter Youtube link'
            } else if (!(match && match[7].length == 11)) {
                errors.youtube_link = 'it is not Youtube link'
            }
        }
    }


    Object.keys(values).forEach(
        key => (rules[key] && rules[key](values[key]))
    )

}