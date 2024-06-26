import { useReducer } from 'react'
import TodoItem from './TodoItem'

type Todo = {
    id: number
    inserted_at: string
    task: string
    details?: string
    is_complete: boolean
    user_id: string
}

const Todos = () => {
    
    const todosReducer = (state: Todo[], action: {type: string; payload: Todo}) => {
        switch (action.type) {
            case 'add':
                return [...state, action.payload]
            case 'edit':
                return state.map((todo: Todo) => todo.id === action.payload.id ? action.payload : todo)
            case 'delete':
                return state.filter((todo: Todo) => todo.id !== action.payload.id)
            default:
                return state
        }
    }
    const [todos, dispatch] = useReducer(todosReducer, [])

    return (
        <>
            <h1>Todos</h1>
            <button
                onClick={() => dispatch({type: 'add', payload: {id: 1, inserted_at: Date.now().toString(), task: 'hello', is_complete: false, user_id: '123'}})}
            >
                Add Todo
            </button>
            <ul>
                { todos.map((todo) => todos.length ? <li key={todo.id}><TodoItem /></li> : <p>No todos yet</p>) }

            </ul>
        </>
    )
}

export default Todos