import { useState } from 'react'

import { supabase } from '../db/supabaseClient'
import { Database } from '../db/schema'

import EditTodo from './EditTodo'

import { Flex, Card, Text, Button } from '@radix-ui/themes'
import * as Collapsible from '@radix-ui/react-collapsible'
import { TrashIcon } from '@radix-ui/react-icons'

type Todos = Database['public']['Tables']['todos']['Row']

const Todo = ({ todo, deleteTodo }: { todo: Todos; deleteTodo: () => void }) => {
  const [open, setOpen] = useState(false)
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
      <Collapsible.Root className='collapsibleTodoCard' open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Card className='todoCard' variant="classic">
          <input
            type='checkbox'
            className=''
            checked={ done ? true : false }
            onChange={toggleDone}
          />
            <div className='todoContent'>
              <Text as="div" size="2">
                {todo.inserted_at}
              </Text>
              <Text as="div" color="gray" size="2">
                {todo.task}
              </Text>
            </div>

            <Collapsible.Content className='todoContent'>
              <div className='todoActions'>
                <EditTodo />
                <Button
                  className='todoActionBtn'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    deleteTodo()
                    }
                  }
                >
                  <TrashIcon/>
                </Button>
              </div>
            </Collapsible.Content>
            
          </Card>
        </Collapsible.Trigger>
      </Collapsible.Root>
    </Flex>
  )
  
}

export default Todo