import { StackContext, Api, use } from "sst/constructs";
import { Database } from "./DatabaseStack";

export function API({ stack }: StackContext) {
  const {todoTable, userTable} = use(Database)

  const api = new Api(stack, "api", {
    routes: {
      "GET /api/todo": "packages/functions/src/getTodo.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return { api }
}
