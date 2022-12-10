import { AppstoreOutlined, BarsOutlined, BookOutlined, CommentOutlined, FileTextOutlined, HomeOutlined, LockFilled, SettingFilled, ShoppingFilled, StarOutlined } from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Divider, Image, List, Rate, Row, Space, Tabs, Tooltip, Typography } from 'antd'
import courseApi from 'api/course'
import classNames from 'classnames/bind'
import { ModalCourse } from 'components/'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { calcPriceDiscount } from 'utils/'
import { handleUploadImage } from 'utils/'
import { getUser } from 'utils/'
import { formatVND } from 'utils/'
import { Player } from 'video-react';
import style from './index.module.scss'
import { Comment } from '@ant-design/compatible';


const cx = classNames.bind(style)
export default function DetailCourse() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState(null)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listCate, setListCate] = useState([false])

    const fetchCourse = async () => {
        try {
            const data = await courseApi.getDetail(id)
            setCourse(data)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const listInfo = useMemo(() => [
        { label: 'Teacher', value: course?.teacherName },
        { label: 'Category', value: course?.categoryCourse?.categoryCourseName },
        { label: 'Lesson', value: 0 },
        { label: 'Rate', value: 2 },
        { label: 'Purchases', value: 0 },
    ], [course])

    const listLesson = [
        'Lesson One',
        'Lesson Two',
        'Lesson Three',
        'Lesson Four',
        'Lesson Five',
        'Lesson Six',
    ]

    const fetchListCategory = async () => {
        try {
            const data = await courseApi.getListCategory()
            setListCate(data.map(item => ({
                label: item.categoryCourseName,
                value: item.id
            })))
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            if (values.image && values.image.length > 0 && values.image[0].uid !== 'old') {
                const { url } = await handleUploadImage(values.image);
                values.imgCourse = url;
            } else {
                values.imgCourse = course?.imgCourse;
            }
            if (values.video && values.video.length > 0 && values.image[0].uid !== 'old') {
                const { url } = await handleUploadImage(values.video);
                values.introduceVideo = url;
            } else {
                values.introduceVideo = course?.introduceVideo;

            }
            delete values.image
            delete values.video
            await courseApi.update(id, values)
            toast.success('Edit Course Success!')
            fetchCourse()
            setIsOpenEdit(false)
        } catch (error) {
            toast.error('Edit Failed!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [id])

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
                    <Link to='/course/search'>
                        <AppstoreOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <BookOutlined />
                    <span>{course?.courseName}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={24} className={cx('wrapper')}>
                <Col span={8}>
                    <Badge.Ribbon color='red' text={course?.discount + '%'}>
                        <Card>
                            <Image src={course?.imgCourse} />
                            <div className={cx('price')}>
                                {course?.discount > 0 && <Typography.Text delete>{formatVND(course?.price)}</Typography.Text>}
                                <h2>{calcPriceDiscount(course?.price, course?.discount)}</h2>
                            </div>
                            <Divider />
                            <Space direction="vertical" style={{ width: '100%' }}>
                                {
                                    getUser().roleId == 1 ?
                                        <Button type='primary' size='large' block icon={<SettingFilled />} onClick={() => setIsOpenEdit(true)}>
                                            Edit Course
                                        </Button> :
                                        <Button type='primary' size='large' block icon={<ShoppingFilled />}>
                                            Buy
                                        </Button>
                                }
                            </Space>
                            <Divider />
                            <List
                                bordered
                                dataSource={listInfo}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item.label}:{' '}
                                        {
                                            item.label === 'Rate' ?
                                                <Rate value={item.value} disabled /> :
                                                item.value
                                        }
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Badge.Ribbon>
                </Col>
                <Col span={14}>
                    <Card>
                        {/* <video width="100%" controls>
                            <source src={course?.introduceVideo} type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'" />
                            Your browser does not support HTML video.
                        </video> */}
                        <Player playsInline src={course?.introduceVideo} />
                        <Divider />
                        <Typography.Paragraph>{course?.content}</Typography.Paragraph>
                        <Tabs
                            defaultActiveKey="1"
                            // onChange={onChange}
                            items={[
                                {
                                    label: (
                                        <>
                                            <BarsOutlined />
                                            <span>Lessons</span>
                                        </>
                                    ),
                                    key: '1',
                                    children: (
                                        <List
                                            dataSource={listLesson}
                                            renderItem={item => (
                                                <List.Item actions={[<LockFilled key='lock' />]}>
                                                    <Space>
                                                        <FileTextOutlined />
                                                        <Link>{item}</Link>
                                                    </Space>
                                                </List.Item>
                                            )} />
                                    ),
                                },
                                {
                                    label: (
                                        <>
                                            <CommentOutlined />
                                            <span>Reviews</span>
                                        </>
                                    ),
                                    key: '2',
                                    children: (
                                        <Comment
                                            //   actions={actions}
                                            author={<a>Han Solo</a>}
                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                                            content={
                                                <p>
                                                    We supply a series of design principles, practical patterns and high quality design
                                                    resources (Sketch and Axure), to help people create their product prototypes beautifully
                                                    and efficiently.
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title="2016-11-22 11:22:33">
                                                    <span>8 hours ago</span>
                                                </Tooltip>
                                            }
                                        />
                                    ),
                                },
                                {
                                    label: (
                                        <>
                                            <StarOutlined />
                                            <span>Rates</span>
                                        </>
                                    ),
                                    key: '3',
                                    children: (
                                        <div className={cx('rate')}>
                                            <h1>0.0</h1>
                                            <Rate disabled />
                                            <span>0 total</span>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
            <ModalCourse
                isOpen={isOpenEdit}
                onCancel={() => setIsOpenEdit(false)}
                onSubmit={handleSubmit}
                loading={loading}
                course={course}
                listCate={listCate}
            />
        </div>
    )
}