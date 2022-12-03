import { List } from 'antd';
import classNames from 'classnames/bind';
import React from 'react'
import { Link } from 'react-router-dom';
import style from './index.module.scss'

const cx = classNames.bind(style)
const data = [
    {
        id: '1',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran'
    },
    {
        id: '2',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran'
    },
    {
        id: '3',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran'
    },
    {
        id: '4',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran'
    },
    {
        id: '5',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran'
    },
]
export default function BLogPage() {
    return (
        <div className={cx('container')}>
            <h1>List Blog</h1>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    total: 10,
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <img
                                width={150}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<Link to={`${item.id}`}>{item.title}</Link>}
                            description={item.author}
                        />
                        {item.description}
                    </List.Item>
                )}
            />
        </div>
    )
}
