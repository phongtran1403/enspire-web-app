import { Badge, Button, Dropdown, Image, Input, Layout, Menu } from "antd"
import classNames from "classnames/bind"
import { DownOutlined, HistoryOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"
import style from './index.module.scss'
import React, { useEffect, useState } from "react"
import { removeHeader } from "api/axiosService"
import { ENSPIRE_TOKEN, ENSPIRE_USER } from "constants/"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from 'assets/images/logo-light.png'
import { useDispatch, useSelector } from "react-redux"
import { getListCart, selectAmountCart } from "features/cart/cartSlice"
import { selectInfo } from "features/profile/profileSlice"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const amountCart = useSelector(selectAmountCart)
    const info = useSelector(selectInfo)

    const [keyWord, setKeyWord] = useState('')

    const handleLogout = () => {
        removeHeader('Authorization')
        localStorage.removeItem(ENSPIRE_TOKEN)
        localStorage.removeItem(ENSPIRE_USER)
        navigate('/login')
    }

    const onChange = (e) => {
        setKeyWord(e.target.value)
    }

    const onSearch = (value) => {
        setKeyWord('')
        navigate(`/course/search?name=${value}`)
    }

    useEffect(() => {
        getUser()?.idUser != 1 && dispatch(getListCart())
    }, [])

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
            {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(3).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                })}
            /> */}
            {
                isUserLoggedIn() &&
                <Input.Search
                    value={keyWord}
                    onChange={onChange}
                    onSearch={onSearch}
                    placeholder="Search course"
                    allowClear
                    style={{
                        width: 200,
                    }}
                />
            }
            {
                isUserLoggedIn() && (
                    <div>
                        <Link to='/order'>
                            <Button style={{ marginRight: '1rem' }} icon={getUser()?.roleId == 1 ? <ShopOutlined /> : <HistoryOutlined />} />
                        </Link>
                        {
                            getUser().roleId != 1 && <Badge showZero count={amountCart} onClick={() => navigate('/cart')}>
                                <Button icon={<ShoppingCartOutlined />} />
                            </Badge>
                        }
                        <Dropdown overlay={menu} trigger={['click']} className={cx('user')}>
                            <Button type="primary">
                                <UserOutlined />
                                {info?.name}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                    </div>
                )
            }
        </AntHeader>
    )
}