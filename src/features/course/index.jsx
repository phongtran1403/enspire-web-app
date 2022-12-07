import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';
import classNames from 'classnames/bind';
import React from 'react';
import style from './index.module.scss'

const cx = classNames.bind(style)
const { Meta } = Card;
function CourseList(props) {
    return (
        <div>
            <div className={cx('btn-add')}>
                <Button size='large' type='primary' icon={<PlusCircleFilled />}>New Course</Button>
            </div>
            <Card
                hoverable
                style={{
                    width: 240,
                }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
        </div>
    );
}

export default CourseList;