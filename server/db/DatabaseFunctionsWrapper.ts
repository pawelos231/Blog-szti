type GenericResults<K> =  {
    result: K
    error: string | undefined
}


export const WrapperForQuery = async <T extends Function, K extends Object>(func: T): Promise<K> => {
    const { result, error }: GenericResults<K> = await func();
    if (error) {
        throw new Error(error)
    }
    return result
}