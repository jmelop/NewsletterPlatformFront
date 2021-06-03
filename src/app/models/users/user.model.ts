export interface User {
    name: string,
    email: string,
    password: string,
    role?: string,
    tag: string[]
}

export interface LogUser {
    email: string,
    password: string,
}