import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Badge, Button, Image, InputNumber, Popconfirm, Tag } from "antd";
import { calcPriceDiscount } from "utils/";
import { formatVND } from "utils/";

export const renderOrderColumns = (isEdit, handleDelete, handleSave) => [
    {
        title: '#',
        width: '',
        dataIndex: 'index',
        render: (_, record, index) => index + 1
    },
    {
        title: 'Total Pay',
        dataIndex: 'total_pay',
        width: '14%',
        render: (_) => formatVND(_)

    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '5%',
        render: (_) => _ === 'INACTIVE' ? <Badge status='processing' text='Processing' /> : <Badge status='success' text='Bought' />
    },
    {
        title: 'Subtotal',
        dataIndex: 'subtotal',
        width: '10%',
        render: (_, record) => {
            return formatVND(calcPriceDiscount(record.price, record.discount) * record.amount)
        }
    },
    {
        title: 'Action',
        dataIndex: 'actions',
        render: (_, record) => (
            <>
                <Button icon={<EyeOutlined />} />
                <Button icon={<EditOutlined />} />
            </>
        )
    }
];