import { withFormik } from 'formik';
import ProfileForm from '../components/ProfileForm'
import validateForm from '../../../utils/validate'


export default withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm: ''
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