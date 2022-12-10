import { DeleteOutlined, EditFilled, PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Empty, Form, Image, Input, Menu, Modal, Row, Select, Typography, Upload } from 'antd';
import blogApi from 'api/blog';
import classNames from 'classnames/bind';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { normFile } from 'utils/';
import { handleUploadImage } from 'utils/';
import { isUserLoggedIn } from 'utils/';
import { getUser } from 'utils/';
import style from './index.module.scss'

const cx = classNames.bind(style)
const { Title, Paragraph, Text } = Typography;
export default function BlogPage() {
    const navigate = useNavigate()
    const { idCategory, idBlog } = useParams()
    const [form] = Form.useForm()

    const [listCate, setListCate] = useState([])
    const [blogs, setBlogs] = useState([])
    const [detail, setDetail] = useState(null)
    const [visibleAddEdit, setVisAddEdit] = useState(false)
    const [visibleDelete, setVisDelete] = useState(false)
    const [typeModal, setTypeModal] = useState(0)
    const [current, setCurrent] = useState('');
    const [loading, setLoading] = useState(false)

    const changeCurrent = (e) => {
        setCurrent(e.key);
        navigate(`/category/${idCategory}/blog/${e.key}`)
    }

    const fetchListCategory = async () => {
        try {
            const data = await blogApi.getCategoryBlog()
            console.log("🚀 ~ data", data)
            setListCate(data.map(item => ({
                label: item.categoryBlogName,
                value: item.id
            })))
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchBlogsByCategory = async () => {
        try {
            const data = await blogApi.getBlogByCate(idCategory)
            setBlogs(data.map(item => ({
                label: item.blogName,
                key: item.id
            })))
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const fetchDetailBlog = async () => {
        try {
            const detailBlog = await blogApi.getDetail(idBlog)
            setDetail(detailBlog)
            setCurrent(detailBlog.id + '')
        } catch (error) {
            console.log("🚀 ~ error", error)
            setDetail(null)
        }
    }

    const handleOpenModal = (type) => {
        if (type === 1) {
            form.setFieldsValue({
                blogName: detail?.blogName,
                categoryBlogId: detail?.categoryBlog?.id,
                content: detail?.content
            })
        }
        setTypeModal(type)
        setVisAddEdit(true)
    }

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            if (values.upload && values.upload.length > 0) {
                const { url } = await handleUploadImage(values.upload);
                values.img = url;
            }
            if (typeModal === 1) {
                await blogApi.update(idBlog, values)
            } else {
                await blogApi.add(values)
            }
            toast.success(typeModal === 1 ? 'Update Success!' : 'Create Success!')
            fetchBlogsByCategory()
            navigate(`/category/${idCategory}`)
            handleCancel()
        } catch (error) {
            console.log("🚀 ~ error", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (values) => {
        try {
            setLoading(true)
            await blogApi.delete(idBlog)
            toast.success('Delete Success!')
            fetchBlogsByCategory()
            navigate(`/category/${idCategory}`)
            setVisDelete(false)
        } catch (error) {
            console.log("🚀 ~ error", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setVisAddEdit(false)
        form.resetFields()
    }

    useEffect(() => {
        fetchBlogsByCategory()
        fetchListCategory()
        setDetail(null)
        if (idBlog) {
            fetchDetailBlog()
        }
    }, [idCategory, idBlog])

    return (
        <div className={cx('container')}>
            <Row gutter={[32, 16]}>
                {
                    isUserLoggedIn() && getUser()?.roleId == 1 &&
                    <Col span={24}>
                        <Button onClick={() => handleOpenModal(0)} size='large' type='primary' icon={<PlusCircleFilled />}>New Blog</Button>
                    </Col>
                }
                <Col span={6}>
                    <Card className={cx('card')}>
                        {
                            blogs.length > 0 ? <Menu onClick={changeCurrent} selectedKeys={[current]} items={blogs} /> : <Empty />
                        }
                    </Card>
                </Col>
                {
                    detail && (
                        <Col span={18}>
                            <Card className={cx('card')}>
                                <>
                                    {
                                        isUserLoggedIn() && getUser()?.roleId == 1 &&
                                        <div className={cx('btn-edit')}>
                                            <Button type='primary' icon={<EditFilled />} onClick={() => handleOpenModal(1)} />
                                            <Button style={{ marginLeft: '1rem' }} danger type='primary' icon={<DeleteOutlined />} onClick={() => setVisDelete(true)} />
                                        </div>
                                    }
                                    <Image
                                        rootClassName={cx('main-img')}
                                        width="100%"
                                        src={detail.images}
                                    />
                                    <div>
                                        <Typography>
                                            <Title>{detail?.title}</Title>
                                            <Text italic mark>Created At: {detail.createTime}</Text>
                                            <Paragraph>
                                                {detail.content}
                                            </Paragraph>
                                        </Typography>
                                    </div>
                                </>
                            </Card>
                        </Col>
                    )
                }
            </Row>
            <Modal title={typeModal === 1 ? 'Edit Blog' : 'Add New Blog'} onCancel={handleCancel} open={visibleAddEdit} footer=''>
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="upload"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            name="logo"
                            listType="picture"
                            accept="image/png, image/jpeg"
                            maxCount={1}>
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Title" name='blogName' rules={[
                        { required: true, message: 'Title is required' }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category" name='categoryBlogId' rules={[
                        { required: true, message: 'Category is required' }
                    ]}>
                        <Select options={listCate} />
                    </Form.Item>
                    <Form.Item label="Content" name='content' rules={[
                        { required: true, message: 'Content is required' }
                    ]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} htmlType='submit' type="primary">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title='Delete Blog' onCancel={() => setVisDelete(false)} open={visibleDelete} onOk={handleDelete}>
                <p>Are you sure to delete ths blog?</p>
            </Modal>
        </div>
    )
}
