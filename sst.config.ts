import { SSTConfig } from "sst"
import { API } from "./stacks/APIStack"
import { Database } from "./stacks/DatabaseStack"
import { Web } from "./stacks/WebStack"

export default {
  config(_input) {
    return {
      name: "infra",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Database)
      .stack(API)
      .stack(Web)
  },
} satisfies SSTConfig
