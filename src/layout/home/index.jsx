import { Carousel, Col, Divider, Image, Layout, Row } from "antd";
import classNames from "classnames/bind";
import { Outlet, Navigate, Link } from "react-router-dom";
import Header from "./header";
import style from './index.module.scss';
import logo from 'assets/images/logo-light.png'

const cx = classNames.bind(style);
const { Content, Footer } = Layout
export default function HomeLayout({ children }) {
    return (
        <Layout className={cx("layout")}>
            <Header />
            <Carousel autoplay>
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/095a75b40936756ace170b1448fcb83c/Banner-Website-03.jpg' />
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/390615e3666a87146f6738ae11a7010d/1400x420_trang-new.jpg' />
                <Image preview={false} src='https://enspire.edu.vn/wp-content/uploads/resized/5566287d980af32f2f93f700fd648b30/1400x420-new.jpg' />
            </Carousel>
            <Content className={cx('content')}>
                {/* {children} */}
                <Outlet />
            </Content>
            <Footer className={cx('footer')}>
                <div className={cx('footer_wrapper')}>
                    <Row>
                        <Col span={6}>
                            <Link to='/'>
                                <Image src={logo} preview={false} />
                            </Link>
                        </Col>
                        <Divider type='vertical' />
                        <Col span={14}>
                            <h2>ENSPIRE ACADEMY</h2>
                            <div>Address: 80A Láng Hạ, Đống Đa, Hà Nội</div>
                            <div>Phone: 0901 599 989</div>
                            <div>Mail: info@enspire.edu.vn</div>
                        </Col>
                    </Row>
                </div>
                <div className={cx('copy-right')}>
                    © Copyright 2022 Enspire. All rights reserved.
                </div>
            </Footer>
        </Layout>
    )
}