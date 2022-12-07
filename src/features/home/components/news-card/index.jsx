import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'
import img from 'assets/images/null-img.png'
import { Link, useNavigate } from 'react-router-dom'

const cx = classNames.bind(style)
export default function NewsCard({ info: { id, blogName, images, content, categoryBlog: { id: idBlog } } }) {
    return (
        <Link to={`/category/${idBlog}/blog/${id}`}>
            <Image src={images || img} height={250} preview={false} />
            <div className={cx('title')}>{blogName}</div>
            <div className={cx('content')}>{content}</div>
        </Link>
    )
}
