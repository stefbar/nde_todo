import { useState } from 'react'

import Todo from './components/Todo'
import CreateTodo from './components/CreateTodo'

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { Flex, Box, Text, Heading, Switch, Separator } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(true)
  
  return (
    <Theme appearance={isDarkTheme ? 'dark' : 'light'}>
      <Theme
        accentColor="tomato"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        radius="full"
      >

        <Text as="label" size="2">
          <Flex gap="2">
            <Heading as='h1'>NDE todos</Heading>
            <Box style={{float: "right"}}>
              <SunIcon />
              <Switch defaultChecked onCheckedChange={() => {setIsDarkTheme(!isDarkTheme)}}/>
              <MoonIcon />
            </Box>
          </Flex>
        </Text>

        <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
          <Separator orientation="horizontal" size="4" />
        </Flex>
        <Flex direction="column">
          <CreateTodo />
        </Flex>

        <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
          <Separator orientation="horizontal" size="4" />
        </Flex>

        <Flex direction="column" gap="3">
          <Todo />
        </Flex>

      </Theme>
    </Theme>
  )

}

export default App