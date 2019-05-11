import React from "react";
import { Auth, Hub } from "aws-amplify";

import { createUser } from "../services/UserService";

type CurrentUser = {
  username: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
};

const AuthContext = React.createContext({
  isActive: Boolean,
  isAuthenticated: Boolean,
  currentUser: Object
});

const AuthListener = (data, authState) => {
  const { setCurrentUser, setIsActive, setIsAuthenticated } = authState;

  const authData = data.payload.data;

  switch (data.payload.event) {
    case "signIn":
      //console.log("signIn: ", data.payload);
      setIsAuthenticated(true);
      setCurrentUser(authData);
      break;
    case "signUp":
      //console.log("signUp: ", data.payload);
      createUser({
        id: data.signUpUserSession.idToken,
        email: data.attributes.email
      });
      break;
    case "signOut":
      //console.log("signOut: ", data.payload);
      setIsAuthenticated(false);
      setCurrentUser({});
      break;
    case "signIn_failure":
      //console.log("user sign in failed");
      break;
  }
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
};

export const AuthProvider = props => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>();

  React.useEffect(() => {
    Auth.currentSession()
      .then(data => {
        setIsAuthenticated(true);
      })
      .catch(err => {
        //console.log(err);
      });
  }, []);

  const authState = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    isActive,
    setIsActive
  };

  //listen for auth events via Cognito
  Hub.listen("auth", data => AuthListener(data, authState));

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser }} {...props} />
  );
};
