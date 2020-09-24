import React from 'react';
import { Form, Input, Button } from 'antd'
import { useDispatch } from 'react-redux';
import { modalActions } from '../../../redux/actions';

import fbImg from '../../../assets/img/social/fb-w.svg';
import twImg from '../../../assets/img/social/tw-w.svg';
import googleImg from '../../../assets/img/social/google.svg';



const SignUpForm = props => {
    const dispatch = useDispatch();

    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
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
        <div className="m-form">
            <div className="m-form__title">Sign up</div>
            <div className="m-form__descr">With your social network</div>
            <div className="m-form__socials">
                <div className="m-form__socials-item m-form__socials-item--fb">
                    <img src={fbImg} alt="" />
                </div>
                <div className="m-form__socials-item m-form__socials-item--tw">
                    <img src={twImg} alt="" />
                </div>
                <div className="m-form__socials-item m-form__socials-item--google">
                    <img src={googleImg} alt="" />
                </div>
            </div>
            <div className="m-form__decor">
                <span>or</span>
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    hasFeedback
                    name="fullname"
                    validateStatus={validateField('fullname', touched, errors)}
                    help={!touched.fullname ? false : errors.fullname}
                >
                    <Input
                        id="fullname"
                        className="m-form__input"
                        placeholder="User Name"
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
                >
                    <Input
                        id="email"
                        className="m-form__input"
                        placeholder="E-mail"
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
                >
                    <Input
                        id="password"
                        className="m-form__input"
                        type="password"
                        placeholder="Password"
                        size="large"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" className="btn m-form__btn" htmlType="submit" onClick={handleSubmit}>
                        Create your account
                            </Button>
                </Form.Item>
                <div className="m-form__link">Already have an account? <span onClick={handleSignIn}>Sign in</span></div>
            </Form>
        </div>
    )
}
export default SignUpForm;