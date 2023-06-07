import loki from "lokijs"

export type MessageType = {
  role: string
  content: string
  name?: string
  image?: string
  parsedMessage?: string
}

export type User = {
  username: string
  email: string
  password: string
  storyLine: MessageType[]
}

export type SettingsType = {
  identity: string
  language: string
}

export default class InMemoryDb {
  private static instance: LokiConstructor

  public static load(filePath = "./local.json"): Promise<void> {
    this.instance = new loki(filePath)

    return new Promise<void>((resolve, reject) => {
      this.instance.loadDatabase({}, err => {
        if (err) reject(err)
        else {
          this.initialize()
          resolve()
        }
      })
    })
  }

  private static initialize() {
    if (!this.instance.getCollection("users")) {
      this.instance.addCollection("users", {indices: "email"})
    }

    if (!this.instance.getCollection("app-settings")) {
      this.instance.addCollection("app-settings", {indices: "identity"})
    }
  }

  public static createDefaultSettings () {
    const appSettings = this.instance.getCollection("app-settings")

    appSettings.insert({
      identity: "settings",
      language: "en"
    })
    this.instance.saveDatabase()
  }

  public static createUser(userData: User): void {
    const users = this.instance.getCollection("users")
    const result = users.by("email", userData.email)

    if (!result) {
      users.insert(userData)
      this.instance.saveDatabase()
    } else throw new Error("Duplicated user!")
  }

  public static getUserInfo(email: string): User {
    const users = this.instance.getCollection("users")
    const result = users.by("email", email)
    if (!result) throw new Error("Can't get-story.ts user!")

    return result
  }

  public static addStoryMessages(email: string, stories: MessageType[]): void {
    const users = this.instance.getCollection("users")
    const user = users.findOne({email})
    user.storyLine = [...user.storyLine, ...stories]
    users.update(user)
    this.instance.saveDatabase()
  }

  public static getUserStoryMessages(email: string): MessageType[] {
    const users = this.instance.getCollection("users")
    const user = users.findOne({email})
    return user.storyLine
  }

  public static resetStory(email: string): void {
    const users = this.instance.getCollection("users")
    const user = users.findOne({email})
    user.storyLine = []
    users.update(user)
    this.instance.saveDatabase()
  }

  public static getSettings(): SettingsType {
    const appSettings = this.instance.getCollection("app-settings")
    return appSettings.findOne()
  }

  public static updateSettings(newSettings: SettingsType): void {
    const appSettings = this.instance.getCollection("app-settings")

    appSettings.clear()
    appSettings.insert({
      identity: "settings",
      language: newSettings.language
    })

    this.instance.saveDatabase()
  }

}
