import { useState } from 'react'

import { supabase } from '../db/supabaseClient'
import { Database } from '../db/schema'

import EditTodo from './EditTodo'

import { Flex, Card, Text, Button } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

type Todos = Database['public']['Tables']['todos']['Row']

const Todo = ({ todo, deleteTodo }: { todo: Todos; deleteTodo: () => void }) => {

  const [done, setDone] = useState(todo.is_complete)

  const toggleDone = async () => {
    try {
      const { data } = await supabase
      .from('todos')
      .update({is_complete: !done})
      .eq('id', todo.id)
      .throwOnError()
      .select()
      .single()

      if(data) setDone(data.is_complete)
      
    } catch(error) {
      console.log('error : ', error)
    }
  }

  return (
    <Flex gap='3'>
      <Card className='todoCard' variant="classic">
      <input
        type='checkbox'
        className=''
        checked={ done ? true : false }
        onChange={toggleDone}
      />
        <Text as="div" size="2">
          {todo.inserted_at}
        </Text>
        <Text as="div" color="gray" size="2">
          {todo.task}
        </Text>
      </Card>
      <div className='todoActions'>
        <EditTodo />
        <Button
          className='todoActionBtn'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteTodo()
            }
          }
        >
          <TrashIcon/>
        </Button>
      </div>          
    </Flex>
  )
  
}

export default Todo