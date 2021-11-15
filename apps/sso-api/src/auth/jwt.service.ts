import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PublicAccountEntity } from './account.entity'
import * as jwt from 'jsonwebtoken'

type JWTPayload = Pick<PublicAccountEntity, 'id' | 'publicId'>

@Injectable()
export class JWTService {
  generateAccessToken(user: PublicAccountEntity): string {
    const payload: JWTPayload = { id: user.id, publicId: user.publicId }

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
  }

  verifyAccessToken(token: string): Promise<JWTPayload> {
    return new Promise<JWTPayload>((resolve) => {
      jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, payload: JWTPayload) => {
          if (err) {
            console.error(err)
            throw new HttpException(
              'Access token is invalid',
              HttpStatus.UNAUTHORIZED,
            )
          }

          resolve(payload)
        },
      )
    })
  }

  // TODO: implement refresh tokens
}
