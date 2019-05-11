import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Global } from "@emotion/core";
import styled from "@emotion/styled";
import globalStyles from "../styles/globalStyles";
import { Layout, Spin, Icon, Row, Col } from "antd";

import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = lazy(() => import("../containers/Dashboard"));
const User = lazy(() => import("../containers/User"));
const NotFound = lazy(() => import("../components/NotFound"));

const { Header, Content } = Layout;

const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr;
`;

const Wrapper: React.FC = () => {
  return (
    <div className="main-wrapper">
      <Global styles={globalStyles} />
      <StyledDiv>
        <Suspense fallback={<Spin indicator={loadingIcon} />}>
          <Switch>
            <ProtectedRoute path={"/dashboard"} exact component={Dashboard} />
            <Route path={"/user"} component={User} />
            <Route component={User} />
          </Switch>
        </Suspense>
      </StyledDiv>
    </div>
  );
};

export default Wrapper;
