import { HomeOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Empty, Image, Row, Spin } from 'antd';
import courseApi from 'api/course';
import classNames from 'classnames/bind';
import { CardCourse } from 'components/';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss'

const cx = classNames.bind(style)
const { Meta } = Card;
function CourseList(props) {
    const [listCate, setListCate] = useState([])
    const [listCourse, setListCourse] = useState({
        1: [],
        2: [],
        3: []
    })
    const [loading, setLoading] = useState(false)

    const fetchListCategory = async () => {
        try {
            setLoading(true)
            const data = await courseApi.getListCategory()
            setListCate(data)
            const data1 = await courseApi.getListCourseByCate(1)
            const data2 = await courseApi.getListCourseByCate(2)
            const data3 = await courseApi.getListCourseByCate(3)
            setListCourse({
                1: data1,
                2: data2,
                3: data3,
            })
        } catch (error) {
            console.log("🚀 ~ error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchListCategory()
    }, [])

    return (
        <div className={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <HomeOutlined />
                    <span>Home</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Spin spinning={loading} size='large'>
                <Row gutter={[32, 16]}>

                    {
                        listCate.map(cate =>
                            <>
                                <Col span={24} key={cate.id}>
                                    <h2 className={cx('title')}>{cate.categoryCourseName}</h2>
                                </Col>
                                {
                                    listCourse[cate.id].length > 0 ?
                                        listCourse[cate.id].map((course, index) =>
                                            index < 4 &&
                                            <Col key={course.id} span={8}>
                                                <CardCourse course={course} refetch={fetchListCategory} />
                                            </Col>
                                        ) :
                                        <Col span={24}><Empty /></Col>
                                }
                            </>
                        )
                    }
                </Row>
            </Spin>
        </div>
    );
}

export default CourseList;