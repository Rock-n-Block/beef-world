import { withFormik } from 'formik';
import SignUpForm from '../components/SignUpForm'
import validateForm from '../../../utils/validate'

import { userActions, modalActions } from '../../../redux/actions';
import store from '../../../redux/store';


export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: false, values, errors })

        return errors;
    },

    handleSubmit: (values, { setErrors }) => {
        store.dispatch(userActions.signUp(values)).then(res => {
            store.dispatch(userActions.signIn({
                email: values.email,
                password: values.password
            })).then(res => {
                store.dispatch(modalActions.toggleSignUpModal(false))
            })
        })
            .catch((err) => {
                console.log(err)
                setErrors(err)
            })
    },

    displayName: 'SignUpForm'
})(SignUpForm)