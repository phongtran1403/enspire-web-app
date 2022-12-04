import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function DiffCard({ info: { id, title, img } }) {
    return (
        <div>
            {/* <div className={cx('title')}>{title}</div> */}
            <Image src={img} preview={false} />
            <Button className={cx('btn')}>
                View Detail
                <ArrowRightOutlined />
            </Button>
        </div>
    )
}
