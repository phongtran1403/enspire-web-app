import { Carousel, Image, Layout } from "antd";
import classNames from "classnames/bind";
import { useMemo } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from 'react-router';
import { isUserLoggedIn } from "utils";
import Header from "../header";
import style from './index.module.scss';

const cx = classNames.bind(style);
const { Content } = Layout
const NOT_AUTHEN = ['blog']
const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
export default function PublicLayout({ children }) {
    const location = useLocation()

    const shouldAuthen = useMemo(() => NOT_AUTHEN.includes(location.pathname), [location.pathname])

    if (isUserLoggedIn() && shouldAuthen) {
        return <Navigate to='/' />
    }
    return (
        <Layout className={cx("layout")}>
            <Header />

            <Content className={cx('content')}>
                {/* {children} */}

                <Outlet />
            </Content>
        </Layout>
    )
}