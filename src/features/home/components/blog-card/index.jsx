import { Avatar, Button } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function BlogCard({ info: { img, title, content } }) {
    return (
        <div className={cx('blog-course-card')}>
            <Avatar src={img} size={250} />
            <div className={cx('title')}>{title}</div>
            <div className={cx('content')}>{content}</div>
            <Button size='large' type='primary' shape='round'>
                View Detail
            </Button>
        </div>
    )
}
