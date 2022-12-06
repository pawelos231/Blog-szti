export interface UserRegister {
    name: string,
    email: string,
    password: string
}

export interface UserLogin{
    email: string
    password: string
}

export interface Token{
    Name: string
    Email: string
}

export interface ReceivedLoginData {
    _id: any
    Name: string
    Password: string
    Email: string
    __v: string
}