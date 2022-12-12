import { Badge, Button, Card, Divider, Modal, Space, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import LazyLoad from "react-lazyload";
import { formatVND } from "utils/";
import { DeleteOutlined, EyeOutlined, SettingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getUser } from "utils/";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { calcPriceDiscount } from "utils/";
import courseApi from "api/course";
import { ModalCourse } from "..";
import { handleUploadImage } from "utils/";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "features/cart/cartSlice";

const cx = classNames.bind(styles);
export default function CardCourse({ course, refetch, ...rest }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loadingDel, setLoadingDel] = useState(false)
    const [listCate, setListCate] = useState(false)

    const renderIcons = useCallback(() => {
        if (getUser()?.roleId == 2) {
            return [
                <EyeOutlined key='eye' onClick={() => navigate(`/course/${course?.id}`)} />,
                <ShoppingCartOutlined key="cart" onClick={onAddToCart} />,
            ]
        } else return [
            <EyeOutlined key='eye' onClick={() => navigate(`/course/${course?.id}`)} />,
            <SettingOutlined key='setting' onClick={() => setIsOpenEdit(true)} />,
            <DeleteOutlined key='delete' onClick={() => setIsOpenDelete(true)} />
        ]
    }, [course?.id])

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

    const onAddToCart = () => {
        const { id, courseName, imgCourse, price, discount } = course
        dispatch(addToCart({
            amount: 1,
            id,
            courseName,
            imgCourse,
            price,
            discount,

        }))
    }

    const handleDelete = async () => {
        try {
            setLoadingDel(true)
            await courseApi.delete(course.id)
            toast.success('Delete success')
            refetch && refetch()
        } catch (error) {
            toast.error('Delete course failed')
        } finally {
            setLoadingDel(false)
        }
    }

    const handleSubmit = async (values) => {
        try {
            setLoadingEdit(true)
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
            await courseApi.update(course.id, values)
            toast.success('Edit Course Success!')
            navigate('/course/' + course.id)
            setIsOpenEdit(false)
        } catch (error) {
            toast.error('Edit Failed!')
        } finally {
            setLoadingEdit(false)
        }
    }

    useEffect(() => {
        fetchListCategory()
    }, [])

    return (
        <div className={cx("card-course")}>
            <Badge.Ribbon color='red' text={course.discount + '%'} >
                <Card
                    cover={
                        <LazyLoad once>
                            <img alt="course-img" src={course.imgCourse} />
                        </LazyLoad>
                    }
                    hoverable
                    actions={renderIcons()}
                    {...rest}>
                    <div className={cx('content')}>
                        <h3>{course.courseName}</h3>
                        <h4>Teacher: {course.teacherName}</h4>
                        <Divider />
                        {course?.discount > 0 && <Typography.Text delete>{formatVND(course?.price)}</Typography.Text>}
                        <h2>{formatVND(calcPriceDiscount(course?.price, course?.discount))}</h2>
                    </div>
                </Card>
            </Badge.Ribbon >
            <ModalCourse
                isOpen={isOpenEdit}
                onCancel={() => setIsOpenEdit(false)}
                onSubmit={handleSubmit}
                loading={loadingEdit}
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
                    <Button loading={loadingDel} type='primary' onClick={handleDelete}>Yes</Button>
                    <Button loading={loadingDel} onClick={() => setIsOpenDelete(false)}>Cancel</Button>
                </Space>
            </Modal>
        </div>
    )
}