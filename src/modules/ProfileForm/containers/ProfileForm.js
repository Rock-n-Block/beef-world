import { withFormik } from 'formik';
import ProfileForm from '../components/ProfileForm'
import validateForm from '../../../utils/validate'
import React from 'react';

export default ({ username, email }) => {
    const FormWithFormik = withFormik({
        enableReinitialize: true,
        mapPropsToValues: () => ({
            username: username,
            email: email,
            password: '',
            confirm_password: ''
        }),
        validate: values => {
            let errors = {};

            validateForm({ isAuth: false, values, errors })

            return errors;
        },

        handleSubmit: (values) => {
            console.log(values)
        },

        displayName: 'ProfileForm'
    })(ProfileForm)
    return <FormWithFormik username={username} email={email} />;
}

