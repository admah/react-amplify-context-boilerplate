import React, { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";
import { Layout, Spin, Icon, Row, Col } from "antd";

const UserCreate = lazy(() => import("../components/auth/UserCreate"));
const UserLogin = lazy(() => import("../components/auth/UserLogin"));
const UserRegister = lazy(() => import("../components/auth/UserRegister"));
const UserConfirm = lazy(() => import("../components/auth/UserConfirm"));
const UserVerify = lazy(() => import("../components/auth/UserVerify"));
const UserPasswordForgot = lazy(() =>
  import("../components/auth/UserPasswordForgot")
);

const { Header, Content } = Layout;

const StyledContent = styled(Content)`
  min-height: 600px;
  padding-top: 30px;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  height: 80px;
`;

const User: React.FC = () => {
  return (
    <React.Fragment>
      <StyledContent>
        <Row type="flex" justify="center">
          <Col span={18}>
            <Switch>
              <Route path={"/user/login"} exact component={UserLogin} />
              <Route path={"/user/register"} exact component={UserRegister} />
              <Route path={"/user/confirm"} exact component={UserConfirm} />
              <Route path={"/user/verify"} exact component={UserVerify} />
              <Route
                path={"/user/password-forgot"}
                exact
                component={UserPasswordForgot}
              />
              <Route component={UserCreate} />
            </Switch>
          </Col>
        </Row>
      </StyledContent>
    </React.Fragment>
  );
};

export default User;
