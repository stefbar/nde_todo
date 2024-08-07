import { useState } from 'react'

import EditTodoForm from './EditTodoForm'

import { Flex, Card, Text, Button, Box } from '@radix-ui/themes'
import * as Collapsible from '@radix-ui/react-collapsible'
import { TrashIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'

type Todo = {
  id: number
  inserted_at: string
  task: string
  details?: string
  is_complete: boolean
  user_id: string
}

type TodosAction = {
    type: string
    payload: Todo
}

const TodoItem = ({ todo, dispatch }: { todo: Todo; dispatch: (action: TodosAction) => void }) => {
    
    const [open, setOpen] = useState(false)
    // const toggleDone = async () => {
    //   try {
    //     const { data } = await supabase
    //     .from('todos')
    //     .update({is_complete: !done})
    //     .eq('id', todo.id)
    //     .throwOnError()
    //     .select()
    //     .single()

    //     if(data) setDone(data.is_complete)
        
    //   } catch(error) {
    //     console.log('error : ', error)
    //   }
    // }

    return (
        <Flex gap='3'>
            <Collapsible.Root className='collapsibleTodoCard' open={open} onOpenChange={setOpen}>
                <Card className='todoCard' variant="classic">
                    <div className='todoContent'>
                        <Box className='todoMinimalInfo'>
                            <Text className={ todo.is_complete ? 'completedTodo' : '' } as="div" color="gray" size="4">
                                { todo.task }
                            </Text>
                            <input
                                type='checkbox'
                                className='toggleDoneCheckbox'
                                checked={ todo.is_complete }
                                onChange={
                                    () => dispatch({
                                        type: 'TOGGLE_TODO',
                                        payload: todo
                                    })
                                }
                            />
                        </Box>

                        <Collapsible.Trigger asChild className={ todo.is_complete ? 'undisplayed' : '' }>
                            <Box className='todoMinimalInfo'>
                                <DotsHorizontalIcon />
                                <Text as="div" size="1">
                                    { todo.inserted_at }
                                </Text>
                            </Box>
                        </Collapsible.Trigger>
                    </div>

                    <Collapsible.Content className={ todo.is_complete ? 'undisplayed' : '' }>
                        <div className='todoActions'>
                            <EditTodoForm todo={todo} dispatch={dispatch} />
                            <Button
                                className='todoActionBtn'
                                onClick={
                                    () => dispatch({
                                        type: 'DELETE_TODO',
                                        payload: todo
                                    })
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

export default TodoItem