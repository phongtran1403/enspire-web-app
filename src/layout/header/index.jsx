import { Badge, Button, Dropdown, Image, Layout, Menu } from "antd"
import classNames from "classnames/bind"
import { DownOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"
import style from './index.module.scss'
import React from "react"
import { removeHeader } from "api/axiosService"
import { CLOVER_TOKEN, CLOVER_USER } from "constants/"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from 'assets/images/logo-light.png'

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export default function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        removeHeader('Authorization')
        localStorage.removeItem(CLOVER_TOKEN)
        localStorage.removeItem(CLOVER_USER)
        navigate('/login')
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to='/profile'>
                    Profile
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={handleLogout}>
                <span className={cx('logout')}>
                    Logout
                    <LogoutOutlined />
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <AntHeader className={cx('container')}>
            <div className={cx('brand')}>
                <Link to='/'>
                    <Image src={logo} height={60} preview={false} />
                </Link>
            </div>
            {
                isUserLoggedIn() && (
                    <div>
                        <Badge count={5}>
                            <Button icon={<ShoppingCartOutlined />} />
                        </Badge>
                        <Dropdown overlay={menu} trigger={['click']} className={cx('user')}>
                            <Button type="primary">
                                <UserOutlined />
                                {getUser()?.name}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                )
            }
        </AntHeader>
    )
}