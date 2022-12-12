import classNames from "classnames/bind"
import { Badge, Button, Dropdown, Image, Layout, Menu, Space, Tabs } from "antd"
import { ApartmentOutlined, BookOutlined, InfoCircleOutlined, LoginOutlined, RadarChartOutlined, SnippetsOutlined } from '@ant-design/icons'
import { getUser, isUserLoggedIn } from "utils"
import style from './index.module.scss'
import React, { useContext, useEffect, useMemo, useState } from "react"
import { ENSPIRE_TOKEN, ENSPIRE_USER } from "constants/"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import logo from 'assets/images/logo-dark.png'
import blogApi from "api/blog"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout
export const menuHomeOptions = [
    {
        label: (
            <Space>
                <InfoCircleOutlined />
                <span>Introduce</span>
            </Space>
        ),
        key: '1',
    },
    {
        label: (
            <Space>
                <BookOutlined />
                <span>Course Types</span>
            </Space>
        ),
        key: '2',
    },
    {
        label: (
            <Space>
                <RadarChartOutlined />
                <span>Differences</span>
            </Space>
        ),
        key: '3',
    },
    {
        label: (
            <Space>
                <SnippetsOutlined />
                <span>News</span>
            </Space>
        ),
        key: '4',
    },
    {
        label: (
            <Space>
                <LoginOutlined />
                <span>Go to Course</span>
            </Space>
        ),
        key: '5',
    },
];
export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const [selected, setSelected] = useState('')

    const onChangeTab = (key) => {
        setSelected(key)
        if (Number(key) !== 5) {
            navigate('/category/' + key)
        } else {
            navigate('/course')
        }
    }

    useEffect(() => {
        switch (location.pathname) {
            case '/category/1':
                setSelected('1')
                break;
            case '/category/2':
                setSelected('2')
                break;
            case '/category/3':
                setSelected('3')
                break;
            case '/category/4':
                setSelected('4')
                break;
            default:
                break;
        }
    }, [location.pathname])
    return (
        <AntHeader className={cx('container')}>
            <div className={cx('brand')}>
                <Link to='/'>
                    <Image src={logo} height={60} preview={false} />
                </Link>
            </div>
            <Tabs
                activeKey={selected}
                onChange={onChangeTab}
                items={menuHomeOptions}
            />
            {/* <Menu className={cx('menu')} mode="horizontal" items={menuHomeOptions} /> */}
        </AntHeader>
    )
}