import { FloatButton, Layout, Tooltip } from "antd";
import classNames from "classnames/bind";
import { Navigate, Outlet } from "react-router-dom";
import { getUser, isUserLoggedIn } from "utils";
import { Sidebar } from "./components";
import Header from '../header'
import style from './index.module.scss'
import { useState } from "react";
import { DiffOutlined, FileTextOutlined } from "@ant-design/icons";

const cx = classNames.bind(style)
const { Content, Footer } = Layout
export default function PrivateLayout() {
    const [selectedTab, setSelectedTab] = useState(['blog']);

    if (!isUserLoggedIn()) {
        return <Navigate to='/login' />
    }

    return (
        <Layout className={cx('layout')}>
            <Header />
            {
                getUser()?.roleId == 1 &&
                <Tooltip title='Create New Course'>
                    <FloatButton
                        icon={<DiffOutlined />}
                        type="primary"
                        style={{
                            right: 50,
                        }}
                    />
                </Tooltip>
            }
            <Layout>
                <Content className={cx('content')}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}