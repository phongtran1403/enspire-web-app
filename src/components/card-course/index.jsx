import { Badge, Card, Divider, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import LazyLoad from "react-lazyload";
import { formatVND } from "utils/";
import { CarTwoTone, DeleteOutlined, EyeOutlined, SettingOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { isUserLoggedIn } from "utils/";
import { getUser } from "utils/";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { calcPriceDiscount } from "utils/";

const cx = classNames.bind(styles);
const { Meta } = Card;
export default function CardCourse({ course, ...rest }) {
    const navigate = useNavigate()

    const renderIcons = useCallback(() => {
        if (getUser()?.roleId == 2) {
            return [
                <EyeOutlined key='eye' onClick={() => navigate(`/course/${course?.id}`)} />,
                <ShoppingCartOutlined key="cart" />,
            ]
        } else return [
            <EyeOutlined key='eye' onClick={() => navigate(`/course/${course?.id}`)} />,
            <SettingOutlined key='setting' />,
            // <DeleteOutlined key='delete' />
        ]
    }, [course?.id])

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
                        <h2>{calcPriceDiscount(course?.price, course?.discount)}</h2>
                    </div>
                </Card>
            </Badge.Ribbon >
        </div>
    )
}