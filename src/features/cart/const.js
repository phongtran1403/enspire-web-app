import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image, InputNumber, Popconfirm, Tag } from "antd";
import { calcPriceDiscount } from "utils/";
import { formatVND } from "utils/";

export const renderColumns = (isEdit, handleDelete, handleSave) => [
    {
        title: '',
        dataIndex: 'operation',
        width: '5%',
        render: (_, record) => (
            <Popconfirm
                title='Sure to delete'
                okButtonProps={{ danger: true }}
                cancelButtonProps={{ danger: true }}
                onConfirm={() => handleDelete(record.idCart)}>
                <Button danger type='primary' size='small' icon={<DeleteOutlined />} />
            </Popconfirm>
        )
    },
    {
        title: '',
        width: '10%',
        dataIndex: 'imgCourse',
        render: (_) => <Image src={_} width={100} preview={false} />
    },
    {
        title: 'Course Name',
        dataIndex: 'courseName',
        width: '30%',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        width: '14%',
        render: (_, record) => isEdit ? <InputNumber defaultValue={_} min={1} onChange={(value) => handleSave(value, record)} /> : _

    },
    {
        title: 'Price',
        dataIndex: 'price',
        render: (_) => formatVND(_)
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        width: '5%',
        render: (_) => <Tag color='red'>{_ + '%'}</Tag>
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