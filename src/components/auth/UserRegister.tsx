import React from "react";
import { StripeProvider, Elements, CardElement } from "react-stripe-elements";
import { Formik, FormikActions, FormikProps, Field, FieldProps } from "formik";
import * as yup from "yup";
import { Form, Input, Select, Button, Row, Typography } from "antd";

const { Title } = Typography;
const Option = Select.Option;

type UserRegisterValues = {
  fullName: string;
  streetAddress: string;
  state: string;
  zipCode: string;
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Please enter your name."),
  streetAddress: yup.string().required("Please enter your street address."),
  state: yup.string().required("Please select your state."),
  zipCode: yup.string().required("Please enter your zip code.")
});

const UserRegister: React.FC = () => {
  const userRegisterSubmit = values => {
    console.log(values);
  };

  React.useEffect(() => {
    // We want to check if user has Cognito account but no Stripe subscription.
    // if so, proceeed
    // else, redirect user to initial view of UserCreate.
  }, []);

  return (
    <StripeProvider apiKey="pk_test_6XcFKZSyUhhU84QKY711WCLQ">
      <div className="user-register">
        <Row>
          <Title level={2} data-testid="UserRegisterHeading">
            Setup Subscription
          </Title>
          <Formik
            initialValues={{
              fullName: "",
              streetAddress: "",
              state: "",
              zipCode: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(
              values: UserRegisterValues,
              actions: FormikActions<UserRegisterValues>
            ) => {
              userRegisterSubmit(values);
              actions.setSubmitting(false);
            }}
            render={(formikBag: FormikProps<UserRegisterValues>) => (
              <Form layout="vertical" onSubmit={formikBag.handleSubmit}>
                <Title level={4}>Billing Information</Title>
                <Field
                  name="fullName"
                  render={({ field, form }: FieldProps<UserRegisterValues>) => (
                    <Form.Item label="Full Name">
                      <Input type="text" {...field} />
                      {form.errors.fullName && form.touched.fullName ? (
                        <p style={{ color: "#ff0000" }}>
                          {form.errors.fullName}
                        </p>
                      ) : null}
                    </Form.Item>
                  )}
                />
                <Field
                  name="streetAddress"
                  render={({ field, form }: FieldProps<UserRegisterValues>) => (
                    <Form.Item label="Street Address">
                      <Input type="text" {...field} />
                      {form.errors.streetAddress &&
                      form.touched.streetAddress ? (
                        <p style={{ color: "#ff0000" }}>
                          {form.errors.streetAddress}
                        </p>
                      ) : null}
                    </Form.Item>
                  )}
                />
                <Field
                  name="state"
                  render={({ field, form }: FieldProps<UserRegisterValues>) => (
                    <Form.Item label="State">
                      <Select
                        showSearch
                        style={{ width: 120 }}
                        placeholder="State"
                        {...field}
                      >
                        <Option value="AL">Alabama</Option>
                        <Option value="AK">Alaska</Option>
                        <Option value="AZ">Arizona</Option>
                        <Option value="AR">Arkansas</Option>
                        <Option value="CA">California</Option>
                        <Option value="CO">Colorado</Option>
                        <Option value="CT">Connecticut</Option>
                        <Option value="DE">Delaware</Option>
                        <Option value="DC">District of Columbia</Option>
                        <Option value="FL">Florida</Option>
                        <Option value="GA">Georgia</Option>
                        <Option value="HI">Hawaii</Option>
                        <Option value="ID">Idaho</Option>
                        <Option value="IL">Illinois</Option>
                        <Option value="IN">Indiana</Option>
                        <Option value="IA">Iowa</Option>
                        <Option value="KS">Kansas</Option>
                        <Option value="KY">Kentucky</Option>
                        <Option value="LA">Louisiana</Option>
                        <Option value="ME">Maine</Option>
                        <Option value="MD">Maryland</Option>
                        <Option value="MA">Massachusetts</Option>
                        <Option value="MI">Michigan</Option>
                        <Option value="MN">Minnesota</Option>
                        <Option value="MS">Mississippi</Option>
                        <Option value="MO">Missouri</Option>
                        <Option value="MT">Montana</Option>
                        <Option value="NE">Nebraska</Option>
                        <Option value="NV">Nevada</Option>
                        <Option value="NH">New Hampshire</Option>
                        <Option value="NJ">New Jersey</Option>
                        <Option value="NM">New Mexico</Option>
                        <Option value="NY">New York</Option>
                        <Option value="NC">North Carolina</Option>
                        <Option value="ND">North Dakota</Option>
                        <Option value="OH">Ohio</Option>
                        <Option value="OK">Oklahoma</Option>
                        <Option value="OR">Oregon</Option>
                        <Option value="PA">Pennsylvania</Option>
                        <Option value="RI">Rhode Island</Option>
                        <Option value="SC">South Carolina</Option>
                        <Option value="SD">South Dakota</Option>
                        <Option value="TN">Tennessee</Option>
                        <Option value="TX">Texas</Option>
                        <Option value="UT">Utah</Option>
                        <Option value="VT">Vermont</Option>
                        <Option value="VA">Virginia</Option>
                        <Option value="WA">Washington</Option>
                        <Option value="WV">West Virginia</Option>
                        <Option value="WI">Wisconsin</Option>
                        <Option value="WY">Wyoming</Option>
                      </Select>
                      {form.errors.state && form.touched.state ? (
                        <p style={{ color: "#ff0000" }}>{form.errors.state}</p>
                      ) : null}
                    </Form.Item>
                  )}
                />
                <Field
                  name="zipCode"
                  render={({ field, form }: FieldProps<UserRegisterValues>) => (
                    <Form.Item label="Zip Code">
                      <Input type="text" style={{ width: 120 }} {...field} />
                      {form.errors.zipCode && form.touched.zipCode ? (
                        <p style={{ color: "#ff0000" }}>
                          {form.errors.zipCode}
                        </p>
                      ) : null}
                    </Form.Item>
                  )}
                />
                <Title level={4}>Payment Details</Title>
                <Elements>
                  <label>
                    <CardElement style={{ base: { fontSize: "18px" } }} />
                  </label>
                </Elements>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                  >
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            )}
          />
        </Row>
      </div>
    </StripeProvider>
  );
};

export default UserRegister;
