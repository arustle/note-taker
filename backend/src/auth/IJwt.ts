import { IJwtPayload } from './IJwtPayload'
import { JwtHeader } from 'jsonwebtoken'

/**
 * Interface representing a JWT token
 */
export interface IJwt {
    header: JwtHeader
    payload: IJwtPayload
}
