import { Col, Empty, Row } from 'antd'
import blogApi from 'api/blog'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { DiffCard, NewsCard } from './components'
import BlogCard from './components/blog-card'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function HomePage() {
    const [blogCourseType, setBlogCourseType] = useState([])
    const [blogDiff, setBlogDiff] = useState([])
    const [blogNews, setBlogNews] = useState([])
    const [blogIntroduce, setBlogIntro] = useState([])

    const fetchBlogsByCategory = async () => {
        try {
            const data = await blogApi.getBlogByCate(1)
            setBlogIntro(data)
            const data1 = await blogApi.getBlogByCate(2)
            setBlogCourseType(data1)
            const data2 = await blogApi.getBlogByCate(3)
            setBlogDiff(data2)
            const data3 = await blogApi.getBlogByCate(4)
            setBlogNews(data3)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        fetchBlogsByCategory()
    }, [])

    return (
        <div className={cx('container')}>
            <div className={cx('block')}>
                <h1>Blog Introduce</h1>
                <Row gutter={64}>
                    {
                        blogIntroduce.length > 0 ? blogIntroduce.map((item, index) => (
                            index < 3 && <Col key={item.id} span={8}>
                                <BlogCard info={item} />
                            </Col>
                        )) :
                            <Col span={24}><Empty /></Col>
                    }
                </Row>
                <h1>Course Types</h1>
                <Row gutter={64}>
                    {
                        blogCourseType.length > 0 ? blogCourseType.map((item, index) => (
                            index < 3 && <Col key={item.id} span={8}>
                                <BlogCard info={item} />
                            </Col>
                        )) :
                            <Col span={24}><Empty /></Col>
                    }
                </Row>
                <h1>Difference</h1>
                <Row gutter={32}>
                    {
                        blogDiff.length > 0 ? blogDiff.map((item, index) => (
                            index < 4 && <Col key={item.id} span={6}>
                                <DiffCard info={item} />
                            </Col>
                        )) :
                            <Col span={24}><Empty /></Col>
                    }
                </Row>
                <h1>News</h1>
                <Row gutter={32}>
                    {
                        blogNews.length > 0 ? blogNews.map((item, index) => (
                            index < 3 && <Col key={item.id} span={8}>
                                <NewsCard info={item} />
                            </Col>
                        )) :
                            <Col span={24}><Empty /></Col>
                    }
                </Row>
            </div>
        </div>
    )
}