import { StackContext, StaticSite, use } from "sst/constructs"
import {API} from "./APIStack"
import {WebComponents} from "./WebComponentsStack"

export function WebTodo({ stack }: StackContext) {
  const {api} = use(API)
  const {components} = use(WebComponents)

  const todo = new StaticSite(stack, "react", {
    path: "packages/web-todo",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      // Pass in the API endpoint to our app
      API_ENDPOINT: api.url,
      REMOTE_COMPONENTS: components.url || ""
    }
  })

  return {todo}
}
