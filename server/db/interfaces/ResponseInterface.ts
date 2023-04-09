interface GenericResponse<T> {
    result: T
    error?: string
}

export type ResponseWrapper<T> = Promise<GenericResponse<T>> 