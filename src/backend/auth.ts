import jsonwebtoken from "jsonwebtoken"

import Database, {User} from "./modules/Database"
import env from "../utils/env"
import {DefaultResponse} from "../utils/secure-route"

export const register = (
  {username = "", email = "", password = ""} :
  {username: string, email: string, password: string}
): DefaultResponse => {
  try {
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      const user: User = {
        username,
        email,
        password,
        storyLine: []
      }

      Database.createUser(user)
      return {message: "Successfully created new user!", code: 200}
    }
    else throw new Error("Bad credentials!")
  }
  catch (error: any) {
    console.log(error?.message)
    return {message: error?.message ?? "", code: 500}
  }
}

export const login = (
  {email = "", password = ""}:
  {email: string, password: string}
): DefaultResponse => {
  try {
    if (email.length > 0 && password.length > 0) {
      const user = Database.getUserInfo(email)

      if (user.password === password) {
        const token = jsonwebtoken.sign(user.email, env.JWT_SECRET)

        const messages = Database.getUserStoryMessages(email)

        return {
          data: {
            token,
            isNewUser: user.storyLine.length === 0,
            lastMessage: messages.at(-1)?.parsedMessage,
            username: user.username
          },
          code: 200
        }
      }
      else throw new Error("Bad credentials!")
    }
    else throw new Error("Bad credentials!")
  }
  catch (error: any) {
    console.log(error?.message)
    return {message: error?.message ?? "", code: 500}
  }
}
