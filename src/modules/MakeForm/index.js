import { withFormik } from 'formik';
import { Make } from '../../components'
import validateForm from '../../utils/validate'
import React from 'react';

export default (props) => {
    const FormWithFormik = withFormik({
        enableReinitialize: true,
        mapPropsToValues: () => (props.type === 'topic' ?
            {
                link: '',
                first_oponent: '',
                second_oponent: '',
                title: '',
                descr: '',
                is_right_side: ''
            } :
            {
                link: '',
                title: '',
                descr: '',
            }
        ),
        validate: values => {
            let errors = {};

            validateForm({ isAuth: false, values, errors })

            return errors;
        },

        handleSubmit: (values, { props }) => {
            console.log(values)

            const postData = {}
            if (props.type === 'topic') {
                postData.right_theme = values.second_oponent
                postData.left_theme = values.first_oponent
                postData.post = {
                    title: values.title,
                    link: values.link,
                    text: values.descr,
                    is_right_side: !!(+values.is_right_side)
                }
            }

            if (props.type === 'post') {
                postData.title = values.title;
                postData.link = values.link;
                postData.text = values.descr
            }
            props.handleCreate(postData)
        },

        displayName: 'MakeForm'
    })(Make)
    return <FormWithFormik {...props} />;
}

