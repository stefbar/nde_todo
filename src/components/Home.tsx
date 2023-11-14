import { useEffect, useState } from 'react'

import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../db/supabaseClient'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../db/schema'

import Todo from './Todo'
import AddTodo from './AddTodo'
import Footer from './Footer'

import { Flex, Separator } from '@radix-ui/themes'

type Todos = Database['public']['Tables']['todos']['Row']

const Home = ({ session }: { session: Session }) => {
  // const Home = ({ user }: { user: User }) => {
  // const supabase = useSupabaseClient<Database>()
  const [user, setUser] = useState<User | null>(null)
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTaskText, setNewTaskText] = useState<string>('')
  const [errorText, setErrorText] = useState<string | null>('')

  useEffect(() => {
    // const user = supabase.auth.getUser()
    // user.then(({ data: { user }}) => {
    //   setUser(session?.user ?? null)
    // })
    setUser(session.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
      }
    )

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [session.user])

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
  }, [supabase])

// setTodos(todos as Todos[])

  const deleteTodo = async (id: number) => {
    try {
      await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .throwOnError()

      setTodos(todos.filter((x) => x.id !== id))
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
      setTodos([ ...todos, todo])}
      setNewTaskText('')
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

      <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
        <Separator orientation="horizontal" size="4" />
      </Flex>

      <Flex direction="column" gap="3">
        {
          todos.length ?
            <ul role='list'>
              { todos.map((todo) => {
                return(
                  <Todo  
                    key={todo.id}
                    todo={todo}
                    deleteTodo={() => deleteTodo(todo.id)}
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