import { StackContext, Function as LambdaFunction } from  "sst/constructs"
import { Duration, RemovalPolicy } from "aws-cdk-lib"
import { AccountRecovery, ClientAttributes, Mfa, OAuthScope, StringAttribute, UserPool, UserPoolClient, UserPoolClientIdentityProvider, VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";

export function Auth({ stack }: StackContext) {
    const prefixName = "todo-app" // TODO: move to logicalPrefixedName
    /*
     * User Pool
     */
    const smsVerificationMessage = "Your temporary application verification code is {####}";
    const emailVerificationSubject = "Temporary application password";
    const emailVerificationMessage = "Your temporary application verification code is {####}";

    const userpoolClientRefreshTokenValidity =
      parseInt(process.env.UserpoolClientRefreshTokenValidity!) || 180;

    const cognitoAuthDomain = process.env.CognitoAuthDomain || "authdomain";

    const preSignUp = new LambdaFunction(stack, "preSignup", {
      handler: "packages/functions/src/preSignUp.handler",
      logRetention: "one_month",
    });

    const userPool = new UserPool(stack, "UserPool", {
      userPoolName: prefixName,
      userVerification: {
        emailSubject: emailVerificationSubject,
        emailBody: emailVerificationMessage,
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage: smsVerificationMessage,
      },
      autoVerify: {
        email: true,
        phone: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        role: new StringAttribute({ mutable: true }),
      },
      mfa: Mfa.OPTIONAL,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireDigits: true,
        requireSymbols: true,
        requireUppercase: true,
      },
      enableSmsRole: true,
      signInAliases: {
        email: true,
        username: false,
      },
      selfSignUpEnabled: true,
      lambdaTriggers: {
        preSignUp,
      },
      mfaSecondFactor: {
        sms: true,
        otp: false,
      },
      accountRecovery: AccountRecovery.PHONE_AND_EMAIL,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    /*
     * User Pool Client
     */
    const clientReadAttributes = new ClientAttributes()
      .withStandardAttributes({ email: true })
      .withCustomAttributes("custom:role");
    const clientWriteAttributes = new ClientAttributes()
      .withStandardAttributes({ email: true })
      .withCustomAttributes("custom:role");

    const userPoolClient = new UserPoolClient(stack, "UserPoolClient", {
      userPool,
      userPoolClientName: prefixName,
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
      refreshTokenValidity: Duration.days(userpoolClientRefreshTokenValidity),
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [OAuthScope.OPENID, OAuthScope.PROFILE, OAuthScope.EMAIL],
        callbackUrls: ["http://localhost:3000/login"],
        logoutUrls: ["http://localhost:3000/logout"],
      },
      generateSecret: false,
    });

    userPool.addDomain("CognitoDomain", {
      cognitoDomain: {
        domainPrefix: prefixName,
      },
    });

    /*
     * Admin User Pool Client
     * Used by cloud Lambdas for administrative functions.
     */
    new UserPoolClient(stack, "UserPoolAdminClient", {
      userPool,
      userPoolClientName: prefixName,
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
      refreshTokenValidity: Duration.days(1),
      authFlows: {
        adminUserPassword: true,
      },
      supportedIdentityProviders: [UserPoolClientIdentityProvider.COGNITO],
      generateSecret: false,
    });

    /*
     * Outputs
     */
    stack.addOutputs({
        UserPoolArn: userPool.userPoolArn,
        UserPoolId: userPool.userPoolId,
        UserPoolClientId: userPoolClient.userPoolClientId,
        UserPoolClient: userPoolClient.userPoolClientName,
        CognitoAuthDomain: cognitoAuthDomain,
        CognitoClientID: userPoolClient.userPoolClientId
    })
}