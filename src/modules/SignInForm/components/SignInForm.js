import React from 'react';
import { Form, Input } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'



const SignInForm = props => {
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

    return (
        <div className="m-form">

            {/* <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        hasFeedback
                        name="email"
                        validateStatus={validateField('email', touched, errors)}
                        help={!touched.email ? false : errors.email}
                    >
                        <Input
                            id="email"
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="E-mail"
                            size="large"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        name="fullname"
                        hasFeedback
                        validateStatus={validateField('fullname', touched, errors)}
                        help={!touched.fullname ? false : errors.fullname}
                    >
                        <Input id="fullname" type="fullname"
                            onChange={handleChange}
                            onBlur={handleBlur} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Ваше имя" size="large" />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        name="password"
                        validateStatus={validateField('password', touched, errors)}
                        help={!touched.password ? false : errors.password}
                    >
                        <Input
                            id="password"
                            type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Пароль"
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
                    >
                        <Input
                            id="confirm"
                            type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Повторить пароль"
                            size="large"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" onClick={handleSubmit}>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            </Button>
                    </Form.Item>
                    <Link disabled={isSubmitting} onClick={handleSubmit} className="auth__register-link" to="/">
                        Войти в аккаунт
                            </Link>
                </Form> */}
        </div>
    )
}
export default SignInForm;