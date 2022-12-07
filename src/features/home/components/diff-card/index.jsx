import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import style from './index.module.scss'
import img from 'assets/images/null-img.png'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(style)
export default function DiffCard({ info: { id, blogName, images, categoryBlog: { id: idBlog } } }) {
    const navigate = useNavigate()

    return (
        <div>
            {/* <div className={cx('title')}>{title}</div> */}
            <Image height={250} src={images || img} preview={false} />
            <Button className={cx('btn')} onClick={() => navigate(`/category/${idBlog}/blog/${id}`)}>
                View Detail
                <ArrowRightOutlined />
            </Button>
        </div>
    )
}
