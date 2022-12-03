import { Badge, Button, Dropdown, Layout, Menu } from "antd"
import classNames from "classnames/bind"
import { DownOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"

import style from './index.module.scss'
import React, { useContext, useMemo } from "react"
import { removeHeader } from "api/axiosService"
import { CLOVER_TOKEN, CLOVER_USER } from "constants/"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Context from "Context"
import { actionTypes } from "constants/reducerStore"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export default function Header() {
    const navigate = useNavigate()
    const contextValue = useContext(Context)

    const { cart } = useMemo(() => contextValue.store, [contextValue.store])
    const dispatchStore = useMemo(() => contextValue.dispatchStore, [contextValue.dispatchStore])

    const handleLogout = () => {
        removeHeader('Authorization')
        localStorage.removeItem(CLOVER_TOKEN)
        localStorage.removeItem(CLOVER_USER)
        navigate('/login')
    }

    const incremental = () => {
        dispatchStore({
            type: actionTypes.cart.update_total,
            payload: cart.total++
        })
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
                <Link to='/blog'>
                    <h2>Enspire</h2>
                </Link>
            </div>
            {
                isUserLoggedIn() ? (
                    <div>
                        <Badge count={cart.total}>
                            <Button icon={<ShoppingCartOutlined />} onClick={incremental} />
                        </Badge>
                        <Dropdown overlay={menu} trigger={['click']} className={cx('user')}>
                            <Button type="primary">
                                <UserOutlined />
                                {getUser()?.name}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                ) :
                    <Link to="/login">
                        <Button type="primary">
                            Login
                        </Button>
                    </Link>
            }
        </AntHeader>
    )
}