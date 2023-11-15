import { Dialog, Flex, Text, TextArea, Button } from '@radix-ui/themes'
import * as Label from '@radix-ui/react-label'
import { PlusIcon } from '@radix-ui/react-icons'

const AddTodo = ({ taskText, setNewTaskText, addTodo }: { taskText: string; setNewTaskText: (taskText: string) => void; addTodo: (taskText: string) => Promise<void> }) => {

  // const d = new Date()
  // const d_inserted = d.toLocaleString("fr-FR")

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button id='addTodoBtn'  className='todoActionBtn'>
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addTodo(taskText)
          }}
        >
          <Dialog.Title>Add todo</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Add a new todo.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <Label.Root>
              <Text as="div" size="2" mb="1" weight="bold">
                Added at :
              </Text>
            </Label.Root>
            <Text>
              {/* {d_inserted} */}
            </Text>

            <Label.Root htmlFor='todoContent'>
              {/* <Text as="div" size="2" mb="1" weight="bold"> */}
                Content
              {/* </Text> */}
            </Label.Root>
              <TextArea
                id='todoContent'
                placeholder="Type todo's content"
                value={taskText}
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
  )

}

export default AddTodo