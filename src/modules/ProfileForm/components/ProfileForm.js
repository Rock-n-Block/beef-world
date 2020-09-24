import React from 'react';
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../redux/actions';


const SignUpForm = props => {
    const dispatch = useDispatch();

    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;

    const validateField = (key, touched, errors) => {
        if (touched[key]) {
            if (errors[key]) {
                return 'error'
            } else {
                return 'success'
            }
        } else {
            return ''
        }
    }

    const handleSignIn = () => {
        dispatch(modalActions.toggleSignInModal(true))
        dispatch(modalActions.toggleSignUpModal(false))
    }

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            layout="vertical"
        >
            <Form.Item
                name="firstname"
                label="First Name"
                className="profile__form-item"
            >
                <Input
                    id="firstname"
                    className="profile__form-input"
                    placeholder="Your First Name"
                    size="large"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item
                name="lastname"
                label="Last Name"
                className="profile__form-item"
            >
                <Input
                    id="lastname"
                    className="profile__form-input"
                    placeholder="Your Last Name"
                    size="large"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item
                hasFeedback
                name="email"
                validateStatus={validateField('email', touched, errors)}
                help={!touched.email ? false : errors.email}
                label="Email"
                className="profile__form-item"
            >
                <Input
                    id="email"
                    className="profile__form-input"
                    placeholder="Your Email"
                    size="large"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item
                hasFeedback
                name="password"
                validateStatus={validateField('password', touched, errors)}
                help={!touched.password ? false : errors.password}
                className="profile__form-item profile__form-item--password"
            >
                <Input
                    id="password"
                    className="profile__form-input"
                    type="password"
                    placeholder="New password"
                    size="large"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item
                hasFeedback
                name="confirm"
                validateStatus={validateField('confirm', touched, errors)}
                help={!touched.confirm ? false : errors.confirm}
                className="profile__form-item profile__form-item--password"
            >
                <Input
                    id="confirm"
                    className="profile__form-input"
                    type="password"
                    placeholder="Repeat new password"
                    size="large"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" size="large" className="btn profile__form-btn" htmlType="submit" onClick={handleSubmit}>
                    SAve
                            </Button>
            </Form.Item>
        </Form>
    )
}
export default SignUpForm;