import EditTodo from './EditTodo'

import { Flex, Card, Text, Button } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

const Todo = () => {

  return (
    <Flex direction="row" gap="3" style={{ maxWidth: 350 }}>
      <Card variant="classic">
        <Text as="div" size="2" weight="bold">
          Todo title
        </Text>
        <Text as="div" color="gray" size="2">
          Todo content
        </Text>
      </Card>
      <EditTodo />
      <Button>
        <TrashIcon />
      </Button>
    </Flex>
  )
  
}

export default Todo