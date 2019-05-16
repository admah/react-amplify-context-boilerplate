import React from "react";
import { Auth, Hub } from "aws-amplify";

type AuthData = {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string;
  idToken: string;
};

export const AuthContext = React.createContext({
  isAuthenticated: false,
  isLoading: true,
  username: "",
  idToken: ""
});

const AuthListener = (data, setAuthData) => {
  const authData = data.payload.data;

  switch (data.payload.event) {
    case "signIn":
      console.log(data);
      const signInSessionData = data.signInUserSession;

      setAuthData({
        isAuthenticated: true,
        isLoading: false,
        username: authData.attributes.email,
        idToken: signInSessionData.getIdToken().getJwtToken()
      });
      break;
    case "signUp":
      //console.log("signUp: ", data.payload);
      const signUpSessionData = data.signUpUserSession;

      setAuthData({
        isAuthenticated: true,
        isLoading: false,
        username: authData.attributes.email,
        idToken: signUpSessionData.getIdToken().getJwtToken()
      });
      break;
    case "signOut":
      //console.log("signOut: ", data.payload);

      setAuthData({
        isAuthenticated: false,
        isLoading: false,
        username: "",
        idToken: ""
      });
      break;
    case "signIn_failure":
      console.log("user sign in failed");
      break;
  }
};

export const AuthProvider = props => {
  const [authData, setAuthData] = React.useState<AuthData>({
    isAuthenticated: false,
    isLoading: true,
    username: "",
    idToken: ""
  });

  React.useEffect(() => {
    //listen for auth events via Cognito
    Hub.listen("auth", data => AuthListener(data, authData));

    const getCurrentUserData = async () => {
      await Auth.currentAuthenticatedUser()
        .then(data => {
          const signInSessionData = data.getSignInUserSession();

          return setAuthData({
            isAuthenticated: true,
            isLoading: false,
            username: data.attributes.email,
            idToken: signInSessionData.getIdToken().getJwtToken()
          });
        })
        .catch(err => {
          //console.log(err);
          return setAuthData({
            isAuthenticated: false,
            isLoading: false,
            username: "",
            idToken: ""
          });
        });
    };

    getCurrentUserData();
  }, []);

  return <AuthContext.Provider value={authData} {...props} />;
};
