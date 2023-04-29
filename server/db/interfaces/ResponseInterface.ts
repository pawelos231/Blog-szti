interface GenericResponse<T> {
    result: T | undefined
    error?: string
}

export type ResponseWrapper<T> = Promise<GenericResponse<T>> 
