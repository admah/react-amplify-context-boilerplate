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
  password: yup
    .string()
    .min(8, "Password must be a minimum of 8 characters.")
    .required("Please enter a password.")
});

export const UserCreate: React.FC = props => {
  const createAccountSubmit = values => {
    Auth.signUp({
      username: values.email,
      password: values.password
    })
      .then(data => (props as any).history.push("/user/register"))
      .catch(err => console.log(err));
  };

  return (
    <div className="user-create">
      <Row>
        <h1 data-testid="UserCreateHeading">Create Account</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: UserLoginValues,
            actions: FormikActions<UserLoginValues>
          ) => {
            createAccountSubmit(values);
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<UserLoginValues>) => (
            <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
              <Field
                name="email"
                render={({ field, form }: FieldProps<UserLoginValues>) => (
                  <Form.Item label="Email">
                    <Input type="text" {...field} />
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
                    <Input type="password" {...field} />
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
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          )}
        />
      </Row>
      <Row>
        <Link to="/user/login">Already have an account? Sign in here.</Link>
      </Row>
    </div>
  );
};

export default UserCreate;
