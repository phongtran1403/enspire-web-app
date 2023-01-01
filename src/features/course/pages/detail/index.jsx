import { AppstoreOutlined, BarsOutlined, BookOutlined, CommentOutlined, DeleteFilled, EditFilled, FileTextOutlined, HomeOutlined, LockFilled, SettingFilled, ShoppingCartOutlined, ShoppingFilled, StarOutlined } from '@ant-design/icons'
import { Avatar, Badge, Breadcrumb, Button, Card, Col, Divider, Image, InputNumber, List, Modal, Rate, Row, Space, Tabs, Tooltip, Typography } from 'antd'
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
import { useDispatch } from 'react-redux'
import { addToCart } from 'features/cart/cartSlice'
import ModalAddEditLesson from './ModalAddEditLesson'
import lessonApi from 'api/lesson'
import moment from 'moment'
import LessonDetail from 'features/lesson'
import { sortBy } from 'lodash'


const cx = classNames.bind(style)
export default function DetailCourse() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [course, setCourse] = useState(null)
    const [lesson, setLesson] = useState(null)
    const [listLesson, setListLesson] = useState([])
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenLesson, setIsOpenLesson] = useState(false)
    const [isOpenExs, setIsOpenExs] = useState(false)
    const [isOpenDeleteLes, setIsOpenDeleteLes] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listCate, setListCate] = useState([false])
    const [amountCourse, setAmountCourse] = useState(1)

    const fetchCourse = async () => {
        try {
            const data = await courseApi.getDetail({
                idCourse: id,
                idUser: getUser().userId
            })
            setCourse(data)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchLesson = async () => {
        try {
            const { lessonByDay } = await lessonApi.getList(id)
            const sort = sortBy(lessonByDay, ['dayNumber']).reverse()
            setListLesson(sort)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const listInfo = useMemo(() => [
        { label: 'Teacher', value: course?.teacherName },
        { label: 'Category', value: course?.categoryCourse?.categoryCourseName },
        { label: 'Lesson', value: listLesson.length },
        { label: 'Purchases', value: 0 },
    ], [course])

    const onChangeAmount = (value) => {
        setAmountCourse(value)
    }

    const onAddToCart = () => {
        const { id, courseName, imgCourse, price, discount } = course
        dispatch(addToCart({
            amount: amountCourse,
            id,
            courseName,
            imgCourse,
            price,
            discount,
        }))
    }

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

    const onOpenAddLesson = () => {
        setIsOpenLesson(true)
        setLesson(null)
    }

    const onOpenEditLesson = (les) => {
        setIsOpenLesson(true)
        setLesson(les)
    }

    const onOpenExs = (les) => {
        setLesson(les)
        setIsOpenExs(true)
    }

    const handleSubmitLesson = async (values) => {
        try {
            setLoading(true)
            values.day = moment(values.day).format('YYYY-MM-DD')
            values.courseId = id
            if (lesson) {
                if (values.image && values.image.length > 0 && values.image[0].uid !== 'old') {
                    const { url } = await handleUploadImage(values.image);
                    values.imgLesson = url;
                } else {
                    values.imgLesson = lesson?.imgLesson;
                }
                if (values.video && values.video.length > 0 && values.image[0].uid !== 'old') {
                    const { url } = await handleUploadImage(values.video);
                    values.video = url;
                } else {
                    values.video = lesson?.video;

                }
                delete values.image
                delete values.video
                values.id = lesson.id
                await lessonApi.update(values)
            } else {
                if (values.image) {
                    const { url } = await handleUploadImage(values.image);
                    values.imgLesson = url;
                }

                const { url } = await handleUploadImage(values.video);
                values.video = url;
                delete values.image
                await lessonApi.add(values)
            }
            toast.success(lesson ? 'Edit Lesson Success!' : 'Add Lesson Success')
            fetchLesson()
            setIsOpenLesson(false)
        } catch (error) {
            toast.error('Lesson Existed! Please choose another day')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteLesson = async () => {
        try {
            setLoading(true)
            await lessonApi.delete(lesson.id)
            toast.success('Delete Lesson Success!')
            fetchLesson()
            setIsOpenDeleteLes(false)
        } catch (error) {
            toast.error("Delete Failed")
        } finally {
            setLoading(false)
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

    const handleDelete = async () => {
        try {
            setLoading(true)
            await courseApi.delete(id)
            toast.success('Delete Course Success!')
            setIsOpenDelete(false)
            navigate('/course')
        } catch (error) {
            toast.error("Delete Failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourse()
        fetchLesson()
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
                                <h2>{formatVND(calcPriceDiscount(course?.price, course?.discount))}</h2>

                            </div>
                            <Divider />
                            <Space style={{ width: '100%' }} >
                                {
                                    getUser().roleId == 1 ?
                                        <>
                                            <Button type='primary' size='large' block icon={<SettingFilled />} onClick={() => setIsOpenEdit(true)}>
                                                Edit Course
                                            </Button>
                                            <Button type='primary' danger size='large' block icon={<DeleteFilled />} onClick={() => setIsOpenDelete(true)}>
                                                Delete Course
                                            </Button>
                                        </> :
                                        <>
                                            <InputNumber min={1} value={amountCourse} onChange={onChangeAmount} />
                                            <Button type='primary' size='large' icon={<ShoppingCartOutlined />} onClick={onAddToCart}>
                                                Add to Cart
                                            </Button>
                                        </>
                                }
                            </Space>
                            <Divider />
                            <List
                                bordered
                                dataSource={listInfo}
                                renderItem={(item) => (
                                    <List.Item>
                                        {item.label}:{' ' + item.value}
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Badge.Ribbon>
                </Col>
                <Col span={14}>
                    <Card>
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
                                        <>
                                            <Button type='primary' size="large" onClick={onOpenAddLesson}>Add Lesson</Button>
                                            <List
                                                dataSource={listLesson}
                                                renderItem={item => (
                                                    <List.Item actions={
                                                        getUser()?.roleId != 1 ?
                                                            [<LockFilled key='lock' />] :
                                                            [
                                                                <Button key='edit' icon={<EditFilled />} onClick={() => onOpenEditLesson(item)} />,
                                                                <Button danger key='delete' icon={<DeleteFilled />} onClick={() => {
                                                                    setIsOpenDeleteLes(true)
                                                                    setLesson(item)
                                                                }} />
                                                            ]
                                                    }>
                                                        <List.Item.Meta
                                                            avatar={
                                                                <Avatar src={item.imgLesson} />
                                                            }
                                                            title={<a onClick={() => onOpenExs(item)} >{item.title}</a>}
                                                            description={'Day ' + item.dayNumber}
                                                        />
                                                    </List.Item>
                                                )} />
                                        </>
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
            <Modal
                width={400}
                open={isOpenDelete}
                title='Delete Course'
                onCancel={() => setIsOpenDelete(false)}
                footer=''
            >
                <div>Do you want to delete this course?</div>
                <Space className={cx('del-btns')}>
                    <Button loading={loading} type='primary' onClick={handleDelete}>Yes</Button>
                    <Button loading={loading} onClick={() => setIsOpenDelete(false)}>Cancel</Button>
                </Space>
            </Modal>
            <Modal
                width={400}
                open={isOpenDeleteLes}
                title='Delete Lesson'
                onCancel={() => setIsOpenDeleteLes(false)}
                footer=''
            >
                <div>Do you want to delete this lesson?</div>
                <Space className={cx('del-btns')}>
                    <Button loading={loading} type='primary' onClick={handleDeleteLesson}>Yes</Button>
                    <Button loading={loading} onClick={() => setIsOpenDeleteLes(false)}>Cancel</Button>
                </Space>
            </Modal>
            <ModalAddEditLesson
                open={isOpenLesson}
                handleSubmit={handleSubmitLesson}
                handleClose={() => setIsOpenLesson(false)}
                selected={lesson}
                loading={loading} />
            <LessonDetail open={isOpenExs} lesson={lesson} onClose={() => setIsOpenExs(false)} />
        </div>
    )
}
