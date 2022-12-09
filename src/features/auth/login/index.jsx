import { Button, Form, Input, Spin } from 'antd'
import classNames from 'classnames/bind'
import { FIELD_REQUIRED } from 'constants'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import _get from "lodash/get";
import { toast } from 'react-toastify'

import style from '../index.module.scss'
import authApi from 'api/auth'
import { setHeader } from 'api/axiosService'
import { ENSPIRE_TOKEN, ENSPIRE_USER } from 'constants/'
import imgCloudApi from 'api/cloudinary'
import accountApi from 'api/account'

const cx = classNames.bind(style)

export default function LoginPage() {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [isLogging, setIsLogging] = useState(false)

    const handleSubmit = async (values) => {
        try {
            setIsLogging(true)
            const formData = new FormData()
            formData.append('username', values.username);
            formData.append('password', values.password);

            const { access_token } = await authApi.login(formData)
            if (access_token) {

                setHeader('Authorization', `Bearer ${access_token}`);
                if (typeof user !== 'undefined') {
                    toast.error('Username or password is incorrect')
                    return;
                }
                localStorage.setItem(ENSPIRE_TOKEN, access_token);
                setTimeout(async () => {
                    const user = await accountApi.getAccByUsername({
                        userName: values.username
                    })
                    toast.success('Login success')
                    localStorage.setItem(ENSPIRE_USER, JSON.stringify(user));
                    navigate('/course')
                }, 100)
            }


        } catch (error) {
            const message = _get(error, 'response.data.msg', {});
            if (message) {
                toast.error(message)
                return;
            }
            toast.error('Wrong username or password, please check again')
        } finally {
            setIsLogging(false)
        }
    }

    const fetchUser = () => {

    }

    const fetchResource = async () => {
        try {
            await imgCloudApi.getResource()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // fetchResource()
    }, [])

    return (
        <Spin spinning={isLogging}>
            <div className={cx('container', 'container_login')}>
                <h1 className={cx('title')}>Welcome</h1>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item label="Username" name='username' rules={[
                        { required: true, message: 'Username is required' }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name='password' rules={[
                        { required: true, message: 'Password is required' }
                    ]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type="primary">Login</Button>
                    </Form.Item>
                </Form>
                <div className={cx('bottom-form')}>
                    Do not have an account?
                    <Link className={cx('link-route')} to='/register'>
                        Register now
                    </Link>
                </div>
            </div>
        </Spin>
    )
}