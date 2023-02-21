import { SSTConfig } from "sst"
import { API } from "./stacks/APIStack"
import { Database } from "./stacks/DatabaseStack"
import { WebApp } from "./stacks/WebAppStack"
import { WebComponents } from "./stacks/WebComponentsStack"
import { WebTodo } from "./stacks/WebTodoStack"

export default {
  config() {
    return {
      name: "infra",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Database)
      .stack(API)
      .stack(WebComponents)
      .stack(WebTodo)
      .stack(WebApp)
  },
} satisfies SSTConfig
