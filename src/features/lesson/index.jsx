import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Drawer, Form, Image, Input, Radio, Row, Space, Table, Tag } from 'antd'
import Modal from 'antd/es/modal/Modal'
import exerciseApi from 'api/exercise'
import classNames from 'classnames/bind'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { getUser } from 'utils/'
import { Player } from 'video-react'
import style from './index.module.scss'

const cx = classNames.bind(style)

const renderColumns = (edit, del) => ([
    {
        title: 'Question',
        dataIndex: 'quest',
        render: (_, row) => JSON.parse(row.content).question
    },
    {
        title: 'Answers',
        dataIndex: 'ans',
        render: (_, row) => {
            const ans = JSON.parse(row.content).answer.split('\n')
            return ans.map(item => (
                <Tag color={item === row.result ? 'success' : 'error'}>
                    {item}
                </Tag>
            ))
        },
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (_, row) => (
            <Space>
                <Button onClick={() => edit(row)} icon={<EditFilled />} />
                <Button onClick={() => del(row)} danger icon={<DeleteFilled />} />
            </Space>
        )
    }
])
export default function LessonDetail({ open, lesson, onClose }) {
    const [formAdmin] = Form.useForm();
    const [formUser] = Form.useForm();

    const [listExercise, setListExercise] = useState([])
    const [isOpenInput, setIsOpenInput] = useState(false)
    const [isOpenDel, setIsOpenDel] = useState(false)
    const [exercise, setExercise] = useState(null)
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [listErr, setListErr] = useState([])

    const openAdd = () => {
        setIsOpenInput(true)
        setExercise(null)
    }

    const openEdit = (ex) => {
        setIsOpenInput(true)
        setExercise(ex)
    }

    const openDel = (ex) => {
        setIsOpenDel(true)
        setExercise(ex)
    }

    const fetchExercise = async () => {
        try {
            const data = await exerciseApi.getList(lesson?.id)
            setListExercise(data)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    const resetExs = () => {
        setSubmitted(false)
        setListErr([])
        formUser.resetFields()
    }

    const submitExs = (values) => {
        const errors = []
        listExercise.map(item => {
            if (values[`item_${item.id}`] !== item.result) {
                errors.push(item.id)
            }
        })
        setSubmitted(true)
        setListErr(errors)
    }

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            if (exercise) {
                await exerciseApi.update({
                    id: exercise.id,
                    lessonByDayId: lesson?.id,
                    content: JSON.stringify({
                        question: values.question,
                        answer: values.answer,
                    }),
                    img: '',
                    result: values.result
                })
            } else {
                await exerciseApi.add({
                    lessonByDayId: lesson?.id,
                    content: JSON.stringify({
                        question: values.question,
                        answer: values.answer,
                    }),
                    result: values.result
                })
            }
            toast.success(exercise ? 'Edit Success' : 'Add Success')
            setIsOpenInput(false)
            fetchExercise()
        } catch (error) {
            toast.error('Submit Failed!')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true)
            await exerciseApi.delete(exercise.id)
            toast.success('Delete Success')
            fetchExercise()
            setIsOpenDel(false)
        } catch (error) {
            toast.error('Delete Failed!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (open && lesson) {
            fetchExercise()
        }
    }, [open, lesson])

    useEffect(() => {
        if (exercise && openEdit) {
            formAdmin.setFieldsValue({
                question: JSON.parse(exercise.content).question,
                answer: JSON.parse(exercise.content).answer,
                result: exercise.result
            })
        } else {
            formAdmin.resetFields()
        }
    }, [exercise])

    return (
        <Drawer title={lesson?.title + ' ~ Day ' + lesson?.dayNumber} open={open} onClose={onClose} placement="right" width={1080}>
            <Row gutter={[24, 24]}>
                <Col span={8}>
                    <Card hoverable>
                        <Image src={lesson?.imgLesson} preview={false} />
                    </Card>
                </Col>
                <Col span={16}>
                    <Card hoverable>
                        <Player playsInline src={lesson?.video} />
                        <span>
                            {lesson?.content}
                        </span>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title='Exercises' hoverable>
                        {
                            getUser()?.roleId == 1 ?
                                <>
                                    <Button type='primary' onClick={openAdd}>Add Exercise</Button>
                                    <Table columns={renderColumns(openEdit, openDel)} dataSource={listExercise} pagination={false} />
                                </> :
                                <Form form={formUser} onFinish={submitExs} layout='vertical'>
                                    {
                                        listExercise.map(item => {
                                            const parseData = JSON.parse(item.content)

                                            return (
                                                <Form.Item
                                                    key={item.id}
                                                    label={parseData.question}
                                                    rules={[{ required: true, message: 'Choose the answer' }]}
                                                    validateStatus={listErr.includes(item.id) ? 'error' : ''}
                                                    help={listErr.includes(item.id) ? `Correct answer is: ${item.result}` : undefined}
                                                    name={`item_${item.id}`}>
                                                    <Radio.Group disabled={submitted}>
                                                        {
                                                            parseData.answer.split('\n').map((ans, index) => (
                                                                <Radio key={index} value={ans}>{ans}</Radio>
                                                            ))
                                                        }
                                                    </Radio.Group>
                                                </Form.Item>
                                            )
                                        })
                                    }
                                    {
                                        submitted ?
                                            <Button onClick={resetExs}>Reset</Button> :
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit">
                                                    Show Result
                                                </Button>
                                            </Form.Item>
                                    }
                                    {
                                        submitted && <h2>Correct Answer: {listExercise.length - listErr.length}/{listExercise.length}</h2>
                                    }
                                </Form>
                        }
                        { }
                    </Card>
                </Col>
            </Row>
            <Modal title={exercise ? 'Edit Exercise' : 'Add Exercise'} open={isOpenInput} onCancel={() => setIsOpenInput(false)} footer=''>
                <Form form={formAdmin} onFinish={handleSubmit} layout='vertical'>
                    <Form.Item label='Question' name='question' rules={[
                        { required: true }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Answers' name='answer' rules={[
                        { required: true }
                    ]}>
                        <Input.TextArea placeholder='1 line = 1 answer' />
                    </Form.Item>
                    <Form.Item label='Correct Answer' name='result' rules={[
                        { required: true }
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button loading={loading} type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button loading={loading} onClick={() => setIsOpenInput(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                width={400}
                open={isOpenDel}
                title='Delete Exercise'
                onCancel={() => setIsOpenDel(false)}
                footer=''
            >
                <div>Do you want to delete this exercise?</div>
                <Space className={cx('del-btns')}>
                    <Button loading={loading} type='primary' onClick={handleDelete}>Yes</Button>
                    <Button loading={loading} onClick={() => setIsOpenDel(false)}>Cancel</Button>
                </Space>
            </Modal>
        </Drawer>
    )
}
