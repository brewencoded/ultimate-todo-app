import { PolicyStatement, Effect} from "aws-cdk-lib/aws-iam"
import { Stack, Table as DynamoDB } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam"

export const SINGLE_CRUD_ACTIONS = ["GetItem", "PutItem", "Query", "Scan", "UpdateItem"]
  .map(action => `dynamodb:${action}`)
export const BATCH_CRUD_ACTIONS = ["BatchGetItem", "BatchWriteItem", ]
  .map(action => `dynamodb:${action}`)
export const ALL_CRUD_ACTIONS = [...SINGLE_CRUD_ACTIONS, ...BATCH_CRUD_ACTIONS]

export const createAllowPolicy = (actions: string[], resources: string[]) =>
  new PolicyStatement({
    actions,
    effect: Effect.ALLOW,
    resources
  })

export const createResource = (table: DynamoDB) => [
  table.tableArn,
  `${table.tableArn}/index/*`
]
