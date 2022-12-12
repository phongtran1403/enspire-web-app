import { Breadcrumb, Button, Card, Space, Table } from 'antd'
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { calcPriceDiscount } from 'utils/'
import { formatVND } from 'utils/'
import { renderColumns } from './const'
import style from './index.module.scss'
import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, selectListCart, updateCart } from './cartSlice'
import { toast } from 'react-toastify'
import cartApi from 'api/cart'

const cx = classNames.bind(style)
export default function CartPage() {
    const dispatch = useDispatch()

    const listCart = useSelector(selectListCart)

    const [isEdit, setIsEdit] = useState(false)
    const [dataSource, setDataSource] = useState(listCart);
    const [loading, setLoading] = useState(false)

    const totalAmount = useMemo(() => {
        let total = 0
        dataSource.map(item => total += (calcPriceDiscount(item.price, item.discount) * item.amount))
        return total
    }, [dataSource])

    const handleDelete = async (idCart) => {
        try {
            setLoading(true)
            await cartApi.delete(idCart)
            dispatch(deleteCart(idCart))
            toast.success('Delete Cart Success!')
        } catch (error) {
            toast.error('Delete cart failed')
        } finally {
            setLoading(false)
        }
    };

    const handleSave = (value, row) => {
        const newData = cloneDeep(dataSource);
        const index = newData.findIndex((item) => row.idCart === item.idCart);
        newData[index].amount = value
        setDataSource(newData);
    };

    const onApply = async () => {
        try {
            setLoading(true)
            await Promise.all(dataSource.map(({ idCart, userId, amount, idCourse }) => cartApi.update({
                idCart,
                userId,
                amount,
                idCourse
            })))
            setIsEdit(false)
            toast.success('Update Cart Success!')
            dispatch(updateCart(dataSource))
        } catch (error) {
            toast.error('Update cart failed')
        } finally {
            setLoading(false)
        }
    }

    const onRevert = () => {
        setIsEdit(false)
        setDataSource(listCart)
    }

    useEffect(() => {
        setDataSource(listCart)
    }, [listCart])

    return (
        <div className={cx('container')}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <ShoppingCartOutlined />
                    <span>Cart</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className={cx('card')} loading={loading}>
                <Table
                    pagination={false}
                    bordered
                    dataSource={dataSource}
                    columns={renderColumns(isEdit, handleDelete, handleSave)}
                    footer={() => (
                        dataSource.length > 0 && <Space>
                            {
                                isEdit ? (
                                    <>
                                        <Button type='primary' onClick={onApply}>Apply</Button>
                                        <Button danger onClick={onRevert}>Cancel</Button>
                                    </>
                                ) :
                                    <Button onClick={(() => setIsEdit(true))}>Update Cart</Button>
                            }
                        </Space>
                    )}
                />
                <div className={cx('pay')}>
                    <Space direction='vertical' style={{ width: '40%' }}>
                        <h1>Total: {formatVND(totalAmount)}</h1>
                        <Link to='/cart/checkout'>
                            <Button disabled={dataSource.length === 0} type='primary' block size='large'>Proceed to checkout</Button>
                        </Link>
                    </Space>
                </div>
            </Card>
        </div>
    )
}
