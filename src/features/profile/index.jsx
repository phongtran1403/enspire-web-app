import { AuditOutlined, HomeOutlined, LockOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "utils/";
import { AccountDetail } from "./account-detail";
import { ChangePassword } from "./change-password";

const { TabPane } = Tabs;
export default function ProfileFeature() {
    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/course'>
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <UserOutlined />
                    <span>Profile</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <AuditOutlined />
                                {getUser()?.roleId == 0 ? 'My Account' : "My Profile"}
                            </span>
                        }
                        key="1"
                    >
                        <AccountDetail />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <LockOutlined />
                                Change Password
                            </span>
                        }
                        key="3"
                    >
                        <ChangePassword />
                    </TabPane>
                </Tabs>
            </Card>
        </>
    )
}