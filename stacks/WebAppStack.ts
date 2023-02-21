import { StackContext, StaticSite, use } from "sst/constructs"
import {API} from "./APIStack"
import {WebComponents} from "./WebComponentsStack"
import {WebTodo} from "./WebTodoStack"

export function WebApp({ stack }: StackContext) {
  const {api} = use(API)
  const {components} = use(WebComponents)
  const {todo} = use(WebTodo)

  new StaticSite(stack, "react", {
    path: "packages/web-app",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      // Pass in the API endpoint to our app
      API_ENDPOINT: api.url,
      REMOTE_COMPONENTS: components.url || "",
      REMOTE_TODO: todo.url || ""
    }
  })
}
