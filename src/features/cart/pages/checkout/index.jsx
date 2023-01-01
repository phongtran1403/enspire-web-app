import { DollarOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, Result, Space, Table } from 'antd'
import orderApi from 'api/order'
import classNames from 'classnames/bind'
import { BANK_INFO } from 'constants/'
import { selectListCart } from 'features/cart/cartSlice'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser } from 'utils/'
import { calcPriceDiscount } from 'utils/'
import { formatVND } from 'utils/'
import style from './index.module.scss'

const cx = classNames.bind(style)
export const columns = [
    {
        title: 'Course Name',
        dataIndex: 'courseName',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',

    },
    {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        width: '10%',
        render: (_, record) => {
            return formatVND(calcPriceDiscount(record.price, record.discount) * record.amount)
        }
    },
];
export default function CheckoutPage() {
    const listCart = useSelector(selectListCart)

    const [orderSuccess, setOrderSuccess] = useState(false)

    const totalAmount = useMemo(() => {
        let total = 0
        listCart.map(item => total += (calcPriceDiscount(item.price, item.discount) * item.amount))
        return total
    }, [listCart])

    const placeOrder = async () => {
        try {
            const orderDto = listCart.map(item => ({
                courseId: item.idCourse,
                amount: item.amount,
                totalPayment: calcPriceDiscount(item.price, item.discount) * item.amount
            }))
            const body = {
                userId: getUser().userId,
                orderDto
            }
            await orderApi.add(body)
            toast.success('Place Order Success')
            setOrderSuccess(true)
        } catch (error) {
            toast.error('Place Order Failed')
        }
    }

    return (
        <div class={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/cart'>
                        <ShoppingCartOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <DollarOutlined />
                    <span>Checkout</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            {
                !orderSuccess ?
                    <Card className={cx('content')}>
                        <Table
                            pagination={false}
                            bordered
                            dataSource={listCart}
                            columns={columns}
                        />

                        <div className={cx('pay')}>
                            <Space direction='vertical' style={{ width: '40%' }}>
                                <h1>Total: {formatVND(totalAmount)}</h1>
                                <Link to='/cart/checkout'>
                                    <Button onClick={placeOrder} disabled={listCart.length === 0} type='primary' block size='large'>Place Order</Button>
                                </Link>
                            </Space>
                        </div>
                    </Card> :
                    <Result
                        status="success"
                        title="Successfully Placed Order!"
                        subTitle={<div>
                            <span>Thank you for placing order. Please pay through bank account below:</span>
                            <div>Bank: {BANK_INFO.bank_name}</div>
                            <div>Account Number: {BANK_INFO.account}</div>
                            <div>Own: {BANK_INFO.own_name}</div>
                        </div>}
                        extra={[
                            <Link to='/order' key="order">
                                <Button type="primary">
                                    Go History Order
                                </Button>
                            </Link>,
                            <Link to='/course' key="home">
                                <Button >Home</Button>
                            </Link>,
                        ]}
                    />
            }
        </div>
    )
}
