import React from "react";
import { Row, Col, Typography } from "antd";

const { Text, Title } = Typography;

const UserConfirm: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Title level={2} data-testid="UserConfirmHeading">
          You're all set!
        </Title>
        <Text>
          It's time to start monitoring. Download the mobile app to get started!
        </Text>
      </Col>
    </Row>
  );
};

export default UserConfirm;
