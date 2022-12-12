import { DollarOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Breadcrumb, Card } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function CheckoutPage() {
    return (
        <div class={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/cart'>
                        <ShoppingCartOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <DollarOutlined />
                    <span>Checkout</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className={cx('content')}>

            </Card>
        </div>
    )
}
