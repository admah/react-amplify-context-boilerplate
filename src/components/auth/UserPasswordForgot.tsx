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

type UserPasswordForgotValues = {
  email: string;
};

type ConfirmationCodeValues = {
  confirmationCode: string;
  password: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address.")
});

const codeValidationSchema = yup.object().shape({
  confirmationCode: yup.string().required("Please enter a confirmation code."),
  password: yup
    .string()
    .min(8, "Password must be a minimum of 8 characters.")
    .required("Please enter a password.")
});

export const UserPasswordForgot: React.FC = props => {
  const [submitError, setSubmitError] = React.useState(false);
  const [userSubmitSuccess, setUserSubmitSuccess] = React.useState(false);
  const [resetSubmitSuccess, setResetSubmitSuccess] = React.useState(false);
  const [forgotUser, setForgotUser] = React.useState("");

  const userPasswordForgotSubmit = async values => {
    await Auth.forgotPassword(values.email)
      .then(data => {
        setUserSubmitSuccess(true);
        setForgotUser(values.email);
      })
      .catch(err => setSubmitError(true));
  };

  const confirmationCodeSubmit = async values => {
    await Auth.forgotPasswordSubmit(
      forgotUser,
      values.confirmationCode,
      values.password
    )
      .then(data => setResetSubmitSuccess(true))
      .catch(err => setSubmitError(true));
  };

  return (
    <div className="user-password-forgot">
      <Row>
        <h1 data-testid="UserPasswordForgotHeading">Forgot Password?</h1>
        {submitError && <div>There was an error. Please try again.</div>}
        {resetSubmitSuccess && (
          <div>
            Your password has been reset successfully. Please click{" "}
            <a href="/user/login">here</a> to log in.
          </div>
        )}

        {userSubmitSuccess && !resetSubmitSuccess && (
          <React.Fragment>
            <div>Please check your email for a reset code.</div>
            <Formik
              initialValues={{ confirmationCode: "", password: "" }}
              validationSchema={codeValidationSchema}
              onSubmit={(
                values: ConfirmationCodeValues,
                actions: FormikActions<ConfirmationCodeValues>
              ) => {
                confirmationCodeSubmit(values);
                actions.setSubmitting(false);
              }}
              render={(formikBag: FormikProps<ConfirmationCodeValues>) => (
                <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
                  <Field
                    name="confirmationCode"
                    render={({
                      field,
                      form
                    }: FieldProps<ConfirmationCodeValues>) => (
                      <Form.Item label="Reset Code">
                        <Input
                          type="text"
                          {...field}
                          data-testid="confirmationCodeField"
                        />
                        {form.errors.confirmationCode &&
                        form.touched.confirmationCode ? (
                          <p style={{ color: "#ff0000" }}>
                            {form.errors.confirmationCode}
                          </p>
                        ) : null}
                      </Form.Item>
                    )}
                  />
                  <Field
                    name="password"
                    render={({
                      field,
                      form
                    }: FieldProps<ConfirmationCodeValues>) => (
                      <Form.Item label="New Password">
                        <Input type="password" {...field} />
                        {form.errors.password && form.touched.password ? (
                          <p style={{ color: "#ff0000" }}>
                            {form.errors.password}
                          </p>
                        ) : null}
                      </Form.Item>
                    )}
                  />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="password-forgot-form-button"
                      data-testid="submitButton"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              )}
            />
          </React.Fragment>
        )}

        {!userSubmitSuccess && (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(
              values: UserPasswordForgotValues,
              actions: FormikActions<UserPasswordForgotValues>
            ) => {
              userPasswordForgotSubmit(values);
              actions.setSubmitting(false);
            }}
            render={(formikBag: FormikProps<UserPasswordForgotValues>) => (
              <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
                <Field
                  name="email"
                  render={({
                    field,
                    form
                  }: FieldProps<UserPasswordForgotValues>) => (
                    <Form.Item label="Email">
                      <Input type="text" {...field} data-testid="emailField" />
                      {form.errors.email && form.touched.email ? (
                        <p style={{ color: "#ff0000" }}>{form.errors.email}</p>
                      ) : null}
                    </Form.Item>
                  )}
                />
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="password-forgot-form-button"
                    data-testid="submitButton"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          />
        )}
      </Row>
    </div>
  );
};

export default UserPasswordForgot;
