/**
 * A payload of a JWT token
 */
export interface IJwtPayload {
    iss: string
    sub: string
    iat: number
    exp: number
}
