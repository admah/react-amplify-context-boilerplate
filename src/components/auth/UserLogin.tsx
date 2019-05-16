import React from "react";
import { Auth } from "aws-amplify";
import {
  ErrorMessage,
  Formik,
  FormikActions,
  FormikProps,
  Field,
  FieldProps
} from "formik";
import * as yup from "yup";
import { Form, Input, Button, Row } from "antd";
import { Link } from "react-router-dom";

type UserLoginValues = {
  email: string;
  password: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address."),
  password: yup.string().required("Please enter a password.")
});

export const UserLogin: React.FC = props => {
  const [loginError, setLoginError] = React.useState(false);

  const userLoginSubmit = async values => {
    await Auth.signIn({
      username: values.email,
      password: values.password
    })
      .then(data => {
        (props as any).history.push("/dashboard");
      })
      .catch(err => setLoginError(true));
  };

  return (
    <div className="user-login">
      <Row>
        <h1 data-testid="UserLoginHeading">User Login</h1>
        {loginError && (
          <div>There was an error. Please try logging in again.</div>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: UserLoginValues,
            actions: FormikActions<UserLoginValues>
          ) => {
            userLoginSubmit(values);
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<UserLoginValues>) => (
            <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
              <Field
                name="email"
                render={({ field, form }: FieldProps<UserLoginValues>) => (
                  <Form.Item label="Email">
                    <Input type="text" {...field} data-testid="emailField" />
                    {form.errors.email && form.touched.email ? (
                      <p style={{ color: "#ff0000" }}>{form.errors.email}</p>
                    ) : null}
                  </Form.Item>
                )}
              />
              <Field
                name="password"
                render={({ field, form }: FieldProps<UserLoginValues>) => (
                  <Form.Item label="Password">
                    <Input
                      type="password"
                      {...field}
                      data-testid="passwordField"
                    />
                    {form.errors.password && form.touched.password ? (
                      <p style={{ color: "#ff0000" }}>{form.errors.password}</p>
                    ) : null}
                  </Form.Item>
                )}
              />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  data-testid="submitButton"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          )}
        />
      </Row>
      <Row>
        <Link to="/user/password-forgot">Forgot password?</Link>
      </Row>
    </div>
  );
};

export default UserLogin;
