import { useRef, useState } from 'react'
import { supabase } from '../supabaseClient'

import Todo from './Todo'
import AddTodo from './AddTodo'

import { Flex, Separator } from '@radix-ui/themes'
import RecoverPassword from './RecoverPwd'

const Home = ({ user }) => {

  const [recoveryToken, setRecoveryToken] = useState(null)
  const [todos, setTodos] = useState([])
  const [errorText, setErrorText] = useState('')

  const newTaskTextRef = useRef()

  useEffect(() => {
    let url = window.location.hash
    let query = url.slice(1)
    let result = {}

    query.split('&').forEach((part) => {
      const item = part.split('=')
      result[item[0]] = decodeURIComponent(item[1])
    })

    if(result.type === 'recovery') {
      setRecoveryToken(result.access_token)
    }
  
    fetchTodos().catch(console.error)
  }, [])

  const fetchTodos = async () => {
    let {data: todos, error} = await supabase
    .from('todos')
    .select('*')
    .order('id', { ascending: false })

    if(error) console.log('error : ', error)
    else setTodos(todos)
  }

  const deleteTodo = async (id) => {
    try {
      await supabase.from('todos').delete().eq('id', id)
      setTodos(todos.filter((x) => x.id !== id))
    } catch (error) {
      console.log('error : ', error)
      
    }
  }

  const addTodo = async () => {
    let taskText = newTaskTextRef.current.value
    let task = taskText.trim()

    if(task.length <= 3) {
      setErrorText('Task length should be more than 3 !')
    } else {
      let { data: todo, error } = await supabase
      .from('todos')
      .insert({ task, user_id: user.id })
      .single()

      if(error) setErrorText(error.message)
      else {
    setTodos([ todo, ...todos])}
    setErrorText(null)
    newTaskTextRef.current.value = ''
    }
  }

  const handleLogout = async () => {
    supabase.auth.signOut().catch(console.error)
  }
  

  return recoveryToken ? (
    <RecoverPassword
      token={recoveryToken}
      setRecoveryToken={setRecoveryToken}
    /> ) : (
    <>
      <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
        <Separator orientation="horizontal" size="4" />
      </Flex>
      <Flex direction="column" style={{ width: "100%" }}>
        <AddTodo />
      </Flex>

      <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
        <Separator orientation="horizontal" size="4" />
      </Flex>

      <Flex direction="column" gap="3">
        <Todo />
      </Flex>
    </>
  )
}

export default Home