import { Layout } from "antd";
import classNames from "classnames/bind";
import { Navigate, Outlet } from "react-router-dom";
import { getUser, isUserLoggedIn } from "utils";
import { Sidebar } from "./components";
import Header from '../header'
import style from './index.module.scss'
import { useState } from "react";

const cx = classNames.bind(style)
const { Content, Footer } = Layout
export default function PrivateLayout() {
    const [selectedTab, setSelectedTab] = useState(['blog']);

    if (!isUserLoggedIn()) {
        return <Navigate to='/' />
    }

    return (
        <Layout className={cx('layout')}>
            <Header />
            <Layout>
                {
                    getUser().role === 1 && <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                }
                <Content className={cx('content')}>
                    <Outlet />
                </Content>
                <Footer>
                    <div>
                        footer
                    </div>
                </Footer>
            </Layout>
        </Layout>
    )
}