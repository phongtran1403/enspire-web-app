import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function NewsCard({ info: { id, title, img, content } }) {
    return (
        <div>
            <Image src={img} preview={false} />
            <div className={cx('title')}>{title}</div>
            <div className={cx('content')}>{content}</div>
        </div>
    )
}
