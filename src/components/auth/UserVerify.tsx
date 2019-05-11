import React from "react";
import queryString from "query-string";
import { Auth } from "aws-amplify";
import { Button, Row, Col, Typography } from "antd";

const { Text, Title } = Typography;

type UserVerifyProps = {
  location: {
    search: string;
  };
};

const sendNewCode = search => {
  const searchParams = queryString.parse(search);
  Auth.resendSignUp(`adam.murray@teamairship.com`).then(data =>
    console.log(data)
  );
};

const UserVerify: React.FC<UserVerifyProps> = props => {
  const [userVerified, setUserVerified] = React.useState(false);
  const [userNeedsNewCode, setUserNeedsNewCode] = React.useState(false);

  React.useEffect(() => {
    if (props.location.search) {
      const searchParams = queryString.parse(props.location.search);

      if (searchParams.confirmation_code) {
        Auth.confirmSignUp(
          `${searchParams.user_name}`,
          `${searchParams.confirmation_code}`
        )
          .then(() => {
            console.log("email verified");
            setUserVerified(true);
          })
          .catch(e => {
            console.log("ERROR: ", e);
            if (e.name === "ExpiredCodeException") {
              setUserNeedsNewCode(true);
            }
            Auth.resendSignUp(`${searchParams.user_name}`);
          });
      }
    }
  }, [props.location.search]);
  console.log(props);
  return (
    <Row>
      <Col span={24}>
        <Title level={2} data-testid="UserVerifyHeading">
          {userVerified
            ? "Your email has been verified."
            : "There was an issue verifying your email. Please try again."}
        </Title>
        {userVerified && <Text>Thank you.</Text>}

        {userNeedsNewCode && (
          <Button onClick={() => sendNewCode(props.location.search)}>
            Send new code
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default UserVerify;
