import { Badge, Button, Dropdown, Image, Layout, Menu } from "antd"
import classNames from "classnames/bind"
import { ApartmentOutlined, BookOutlined, InfoCircleOutlined, LoginOutlined, RadarChartOutlined, SnippetsOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"
import style from './index.module.scss'
import React, { useContext, useEffect, useMemo, useState } from "react"
import { CLOVER_TOKEN, CLOVER_USER } from "constants/"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from 'assets/images/logo-dark.png'
import blogApi from "api/blog"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export const menuHomeOptions = [
    {
        label: <Link to='/category/1'>Introduce</Link>,
        key: '1',
        icon: <InfoCircleOutlined />,
    },
    {
        label: <Link to='/category/2'>Course Types</Link>,
        key: '2',
        icon: <BookOutlined />,
    },
    {
        label: <Link to='/category/3'>Difference</Link>,
        key: '3',
        icon: <RadarChartOutlined />,
    },
    {
        label: <Link to='/category/4'>News</Link>,
        key: '4',
        icon: <SnippetsOutlined />,
    },
    {
        label: <Link to='/course'>Go to Course</Link>,
        key: 'internal',
        icon: <LoginOutlined />
    },
];
export default function Header() {
    const navigate = useNavigate()

    return (
        <AntHeader className={cx('container')}>
            <div className={cx('brand')}>
                <Link to='/'>
                    <Image src={logo} height={60} preview={false} />
                </Link>
            </div>
            <Menu className={cx('menu')} mode="horizontal" items={menuHomeOptions} />
        </AntHeader>
    )
}