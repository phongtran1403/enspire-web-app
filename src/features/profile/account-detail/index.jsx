import { Avatar, Button, Col, Form, Image, Input, Row, Table, Upload } from "antd";
import classNames from "classnames/bind";
import { VALIDATE_IMAGE } from "constants/";
import { FIELD_EMAIL_INVALID, FIELD_REQUIRED } from "constants/message";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "utils/";
import style from "./index.module.scss";
import img from 'assets/images/null-img.png'
import { columns } from "./columns";
import accountApi from "api/account";
import { handleUploadImage } from "utils/";
// import Context from "layout/private/Context";
import { ENSPIRE_USER } from "constants/";
import { useSelector } from "react-redux";
import { selectInfo, updateInfo } from "../profileSlice";
import { useDispatch } from "react-redux";
import { checkPhoneNumber } from "features/auth/register";

const cx = classNames.bind(style);

export function AccountDetail() {
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const info = useSelector(selectInfo)

    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([]);
    const [imageProfile, setImageProfile] = useState('')
    const [isEdit, setIsEdit] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const toggleMode = () => {
        if (!isEdit) {
            if (imageProfile) setFileList([{
                uid: '-1',
                name: 'name',
                status: 'done',
                url: imageProfile
            }]);
            else setFileList([])
            form.setFieldsValue({
                email: info.email,
                name: info.name,
                phoneNumber: info.phoneNumber
            })
        }
        setIsEdit(!isEdit);
    }

    const beforeUpload = (file) => {
        const isAccept = VALIDATE_IMAGE.accept.includes(file.type);
        const overLimit = file.size / 1024 / 1024 <= 5;
        if (!isAccept || !overLimit) {
            return false;
        }

        return true;
    };

    const onChange = ({ fileList: newFileList }) => {
        if (newFileList.length > 0 && newFileList[0].status === "error") {
            newFileList[0].status = "done";
        }

        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);

                reader.onload = () => resolve(reader.result);
            });
        }

        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onRemove = (file) => {
        setFileList([]);
    }

    const cancelSubmit = () => {
        setFileList([])
        setIsEdit(false);
    }

    const onFinish = async (values) => {
        try {
            setLoading(true)
            // check image exist
            values.img = ""
            values.password = ""
            if (imageProfile) {
                if (fileList.length === 0) {
                    values.img = '';
                    setImageProfile("")
                }
                else {
                    if (!fileList[0].url) {
                        const { url } = await handleUploadImage(fileList)

                        setImageProfile(url)
                        values.img = url;
                    }
                }
                await accountApi.editAccount({
                    ...values,
                    username: info.username,
                });
            } else {
                if (fileList.length > 0) {
                    const { url } = await handleUploadImage(fileList)
                    values.img = url;
                    setImageProfile(url)
                }

            }
            await accountApi.editAccount({
                ...values,
                username: info.username,
            });
            setFileList([])
            setIsEdit(false)
            localStorage.setItem(ENSPIRE_USER, JSON.stringify({
                ...info,
                ...values
            }));
            dispatch(updateInfo({
                ...info,
                ...values
            }))
            toast.success("Update account success");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    const fetchImageProfile = async () => {
        if (info?.img) {
            setImageProfile(info.img)
        }
    }

    const setUserInfoManual = () => {
        setUserInfo([
            {
                key: info?.name,
                label: 'Fullname',
                value: info?.name
            },
            {
                key: info?.username,
                label: 'Username',
                value: info?.username
            },
            {
                key: info?.email,
                label: 'Email',
                value: info?.email
            },
            {
                key: info?.phoneNumber,
                label: 'Phone',
                value: info?.phoneNumber
            },
        ])
    }

    useEffect(() => {
        fetchImageProfile()
        setUserInfoManual()
    }, [info])

    return (
        <Row gutter={12} className={cx('container')}>
            <Col span={6}>
                <p>Avatar</p>
                {
                    !isEdit ?
                        <Image
                            width={102}
                            height={102}
                            preview={imageProfile}
                            src={imageProfile ? imageProfile : img}
                        /> :
                        <>
                            <Upload
                                key="upload"
                                listType="picture-card"
                                beforeUpload={beforeUpload}
                                fileList={fileList}
                                accept="image/png, image/jpeg"
                                maxCount={1}
                                onPreview={onPreview}
                                onChange={onChange}
                                onRemove={onRemove}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </>
                }
            </Col>
            <Col span={!isEdit ? 8 : 18}>
                {
                    isEdit ?
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}>
                            <Form.Item label="Full Name" name="name" rules={[
                                { required: true, message: FIELD_REQUIRED }
                            ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[
                                { required: true, message: FIELD_REQUIRED },
                                { type: "email", message: FIELD_EMAIL_INVALID }
                            ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Phone" name='phoneNumber' rules={[
                                { validator: checkPhoneNumber }
                            ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Save
                                </Button>
                                <Button danger className={cx('cancel-btn')} onClick={cancelSubmit}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form> :
                        <div className={cx('table')}>
                            <Table dataSource={userInfo} columns={columns} pagination={false} />
                        </div>
                }
            </Col>
            <Col span={24}>
                {
                    !isEdit && <Button className={cx('img-btn')} onClick={toggleMode}>
                        Update Information
                    </Button>
                }
            </Col>
        </Row>
    )
}