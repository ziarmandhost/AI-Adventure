import { contextBridge, ipcRenderer } from "electron"

declare global {
  interface Window {
    API: {
      invoke: (eventName: string, data ?: any) => Promise<any>
    }
  }
}

const API = {
  async invoke (eventName: string, data: any) {
    return await ipcRenderer.invoke(eventName, data)
  }
}

contextBridge.exposeInMainWorld("API", API)
