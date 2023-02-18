import { StackContext, Table as DynamoDB } from "sst/constructs"

export function Database({ stack }: StackContext) {

    // TODO: configure projection
    const todoTable = new DynamoDB(stack, "Todo", {
        fields: {
            todoId: "string",
            userId: "string",
            description: "string",
            createDate: "string",
            updatedDate: "string",
            dueDate: "string"
        },
        primaryIndex: {
            partitionKey: "todoId",
            sortKey: "userId"
        },
        globalIndexes: {
            userCreateDate: {
                partitionKey: "userId",
                sortKey: "createDate"
            },
            userDueDate: {
                partitionKey: "userId",
                sortKey: "dueDate"
            }
        }
        // TODO: set up stream: true and configure lambda to push to websocket
    })

    const userTable = new DynamoDB(stack, "User", {
        fields: {
            userId: "string",
            email: "string",
            firstName: "string",
            lastName: "string",
            connectionId: "string"
        },
        primaryIndex: {
            partitionKey: "userId"
        }
    })

    stack.addOutputs({
        TodoTableName: todoTable.tableName,
        UserTableName: userTable.tableName
    })

    return { todoTable, userTable }
}