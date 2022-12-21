import { AppstoreOutlined, BarsOutlined, BookOutlined, CommentOutlined, DeleteFilled, FileTextOutlined, HomeOutlined, LockFilled, SettingFilled, ShoppingCartOutlined, ShoppingFilled, StarOutlined } from '@ant-design/icons'
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


const cx = classNames.bind(style)
export default function DetailCourse() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [course, setCourse] = useState(null)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
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

    const listInfo = useMemo(() => [
        { label: 'Teacher', value: course?.teacherName },
        { label: 'Category', value: course?.categoryCourse?.categoryCourseName },
        { label: 'Lesson', value: 0 },
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
        </div>
    )
}
