import { ConfigProvider } from "antd"

const AntdConfigProvider = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorLink: "#ff3333",
                    colorText: "#d3d3d3",
                    fontFamily: "mono-light",
                    colorBgBase: "#161a1d",
                    colorBorder: "#b1a7a6",
                    colorPrimaryHover: "#ff3333",
                    colorTextDisabled: "#b1a7a6"

                },
                components: {
                    Pagination: {
                        itemActiveBg: "#262a2d"
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export default AntdConfigProvider