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