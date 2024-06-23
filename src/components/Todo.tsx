import { useState } from 'react'

import { supabase } from '../db/supabaseClient'
import { Database } from '../db/schema'

import EditTodo from './EditTodo'

import { Flex, Card, Text, Button, Box } from '@radix-ui/themes'
import * as Collapsible from '@radix-ui/react-collapsible'
import { TrashIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'

type Todos = Database['public']['Tables']['todos']['Row']

const Todo = ({ todo, editTodo, deleteTodo }: { todo: Todos; deleteTodo: (todo: Todos) => void; editTodo: ({id, task}: {id: number; task: string}) => Promise<void> }) => {
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
        <Card className='todoCard' variant="classic">
          <div className='todoContent'>
            <Box className='todoMinimalInfo'>
              <Text as="div" color="gray" size="2">
                {todo.task}
              </Text>
              <input
                type='checkbox'
                className='toggleDoneCheckbox'
                checked={ done ? true : false }
                onChange={toggleDone}
              />
            </Box>
            <Collapsible.Trigger asChild>
              <Box className='todoMinimalInfo'>
                <DotsHorizontalIcon />
                <Text as="div" size="2">
                  {todo.inserted_at}
                </Text>
              </Box>
            </Collapsible.Trigger>
          </div>

          <Collapsible.Content className='todoContent'>
            <div className='todoActions'>
              <EditTodo todo={todo} editTodo={editTodo} />
              <Button
                className='todoActionBtn'
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  deleteTodo(todo)
                  }
                }
              >
                <TrashIcon/>
              </Button>
            </div>
          </Collapsible.Content> 
        </Card>
      </Collapsible.Root>
    </Flex>
  )
  
}

export default Todo