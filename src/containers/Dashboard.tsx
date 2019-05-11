import React from "react";
import styled from "@emotion/styled";
import { Layout, Spin, Icon, Row, Col } from "antd";

import MainNav from "../components/admin/MainNav";

const { Header, Content } = Layout;

const StyledContent = styled(Content)`
  min-height: 600px;
  padding-top: 30px;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  height: 80px;
`;

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <StyledHeader>
        <MainNav />
      </StyledHeader>
      <StyledContent>
        <Row type="flex" justify="center">
          <Col span={18}>
            <p>This is the dashboard.</p>
          </Col>
        </Row>
      </StyledContent>
    </React.Fragment>
  );
};

export default Dashboard;
