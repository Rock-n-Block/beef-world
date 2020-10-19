import { withFormik } from 'formik';
import SignInForm from '../components/SignInForm'
import validateForm from '../../../utils/validate'

import { userActions, modalActions } from '../../../redux/actions';
import store from '../../../redux/store';


export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: true, values, errors })

        return errors;
    },

    handleSubmit: (values, { setErrors }) => {
        store.dispatch(userActions.signIn(values)).then(res => {
            store.dispatch(modalActions.toggleSignInModal(false))
        })
            .catch(err => {
                setErrors({
                    email: 'Incorrect login or password',
                    password: 'Incorrect login or password'
                })
            })
    },

    displayName: 'SignInForm'
})(SignInForm)