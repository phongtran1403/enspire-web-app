import { Button, FloatButton, Form, Input, Layout, Modal, Select, Tooltip, Upload } from "antd";
import classNames from "classnames/bind";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUser, handleUploadImage, isUserLoggedIn, normFile } from "utils";
import { Sidebar } from "./components";
import Header from '../header'
import style from './index.module.scss'
import React, { useEffect, useState } from "react";
import { DiffOutlined, FileTextOutlined, UploadOutlined } from "@ant-design/icons";
import courseApi from "api/course";
import { ModalCourse } from "components/";
import { toast } from "react-toastify";

const cx = classNames.bind(style)
const { Content, Footer } = Layout
export default function PrivateLayout() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [listCate, setListCate] = useState([false])

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            if (values.image && values.image.length > 0) {
                const { url } = await handleUploadImage(values.image);
                values.imgCourse = url;
            }
            if (values.video && values.video.length > 0) {
                const { url } = await handleUploadImage(values.video);
                values.introduceVideo = url;
            }
            delete values.image
            delete values.video
            const res = await courseApi.add(values)
            toast.success('Create Course Success!')
            navigate('/course/' + res?.idCourse)
            setIsOpen(false)
        } catch (error) {
            toast.error('Create Failed!')
        } finally {
            setLoading(false)
        }
    }

    const fetchListCategory = async () => {
        try {
            const data = await courseApi.getListCategory()
            const options = []
            data.map(item => options.push({
                label: item.categoryCourseName,
                value: item.id
            }))
            setListCate(options)
        } catch (error) {
            console.log("🚀 ~ error", error)
        }
    }

    useEffect(() => {
        fetchListCategory()
    }, [])

    if (!isUserLoggedIn()) {
        return <Navigate to='/login' />
    }

    return (
        <Layout className={cx('layout')}>
            <Header />
            <ModalCourse
                isOpen={isOpen}
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
                loading={loading}
                listCate={listCate}
            />
            {
                getUser()?.roleId == 1 &&
                <Tooltip title='Create New Course'>
                    <FloatButton
                        onClick={() => setIsOpen(true)}
                        icon={<DiffOutlined />}
                        type="primary"
                        style={{
                            right: 50,
                        }}
                    />
                </Tooltip>
            }
            <Layout>
                <Content className={cx('content')}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}