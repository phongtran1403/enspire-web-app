import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import React from 'react'
import { DiffCard, NewsCard } from './components'
import BlogCard from './components/blog-card'
import style from './index.module.scss'

const cx = classNames.bind(style)
const blogCourses = [
    {
        id: 1,
        img: 'https://enspire.edu.vn/wp-content/uploads/TimeStudio-171205-017-1-01-1.png',
        title: 'Happy Kids',
        content: 'Khóa học dành cho học sinh từ 3 đến 6 tuổi. Gồm 3 cấp độ, mỗi cấp độ học trong 108 giờ Học sinh làm quen và sử dụng 200 từ mới, luyện kĩ năng đọc và viết đơn giản.'
    },
    {
        id: 2,
        img: 'https://enspire.edu.vn/wp-content/uploads/TimeStudio-171205-017-1-01-3.png',
        title: 'Smart Kids',
        content: 'Khóa học dành cho học sinh từ 6 đến 10 tuổi. Gồm 4 cấp độ, mỗi cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 300 từ mới, có kỹ năng đọc viết đoạn văn ngắn.'
    },
    {
        id: 3,
        img: 'https://enspire.edu.vn/wp-content/uploads/TimeStudio-171205-017-1-01.png',
        title: 'Super Kids',
        content: 'Khóa học dành cho học sinh từ 10 đến 12 tuổi. Một cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 500 từ mới, có kỹ năng đọc viết thành thạo.'
    },
]
const diffCourse = [
    {
        id: 1,
        img: 'https://enspire.edu.vn/wp-content/images/col0-h.gif',
        title: 'Happy Kids',
        content: 'Khóa học dành cho học sinh từ 3 đến 6 tuổi. Gồm 3 cấp độ, mỗi cấp độ học trong 108 giờ Học sinh làm quen và sử dụng 200 từ mới, luyện kĩ năng đọc và viết đơn giản.'
    },
    {
        id: 2,
        img: 'https://enspire.edu.vn/wp-content/images/col1-h.gif',
        title: 'Smart Kids',
        content: 'Khóa học dành cho học sinh từ 6 đến 10 tuổi. Gồm 4 cấp độ, mỗi cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 300 từ mới, có kỹ năng đọc viết đoạn văn ngắn.'
    },
    {
        id: 3,
        img: 'https://enspire.edu.vn/wp-content/images/col2-h.gif',
        title: 'Super Kids',
        content: 'Khóa học dành cho học sinh từ 10 đến 12 tuổi. Một cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 500 từ mới, có kỹ năng đọc viết thành thạo.'
    },
    {
        id: 4,
        img: 'https://enspire.edu.vn/wp-content/images/col3-h.gif',
        title: 'Super Kids',
        content: 'Khóa học dành cho học sinh từ 10 đến 12 tuổi. Một cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 500 từ mới, có kỹ năng đọc viết thành thạo.'
    },
]
const newsBlog = [
    {
        id: 1,
        img: 'https://enspire.edu.vn/wp-content/uploads/161233818_237407081428986_2211399652200456795_o.jpg',
        title: 'ENSPIRE ACADEMY TẠI TIỂU HỌC THÁI THỊNH VÀ NAM THÀNH CÔNG HÀ NỘI',
        content: 'Khóa học dành cho học sinh từ 3 đến 6 tuổi. Gồm 3 cấp độ, mỗi cấp độ học trong 108 giờ Học sinh làm quen và sử dụng 200 từ mới, luyện kĩ năng đọc và viết đơn giản.'
    },
    {
        id: 2,
        img: 'https://enspire.edu.vn/wp-content/uploads/161523759_235086968327664_4706038201341649109_o.jpg',
        title: 'SINH TRẮC VÂN TAY – KHÁM PHÁ TIỀM NĂNG CỦA TRẺ CÙNG ENSPIRE ACADEMY',
        content: 'Khóa học dành cho học sinh từ 6 đến 10 tuổi. Gồm 4 cấp độ, mỗi cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 300 từ mới, có kỹ năng đọc viết đoạn văn ngắn.'
    },
    {
        id: 3,
        img: 'https://enspire.edu.vn/wp-content/uploads/z2365811367882_050eb7a1bf8cec4d320427f79b4b35d9.jpg',
        title: 'Happy Women’s Day at Enspire Academy',
        content: 'Khóa học dành cho học sinh từ 10 đến 12 tuổi. Một cấp độ học trong 116 giờ. Học sinh làm quen và sử dụng 500 từ mới, có kỹ năng đọc viết thành thạo.'
    },
]
export default function HomePage() {
    return (
        <div className={cx('container')}>
            <div className={cx('block')}>
                <h1>Course Types</h1>
                <Row gutter={64}>
                    {
                        blogCourses.map(item => (
                            <Col key={item.id} span={8}>
                                <BlogCard info={item} />
                            </Col>
                        ))
                    }
                </Row>
                <h1>Difference</h1>
                <Row gutter={32}>
                    {
                        diffCourse.map(item => (
                            <Col key={item.id} span={6}>
                                <DiffCard info={item} />
                            </Col>
                        ))
                    }
                </Row>
                <h1>News</h1>
                <Row gutter={32}>
                    {
                        newsBlog.map(item => (
                            <Col key={item.id} span={8}>
                                <NewsCard info={item} />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </div>
    )
}