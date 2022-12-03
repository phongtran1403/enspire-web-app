import { Layout, Menu } from "antd"
import classNames from "classnames/bind"
import style from "./index.module.scss"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { getUser } from "utils/"
import { DashboardFilled, ExportOutlined, ImportOutlined, InboxOutlined, ShopFilled, ShoppingFilled, TeamOutlined } from "@ant-design/icons"

const cx = classNames.bind(style)
const { Sider } = Layout
export default function Sidebar({ selectedTab, setSelectedTab }) {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const path = location.pathname
        switch (true) {
            case path.includes('course'):
                setSelectedTab(['course'])
                break
            default:
                setSelectedTab([])
        }
    }, [location])

    const changeSite = ({ key }) => {
        setSelectedTab([key])
        navigate(`/${key}`)
    }

    return (
        <Sider
            theme="light"
            className={cx('container')}
            trigger={null}
        >
            <Menu theme="light" selectedKeys={selectedTab} mode="inline" onClick={changeSite}>
                <Menu.Item key='course' icon={<DashboardFilled style={{ fontSize: 20 }} />}>
                    Course
                </Menu.Item>
            </Menu>
        </Sider>
    )
}