import React from 'react';
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux';


const SignUpForm = props => {
    const dispatch = useDispatch();

    const {
        username,
        email,
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

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            layout="vertical"
        >
            <Form.Item
                name="username"
                label="Username"
                className="profile__form-item"
                validateStatus={validateField('username', touched, errors)}
                help={!touched.username ? false : errors.username}
            >
                <Input
                    id="username"
                    className="profile__form-input"
                    placeholder="Your Username"
                    size="large"
                    defaultValue={username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </Form.Item>
            <Form.Item
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
                    defaultValue={email}
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
                name="confirm_password"
                validateStatus={validateField('confirm_password', touched, errors)}
                help={!touched.confirm_password ? false : errors.confirm_password}
                className="profile__form-item profile__form-item--password"
            >
                <Input
                    id="confirm_password"
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