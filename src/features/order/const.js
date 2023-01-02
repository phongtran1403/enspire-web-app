import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Badge, Button, Image, InputNumber, Popconfirm, Space, Tag } from "antd";
import { calcPriceDiscount } from "utils/";
import { formatVND } from "utils/";

export const renderHistoryColumns = (showDetail, handleEdit) => [
    {
        title: '#',
        width: '2%',
        dataIndex: 'index',
        render: (_, record, index) => index + 1
    },
    {
        title: 'Total Payment',
        dataIndex: 'totalPayment',
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
        title: 'Action',
        dataIndex: 'actions',
        width: '5%',
        render: (_, record) => (
            <Button onClick={() => showDetail(record)} icon={<EyeOutlined />} />
        )
    }
];

export const renderOrderColumns = (showDetail, handleEdit) => [
    {
        title: '#',
        width: '2%',
        dataIndex: 'index',
        render: (_, record, index) => index + 1
    },
    {
        title: 'Total Payment',
        dataIndex: 'totalPayment',
        render: (_) => formatVND(_)

    },
    {
        title: 'User',
        dataIndex: 'name',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '15%',
        render: (_) => _ === 'INACTIVE' ? <Badge status='processing' text='Processing' /> : <Badge status='success' text='Bought' />
    },
    {
        title: 'Action',
        width: '10%',
        dataIndex: 'actions',
        render: (_, record) => (
            <Space>
                <Button onClick={() => showDetail(record)} icon={<EyeOutlined />} />
                <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
            </Space>
        )
    }
];

export const renderDetailColumns = () => [
    {
        title: '',
        width: '10%',
        dataIndex: 'imgCourse',
        render: (_) => <Image src={_} width={100} preview={false} />
    },
    {
        title: 'Course Name',
        dataIndex: 'courseName',
    },
    {
        title: 'Amount',
        width: '2%',
        dataIndex: 'amount',

    },
    {
        title: 'Subtotal',
        dataIndex: 'totalPayment',
        width: '10%',
        render: (_) => {
            return formatVND(_)
        }
    },
];