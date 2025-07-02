export type Todo = {
    _id:string,
    text:string,
    done:boolean,
  }
export type TodoList = {
    user_id?:String
    _id:string,
    name:string,
    data:Todo[]
}