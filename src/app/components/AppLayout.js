import React, { useState } from "react";
import { Layout } from "antd";

import SiderContent from "./menuNavigation/Sider";
import HeaderContent from "./menuNavigation/Header";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }) => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);

  return (
    <Layout>
      <Header style={{ padding: "0" }}>
        <HeaderContent
          isMenuCollapsed={isMenuCollapsed}
          onMenuCollapse={setMenuCollapsed}
        />
      </Header>

      <Layout>
        <Sider trigger={null} collapsible collapsed={isMenuCollapsed}>
          <SiderContent />
        </Sider>

        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
