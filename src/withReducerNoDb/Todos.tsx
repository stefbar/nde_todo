import { useEffect, useState, useReducer } from 'react'

import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../db/supabaseClient'
// import { Database } from '../db/schema'

import TodoItem from './TodoItem'
import Footer from '../components/Footer'

import { Dialog, Flex, TextArea, Button } from '@radix-ui/themes'
import * as Label from '@radix-ui/react-label'
import { PlusIcon } from '@radix-ui/react-icons'
import SubMenu from '../components/SubMenu'

type Todo = {
    id: number
    inserted_at: string
    task: string
    details?: string
    is_complete: boolean
    user_id: string
}

type TodosState = {
    todos: Todo[]
}

type TodosAction = {
    type: string
    payload: Todo
}

type VisibilitySort = 'all' | 'uncompleted' | 'completed'

const Todos = ({ session }: { session: Session }) => {

    const [user, setUser] = useState<User | null>(null)
    const [newTaskText, setNewTaskText] = useState<string>('')
    
    // const [errorText, setErrorText] = useState<string | null>('')

    useEffect(() => {
        setUser(user ?? null)        
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user
                setUser(currentUser ?? null)

            }
        )
        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [user])

    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error)
    }

    const todosReducer = (state: TodosState, action: TodosAction) => {
        switch (action.type) {
            case 'ADD_TODO': {
                return {
                    ...state,
                    todos: [ action.payload, ...state.todos ]
                }
            }
            case 'EDIT_TODO': {
                return {
                    ...state,
                    todos: state.todos.map((todo: Todo) => todo.id === action.payload?.id ? action.payload : todo)
                }
            }
            case 'TOGGLE_TODO': {
                return {
                    ...state,
                    todos: state.todos.map((todo: Todo) => todo === action.payload ? { ...todo, is_complete: !todo.is_complete} : todo)
                }
            }
            case 'DELETE_TODO': {
                return {
                    ...state,
                    todos: state.todos.filter((todo: Todo) => todo !== action.payload)
                }
            }
            case 'DELETE_COMPLETED_TODOS': {
                return {
                    ...state,
                    todos: state.todos.filter((todo: Todo) => !todo.is_complete)
                }
            }
            default: {
                throw new Error('unhandled action: ' + action.type)
            }
        }
    }

    const [state, dispatch] = useReducer(todosReducer, {todos: []})

    const onAddTodo = () => {
        const newTodo = {
            id: Date.now(),
            inserted_at: new Date().toLocaleString("fr-FR"),
            task: newTaskText,
            is_complete: false,
            user_id: session.user.id                                     
        }
        dispatch({ type: 'ADD_TODO', payload: newTodo })
        setNewTaskText('')
    }

    const onDeleteCompletedTodos = () => {
        dispatch({
            type: 'DELETE_COMPLETED_TODOS',
            payload: state.todos[0]
        })
        
    }

    const [visibilitySort, setVisibilitySort] = useState<VisibilitySort>('all')
    const sortTodos = () => {
        switch (visibilitySort) {
            case 'all': {
                return (state.todos.map((todo) =>
                    <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
                ))
            }
            case 'uncompleted': {
                const uncompletedTodos = state.todos.filter((todo: Todo) => !todo.is_complete)
                return (uncompletedTodos.map((todo) =>
                    <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
                ))
            }
            case 'completed': {
                const completedTodos = state.todos.filter((todo: Todo) => todo.is_complete)
                const renderedCompletedTodos = <>
                        {(completedTodos.map((todo) =>
                            <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
                        ))}
                        <Button
                            id='clearCompletedTodosBtn'
                            className='todoActionBtn'
                            onClick={() => onDeleteCompletedTodos()}
                        >
                            0
                            {/* Clear all completed todos */}
                        </Button>                
                    </>
                if(completedTodos.length === 0) {
                    return null
                } else {
                    return renderedCompletedTodos
                }                          
            }
            // break
            default: {
                throw new Error('unhandled visibilitySort: ' + visibilitySort)
            }
        }
    }

    // const onEditTodo = (editedTodo: Todo) => {
    //     dispatch({
    //         type: 'EDIT_TODO',
    //         payload: { ...editedTodo }
    //     })
        // setNewTaskText('')
    // }

    return (
        <>
            <h1>Todos</h1>
            <SubMenu  setVisibilitySort={setVisibilitySort} />
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button id='addTodoBtn' className='todoActionBtn'>
                        <PlusIcon />
                    </Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(),
                            onAddTodo()
                        }}
                    >
                        <Dialog.Title>Add todo</Dialog.Title>
                        
                        <Flex direction="column" gap="3">
                            <Label.Root htmlFor='todoContent'>
                                Content
                            </Label.Root>
                            <TextArea
                                id='todoContent'
                                placeholder="Type todo's content"
                                value={newTaskText}
                                onChange={(e) => {
                                    setNewTaskText(e.target.value)
                                }}
                            />
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </Dialog.Close>
                            <Dialog.Close>
                                <Button type='submit'>
                                    Save
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
            
            <Flex className='todos-container' direction="column" gap="3">
                { state.todos.length ?
                    <ul className='todosUList' role='list'>
                        { sortTodos() }
                    </ul>
                : <p>No todos yet</p> }
            </Flex>

            {/* <Flex direction="column" gap="3">
                { !!errorText && <p>{errorText}</p> }
            </Flex> */}

            <Footer handleLogout={handleLogout}/>
        </>
    )
}

export default Todos