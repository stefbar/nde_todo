import { useEffect, useState } from 'react'

import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../db/supabaseClient'
import { Database } from '../db/schema'

import Todo from './Todo'
import AddTodo from './AddTodo'
import Footer from './Footer'

import { Flex, Separator } from '@radix-ui/themes'

type Todos = Database['public']['Tables']['todos']['Row']

const Home = ({ session }: { session: Session }) => {

  const [user, setUser] = useState<User | null>(null)
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTaskText, setNewTaskText] = useState<string>('')
  const [errorText, setErrorText] = useState<string | null>('')

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

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true })
      if(error) console.log('error : ', error)
      else setTodos(todos)      
    }
    fetchTodos()
  }, [])

  const deleteTodo = async (id: number) => {
    try {
      await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .throwOnError()
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.log('error : ', error)     
    }
  }

  const addTodo = async (taskText: string) => {
    const task = taskText?.trim()
    if(task?.length) {
      const { data: todo, error } = await supabase
      .from('todos')
      .insert({ task, user_id: session.user.id })
      .select()
      .single()
      if(error) setErrorText(error.message)
      else {
        setTodos([ ...todos, todo])
      }
      setNewTaskText('')
    }
  }

  const editTodo = async ({id, task}: {id: number; task: string}) => {
    try {
      const { data: todo, error } = await supabase
      .from('todos')
      .update({ task })
      .eq('id', id)
      .select()
      .single()
      if(error) setErrorText(error.message)
      else {
        setTodos([ ...todos, todo])
      }
    }
    catch (error) {
      console.log('error : ', error)
    }
  }

  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error)
  }
  
  return(
    <>
      <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
        <Separator orientation="horizontal" size="4" />
      </Flex>
      <Flex direction="column" style={{ width: "100%" }}>
        <AddTodo taskText={newTaskText} setNewTaskText={setNewTaskText} addTodo={addTodo} />
      </Flex>
      <Flex direction="column" gap="3">
        {
          todos.length ?
            <ul className='todosUList' role='list'>
              { todos.map((todo) => {
                return(
                  <Todo  
                    key={todo.id}
                    todo={todo}
                    deleteTodo={() => deleteTodo(todo.id)}
                    editTodo={() => editTodo({ id: todo.id, task: todo.task || '' })}
                  />
                )
              })}
            </ul> :
          <p>No todo yet.</p>
        }
      </Flex>
      
      <Flex direction="column" gap="3">
        { !!errorText && <p>{errorText}</p> }
      </Flex>

      <Footer handleLogout={handleLogout}/>
    </>
  )
}

export default Home