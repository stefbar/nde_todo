import { Dialog, Flex, Text, TextField, TextArea, Button } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'

const CreateTodo = () => {

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create todo</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Create a new todo.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Input
              defaultValue="Todo"
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
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )

}

export default CreateTodo