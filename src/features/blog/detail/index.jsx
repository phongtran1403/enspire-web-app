import { Card, Image, Typography } from 'antd'
import blogApi from 'api/blog'
import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from './index.module.scss'
import { isEmpty } from 'lodash'

const cx = classNames.bind(style)
const { Title, Paragraph, Text, Link } = Typography;
export default function BlogDetail() {
    const { id } = useParams()

    const [detail, setDetail] = useState({
        id: '1',
        title: "5 điều ko nên học tiếng anh",
        description: 'asdasfasfasfasfasfasf',
        author: 'Phong tran',
        content: ''
    })
    const fetchBlogDetail = useCallback(async () => {
        try {
            const detail = await blogApi.getDetail({ id })
            setDetail(detail)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }, [id])

    useEffect(() => {
        // fetchBlogDetail()
    }, [])

    return !isEmpty(detail) ? (
        <Card className={cx('container')}>
            <Image
                rootClassName={cx('main-img')}
                width="100%"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <div>
                <Typography>
                    <Title>{detail?.title}</Title>
                    <Paragraph>
                        Author: <Text mark>{detail.author}</Text>
                    </Paragraph>
                    <Paragraph>
                        Description: {detail.description}
                    </Paragraph>
                </Typography>
            </div>
        </Card>) :
        'Blog Not Found'

}