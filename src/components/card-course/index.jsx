import { Badge, Card, Divider, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import LazyLoad from "react-lazyload";
import { formatVND } from "utils/";
import { CarTwoTone, DeleteOutlined, SettingOutlined, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);
const { Meta } = Card;
export default function CardCourse({ course, ...rest }) {
    return (
        <Badge.Ribbon color='red' text={course.discount + '%'}>
            <Card
                className={cx("card-course")}
                cover={
                    <LazyLoad once>
                        <img alt="course-img" src={course.imgCourse} />
                    </LazyLoad>
                }
                hoverable
                actions={[
                    <SettingOutlined key="setting" />,
                    <ShoppingCartOutlined key="edit" />,
                    <DeleteOutlined key="edit" />,
                ]}
                {...rest}>
                <div className={cx('content')}>
                    <h3>{course.courseName}</h3>
                    <h4>Teacher: {course.teacherName}</h4>
                    <Divider />
                    <h2>{formatVND(course.price)}</h2>
                </div>
            </Card>
        </Badge.Ribbon>
    )
}