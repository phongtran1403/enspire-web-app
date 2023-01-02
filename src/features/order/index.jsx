import { HistoryOutlined, HomeOutlined, ShopOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Modal, Radio, Space, Table } from 'antd'
import orderApi from 'api/order'
import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from 'utils/'
import { renderDetailColumns, renderHistoryColumns, renderOrderColumns } from './const'
import style from './index.module.scss'

const cx = classNames.bind(style)
export default function OrderFeature() {
    const [listOrder, setListOrder] = useState([])
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [status, setStatus] = useState(null)

    const openDetail = (order) => {
        setShowDetail(true)

        if (order?.orderDetail && order.orderDetail.length > 0) {
            setSelected(order.orderDetail.map(item => ({
                ...item,
                imgCourse: item.course.imgCourse,
                courseName: item.course.courseName,
            })))
            return;
        }

        setSelected([])
    }

    const editStatus = (order) => {
        setShowEdit(true)
        setSelected(order)
        setStatus(order.status)
    }

    const changeStatus = (e) => [
        setStatus(e.target.value)
    ]

    const fetchOrder = async () => {
        try {
            setLoading(true)
            const data = getUser()?.roleId == 1 ? await orderApi.getAll() : await orderApi.getByUser()
            setListOrder(data)
        } catch (error) {
            console.log("🚀 ~ error", error)
        } finally {
            setLoading(false)
        }
    }

    const submitEdit = async () => {
        try {
            await orderApi.updateStatus(selected?.id, {
                input: status
            })
            toast.success('Update Success!')
            setShowEdit(false)
            fetchOrder()
        } catch (error) {
            toast.error('Update Failed!')
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <div className={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {getUser()?.roleId == 1 ? <ShopOutlined /> : <HistoryOutlined />}
                    <span>List Order</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <Table
                loading={loading}
                dataSource={listOrder}
                columns={getUser()?.roleId == 1 ? renderOrderColumns(openDetail, editStatus) : renderHistoryColumns(openDetail)} />
            <Modal
                width={800}
                open={showDetail}
                title='Order Detail'
                onCancel={() => setShowDetail(false)}
                footer=''
            >
                <Table pagination={false} columns={renderDetailColumns()} dataSource={selected || []} />
            </Modal>
            <Modal
                open={showEdit}
                title='Update status'
                onCancel={() => setShowEdit(false)}
                footer=''
            >
                <Space direction='vertical'>
                    <Radio.Group onChange={changeStatus} value={status}>
                        <Radio value={'ACTIVE'}>Paid</Radio>
                        <Radio value={'INACTIVE'}>Not Paid</Radio>
                    </Radio.Group>
                    <Space>
                        <Button onClick={() => setShowEdit(false)}>Cancel</Button>
                        <Button onClick={submitEdit}>Submit</Button>
                    </Space>
                </Space>
            </Modal>
        </div>
    )
}
