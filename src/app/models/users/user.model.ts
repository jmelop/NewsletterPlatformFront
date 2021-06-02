export interface User {
    name: string,
    email: string,
    password: string,
    tags: string[]
}

export interface LogUser {
    email: string,
    password: string,
}