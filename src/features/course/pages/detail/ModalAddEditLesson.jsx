import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Upload } from 'antd'
import { RCDatePicker } from 'components/'
import moment from 'moment'
import React, { useEffect } from 'react'
import { normFile } from 'utils/'

export default function ModalAddEditLesson({ open, handleClose, handleSubmit, selected, loading }) {
    const [form] = Form.useForm()

    useEffect(() => {
        if (selected) {
            form.setFieldsValue({
                title: selected?.title,
                day: moment(selected?.day),
                image: selected.imgLesson ? [{
                    uid: 'old',
                    status: 'done',
                    name: `Image Lesson of ${selected.title}`,
                    url: selected.imgLesson
                }] : [],
                video: selected?.video ? [{
                    uid: 'old',
                    name: `Lesson video of ${selected.title}`,
                    status: 'done',
                    url: selected.video
                }] : [],
                dayNumber: selected?.dayNumber,
                content: selected?.content
            })
        }
        if (!open) form.resetFields()
    }, [open, selected])

    return (
        <Modal
            title={selected ? 'Edit Lesson' : 'Add Lesson'}
            open={open}
            onCancel={handleClose}
            footer=''>
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
                <Form.Item
                    name="image"
                    label="Image Lesson"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        { required: true, message: 'Image Lesson is required' }
                    ]}
                >
                    <Upload
                        name="imgLesson"
                        listType="picture"
                        accept="image/png, image/jpeg"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="video"
                    label="Lesson Video"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        { required: true, message: 'Lesson Video is required' }
                    ]}
                >
                    <Upload
                        name="videoLesson"
                        listType="picture"
                        accept="video/mp4"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Title" name='title' rules={[
                    { required: true, message: 'Title is required' }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Day" name='dayNumber' rules={[
                    { required: true, message: 'Day is required' }
                ]}>
                    <InputNumber min={1} />
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
