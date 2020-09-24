import { withFormik } from 'formik';
import SignUpForm from '../components/SignUpForm'
import validateForm from '../../../utils/validate'


export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        fullname: '',
        email: '',
        password: ''
    }),
    validate: values => {
        let errors = {};

        validateForm({ isAuth: false, values, errors })

        return errors;
    },

    handleSubmit: (values) => {
        console.log(values)
    },

    displayName: 'SignUpForm'
})(SignUpForm)