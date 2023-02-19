import { StackContext, Api, use } from "sst/constructs"
import { Auth } from "./AuthStack"
import { Database } from "./DatabaseStack"
import { simpleRouteBuilder } from "./utils/api.utils"
import { createAllowPolicy, createResource, SINGLE_CRUD_ACTIONS } from "./utils/iam.utils"

export function API({ stack }: StackContext) {
  const {todoTable, userTable} = use(Database)
  const {userPool, userPoolClient} = use(Auth)


  const todoTablePolicy = createAllowPolicy(SINGLE_CRUD_ACTIONS, createResource(todoTable))
  const userTablePolicy = createAllowPolicy(SINGLE_CRUD_ACTIONS, createResource(userTable))

  const todoRoutes = simpleRouteBuilder("todo")
  const userRoutes = simpleRouteBuilder("user")

  const api = new Api(stack, "api", {
    routes: {
      ...todoRoutes,
      ...userRoutes
    },
    cors: {
      allowMethods: ["ANY"],
      allowOrigins: ["*"], // TODO: more specific
    },
    authorizers: {
      cognitoAuthorizer: {
        type: "user_pool",
        userPool: {
          id: userPool.userPoolId,
          clientIds: [userPoolClient.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "cognitoAuthorizer",
      authorizationScopes: ["user.id", "user.email"],
      function: {
        environment: {
          TODO_TABLE: todoTable.tableName,
          USER_TABLE: userTable.tableName
        },
        permissions: []
      }
    },
  })

  Object.entries(todoRoutes).forEach(([route, _]) => {
    api.getFunction(route)?.addToRolePolicy(todoTablePolicy)
  })

  Object.entries(userRoutes).forEach(([route, _]) => {
    api.getFunction(route)?.addToRolePolicy(userTablePolicy)
  })

  stack.addOutputs({
    ApiEndpoint: api.url,
  })


  return { api }
}
