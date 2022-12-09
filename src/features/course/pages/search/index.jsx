import { AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Input, Pagination, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import style from './index.module.scss'
import { debounce } from 'lodash';
import courseApi from 'api/course';
import { CardCourse } from 'components/';

const cx = classNames.bind(style)
const useCustomSearchParams = () => {
    const [search, setSearch] = useSearchParams();
    const searchAsObject = Object.fromEntries(
        new URLSearchParams(search)
    );

    return [searchAsObject, setSearch];
};

const fakeData = [
    {
        id: 1,
        courseName: 'English ...',
        imgCourse: 'http://theme-stall.com/edupress/demos/wp-content/uploads/2016/10/course_08.jpg',
        discount: 0,
        teacherName: 'Phong',
        price: 1000000
    }
]
const showTotal = (total, range) => `${range[0]}-${range[1]} of ${total} courses`
export default function CourseSearch() {
    const navigate = useNavigate()
    const [search, setSearch] = useCustomSearchParams();

    const [listCate, setListCate] = useState([])

    const onChangeName = () =>
        debounce(({ target: { value } }) => {
            setSearch({
                ...search,
                name: value
            })
        }, 500);

    const onChangeCate = (value) => {
        setSearch({
            ...search,
            category: value
        })
    }

    const fetchListCategory = async () => {
        try {
            const data = await courseApi.getListCategory()
            const options = [{ value: '', label: 'All' }]
            data.map(item => options.push({
                label: item.categoryCourseName,
                value: item.id
            }))
            setListCate(options)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        fetchListCategory()
    }, [])

    return (
        <div className={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <AppstoreOutlined />
                    <span>Course</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row className={cx('filter')} gutter={16}>
                <Col span={16}>
                    <Input defaultValue={search?.name} onChange={onChangeName()} placeholder="Course name" />
                </Col>
                <Col span={8}>
                    <Select onChange={onChangeCate} options={listCate} placeholder='Category' style={{ width: '100%' }} />
                </Col>
            </Row>
            <Row gutter={[32, 32]}>
                {
                    fakeData.map(item => (
                        <Col key={item.id} span={8}>
                            <CardCourse course={item} />
                        </Col>
                    ))
                }
                <Col span={24}>
                    <Pagination total={50} showTotal={showTotal} pageSize={9} />
                </Col>
            </Row>
        </div>
    )
}
