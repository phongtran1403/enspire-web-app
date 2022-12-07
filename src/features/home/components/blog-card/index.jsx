import { Avatar, Button } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'
import img from 'assets/images/null-img.png'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(style)
export default function BlogCard({ info: { id, images, blogName, content, categoryBlog: { id: idBlog } } }) {
    const navigate = useNavigate()

    return (
        <div className={cx('blog-course-card')}>
            <Avatar src={images || img} size={250} />
            <div className={cx('title')}>{blogName}</div>
            <div className={cx('content')}>{content}</div>
            <Button size='large' type='primary' shape='round' onClick={() => navigate(`/category/${idBlog}/blog/${id}`)}>
                View Detail
            </Button>
        </div>
    )
}
