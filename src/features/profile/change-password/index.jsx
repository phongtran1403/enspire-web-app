import { Button, Form, Input } from "antd";
import accountApi from "api/account";
import { ENSPIRE_USER } from "constants/";
import { FIELD_REQUIRED, PASSWORD_NOT_MATCH } from "constants/message";
import { toast } from "react-toastify";
import { getUser } from "utils/";

export function ChangePassword() {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const userInfo = {
                ...getUser(),
                password: values.password,
                newPassword: values.newPassword
            }
            const res = await accountApi.editAccount(userInfo)
            if (res.error_message) {
                toast.error('Old Password is wrong!');

                return;
            }
            localStorage.setItem(ENSPIRE_USER, JSON.stringify(userInfo));
            toast.success("Change password success");
            form.resetFields();
        } catch (error) {
            toast.error('Change password failed');
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}>
            <Form.Item label="Old Password" name="password" rules={[
                { required: true, message: FIELD_REQUIRED }
            ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="New Password" name="newPassword" rules={[
                { required: true, message: FIELD_REQUIRED },
            ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm New Password" name="confirm" rules={[
                { required: true, message: FIELD_REQUIRED },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(PASSWORD_NOT_MATCH));
                    },
                }),
            ]}>
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}