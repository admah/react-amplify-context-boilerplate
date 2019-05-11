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

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter an email address.")
});

export const UserPasswordForgot: React.FC = props => {
  const [submitError, setSubmitError] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const userPasswordForgotSubmit = async values => {
    await Auth.forgotPassword(values.email)
      .then(data => setSubmitSuccess(true))
      .catch(err => setSubmitError(true));
  };

  return (
    <div className="user-login">
      <Row>
        <h1 data-testid="UserPasswordForgotHeading">Forgot Password?</h1>
        {submitError && <div>There was an error. Please try again.</div>}
        {submitSuccess && (
          <div>Please check your email to reset your password.</div>
        )}
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
      </Row>
    </div>
  );
};

export default UserPasswordForgot;
