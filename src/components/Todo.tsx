import EditTodo from './EditTodo'

import { Flex, Card, Text, Button } from '@radix-ui/themes'
import { TrashIcon } from '@radix-ui/react-icons'

const Todo = () => {

  return (
    <Flex className='todoContainer' direction="row" gap="3">
      <Card className='todoCard' variant="classic">
        <Text as="div" size="2" weight="bold">
          Todo title
        </Text>
        <Text as="div" color="gray" size="2">
          Todo content
        </Text>
      </Card>
      <div className='todoActions'>
        <EditTodo />
        <Button className='todoActionBtn'>
          <TrashIcon/>
        </Button>
      </div>
    </Flex>
  )
  
}

export default Todo