const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "wholesale-ls-api-dev-attachmentsbucket-tjmwoivk462z",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://odr4675xi2.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FBdk04SEB",
    APP_CLIENT_ID: "2k3ogjql70plj22fjk01paluo7",
    IDENTITY_POOL_ID: "us-east-1:1523a432-3394-4c79-b9d2-2195f433ac82",
  },
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "wholesale-ls-api-prod-attachmentsbucket-xdvozdh8555g",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ak85kp5o58.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_GPM5j8HcA",
    APP_CLIENT_ID: "2f3fk13stqoffugc32mfgm73s2",
    IDENTITY_POOL_ID: "us-east-1:1e82f591-a64a-4888-b502-656ebe28a52f",
  },
};

// Default to dev if not set
const config = process.env.NODE_ENV === "production" ? prod : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
