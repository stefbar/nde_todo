import { Database } from '../db/schema'

import { Dialog, Flex, Text, TextField, TextArea, Button } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons'

type Todos = Database['public']['Tables']['todos']['Row']

const EditTodo = ({todo, editTodo}: {todo: Todos; editTodo: ({id, task}: {id: number; task: string}) => Promise<void>}) => {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className='todoActionBtn'>
          <Pencil1Icon/>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit todo</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to the selected todo.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Input
              defaultValue={todo.task || ''}
              placeholder="Type a title for the todo"
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Content
            </Text>
            <TextArea
              placeholder="Type todo's content"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              type="submit"
              onSubmit={() => editTodo({ id: todo.id, task: todo.task || '' })}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )

}

export default EditTodo