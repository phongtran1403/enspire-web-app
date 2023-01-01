import { HistoryOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import { Link } from 'react-router-dom'
import { getUser } from 'utils/'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function OrderFeature() {
    return (
        <div className={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {getUser()?.roleId == 1 ? <ShopOutlined /> : <HistoryOutlined />}
                    <span>List Order</span>
                </Breadcrumb.Item>
            </Breadcrumb>

        </div>
    )
}
