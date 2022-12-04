import { Card, Col, Empty, Image, List, Menu, Row, Typography } from 'antd';
import blogApi from 'api/blog';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './index.module.scss'

const cx = classNames.bind(style)
const { Title, Paragraph, Text } = Typography;
export default function BlogPage() {
    const navigate = useNavigate()
    const { idCategory, idBlog } = useParams()

    const [blogs, setBlogs] = useState([])
    const [detail, setDetail] = useState(null)
    const [current, setCurrent] = useState('');

    const changeCurrent = (e) => {
        setCurrent(e.key);
        navigate(`/category/${idCategory}/blog/${e.key}`)
    }

    const fetchCategory = async () => {
        try {
            const data = await blogApi.getBlogByCate(idCategory)
            setBlogs(data.map(item => ({
                label: item.title,
                key: item.id
            })))
            // setDetail(null)
            // setCurrent('')
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchDetailBlog = async () => {
        try {
            const detailBlog = await blogApi.getDetail(idBlog)
            setDetail(detailBlog)
            setCurrent(detailBlog.id + '')
        } catch (error) {
            console.log("🚀 ~ error", error)
            setDetail(null)
        }
    }

    useEffect(() => {
        fetchCategory()
        if (idBlog) {
            fetchDetailBlog()
        }
    }, [idCategory, idBlog])

    return (
        <div className={cx('container')}>
            <Row gutter={32}>
                <Col span={6}>
                    <Card className={cx('card')}>
                        {
                            blogs.length > 0 ? <Menu onClick={changeCurrent} selectedKeys={[current]} items={blogs} /> : <Empty />
                        }
                    </Card>
                </Col>
                <Col span={18}>
                    <Card className={cx('card')}>
                        {
                            detail && (
                                <>
                                    <Image
                                        rootClassName={cx('main-img')}
                                        width="100%"
                                        src={detail.images}
                                    />
                                    <div>
                                        <Typography>
                                            <Title>{detail?.title}</Title>
                                            <Text italic mark>Created At: {detail.createTime}</Text>
                                            <Paragraph>
                                                {detail.content}
                                            </Paragraph>
                                        </Typography>
                                    </div>
                                </>
                            )
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
