interface Todo {id: number, text: string, userId: number, createdAt: string, updatedAt: string}
interface User {id: number, username: string, password:string, createdAt: string, updatedAt: string}

export {
    Todo,
    User
}