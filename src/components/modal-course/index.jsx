import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd'
import React, { useEffect } from 'react'
import { normFile } from 'utils/'
import { InputCurrency } from '..'

export default function ModalCourse({ isOpen, onSubmit, onCancel, listCate, loading, course = null }) {
    const [form] = Form.useForm()

    const handleSubmit = (values) => {
        onSubmit(values)
    }

    useEffect(() => {
        if (course) {
            form.setFieldsValue({
                courseName: course?.courseName,
                categoryCourseId: course?.categoryCourse?.id,
                content: course.content,
                price: course.price,
                discount: course.discount,
                teacherName: course.teacherName,
                image: [{
                    uid: 'old',
                    status: 'done',
                    name: `Image Course of ${course.courseName}`,
                    url: course.imgCourse
                }],
                video: course?.introduceVideo && [{
                    uid: 'old',
                    name: `Introduce video of ${course.courseName}`,
                    status: 'done',
                    url: course.introduceVideo
                }]
            })
        }
    }, [isOpen, course])

    useEffect(() => {
        !isOpen && form.resetFields()
    }, [isOpen])

    return (
        <Modal
            open={isOpen}
            title={course ? 'Edit Course' : 'Add New Course'}
            onCancel={onCancel}
            footer=''>
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
                <Form.Item
                    name="image"
                    label="Image Course"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        { required: true, message: 'Image Course is required' }
                    ]}
                >
                    <Upload
                        name="imgCourse"
                        listType="picture"
                        accept="image/png, image/jpeg"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="video"
                    label="Introduce Video"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        { required: true, message: 'Introduce Video is required' }
                    ]}
                >
                    <Upload
                        name="videoCourse"
                        listType="picture"
                        accept="video/mp4"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Course Name" name='courseName' rules={[
                    { required: true, message: 'Course Name is required' }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Teacher Name" name='teacherName' rules={[
                    { required: true, message: 'Teacher Name is required' }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Category" name='categoryCourseId' rules={[
                    { required: true, message: 'Category is required' }
                ]}>
                    <Select options={listCate} />
                </Form.Item>
                <Form.Item label="Price" name='price' rules={[
                    { required: true, message: 'Price is required' }
                ]}>
                    <InputCurrency min={50000} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Discount" name='discount' rules={[
                    { required: true, message: 'Discount is required' }
                ]}>
                    <InputNumber
                        max={100}
                        min={0}
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace('%', '')}
                    />
                </Form.Item>
                <Form.Item label="Content" name='content' >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} htmlType='submit' type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
