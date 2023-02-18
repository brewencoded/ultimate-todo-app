import { PreSignUpEmailTriggerEvent } from "aws-lambda"

export const handler = (event: PreSignUpEmailTriggerEvent) => {
    event.response.autoConfirmUser = false
    event.response.autoVerifyEmail = false

    const autoConfirm = event.request.validationData?.autoConfirm

    if (autoConfirm) {
        event.response.autoConfirmUser = true
        event.response.autoVerifyEmail = true
    }

    return event
}
