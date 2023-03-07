type LoggingInterfaceSchema = {
    text: string,
    status: number
}

export type LoggingInterface = {
    message: LoggingInterfaceSchema
}

export type ReposneInterface = {
    message: LoggingInterfaceSchema
    token: string
    name: string
}
export interface Unathorized {
    text: string;
  }