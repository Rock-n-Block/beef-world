import { withFormik } from 'formik';
import SignInForm from '../components/SignInForm'
import validateForm from '../../../utils/validate'


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

    handleSubmit: (values) => {
        console.log(values)
    },

    displayName: 'SignInForm'
})(SignInForm)