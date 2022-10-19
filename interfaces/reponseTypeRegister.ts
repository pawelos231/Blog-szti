export type LoggingInterfaceSchema =  {
    text: string,
    status: number
}
export type LoggingInterface = {
    message: LoggingInterfaceSchema
}
export type ReposneInterface = {
    message: LoggingInterfaceSchema
    token: any | null
}