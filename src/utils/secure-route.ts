import jwt from "jsonwebtoken"
import env from "./env"

type DefaultResponseData = {
  message?: string
  code: number
  data?: any
}

export type DefaultResponse = DefaultResponseData

const secureAPI = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.JWT_SECRET, (err, data) => {
      if (err) reject(new Error("Error verifying token"))
      else resolve(data as string)
    });
  });
}

export default secureAPI
