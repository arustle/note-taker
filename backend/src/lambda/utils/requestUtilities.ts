import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../../auth/utils";

export function getUserId(event: APIGatewayProxyEvent): string {
    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]

    return parseUserId(jwtToken)
}

export function removeEmptyAttributes (value: any) {
    return Object.getOwnPropertyNames(value)
        .reduce((o, k) => {
            const v = value[k];
            if (typeof (v) !== 'string' || v !== '') {
                if (typeof (v) === 'object') {
                    o[k] = removeEmptyAttributes(v);
                } else {
                    o[k] = v;
                }
            }
            return o;
        }, {});
}