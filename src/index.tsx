import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";

import "./styles/styles.css";
import { AuthProvider } from "./context/AuthContext";
import Wrapper from "./containers/Wrapper";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: "",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-1"

    // OPTIONAL - Amazon Cognito User Pool ID
    //userPoolId: "",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    //userPoolWebClientId: ""

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    //mandatorySignIn: true,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: "USER_PASSWORD_AUTH"
  }
});

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Route pattern="/" component={Wrapper} />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("webapp")
);
