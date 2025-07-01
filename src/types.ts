export type Todo = {
    id:string,
    text:string,
    done:boolean,
  }
export type TodoList = {
    _id:string,
    name:string,
    data:Todo[]
}