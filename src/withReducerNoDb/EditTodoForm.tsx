import { useState } from 'react'
// import { Database } from '../db/schema'

import { Dialog, Flex, TextArea, Button } from '@radix-ui/themes'
import * as Label from '@radix-ui/react-label'
import { Pencil1Icon } from '@radix-ui/react-icons'

// type Todos = Database['public']['Tables']['todos']['Row']

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

const EditTodo = ({ todo, dispatch }: { todo: Todo; dispatch: (action: TodosAction) => void }) => {

    const [editedTaskText, setEditedTaskText] = useState<string>(todo.task)
    // const [editedTodo, setEditedTodo] = useState<Todo>(todo)
    // const setEditedTodo = (newTaskText) => {
    //     const editedTodo = {           
    //         ...todo,
    //         inserted_at: new Date().toLocaleString("fr-FR"),
    //         task: newTaskText,
    //         is_complete: false
    //     }
    // }
    const onSubmitEditedTodo = () => {
        const editedTodo = {
            ...todo,
            inserted_at: new Date().toLocaleString("fr-FR"),
            task: editedTaskText,
            is_complete: false
        }
        console.log('editedTodo : ', editedTodo);
        
        // onEditTodo(editedTodo)
        dispatch({ type: 'EDIT_TODO', payload: editedTodo })
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button className='todoActionBtn'>
                <Pencil1Icon/>
                </Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault(),
                        // setEditedTaskText(editedTaskText)
                        // onEditTodo(editedTodo)
                        onSubmitEditedTodo()
                        // dispatch({ type: 'EDIT_TODO', payload: {...todo, inserted_at: new Date().toLocaleString("fr-FR"), task: editedTaskText, is_complete: false} })
                    }}
                >
                    <Dialog.Title>Edit todo</Dialog.Title>

                    <Flex direction="column" gap="3">
                        <Label.Root htmlFor='todoContent'>
                            {/* <Text as="div" size="2" mb="1" weight="bold"> */}
                                Content
                            {/* </Text> */}
                        </Label.Root>
                        <TextArea
                            id='todoContent'
                            placeholder="Type todo's content"
                            // defaultValue={todo.task}
                            value={editedTaskText}
                            onChange={(e) => {
                                setEditedTaskText(e.target.value)
                            }}
                        />
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button
                                variant="soft"
                                color="gray"
                            >
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button
                                type="submit"
                                variant="soft"
                                color="green"
                            >
                                Save
                            </Button>
                        </Dialog.Close>
                    </Flex>

                </form>
            </Dialog.Content>
        </Dialog.Root>
  )

}

export default EditTodo