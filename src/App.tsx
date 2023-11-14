import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

import Login from './components/Login'
import Home from './components/Home'

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { Flex, Box, Text, Heading, Switch } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user
        setUser(currentUser ?? null)
      }
    )
  
    return () => {
      authListener?.unsuscribe()
    }
  }, [user])
  
  
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

          <Box className='toggleThemeContainer' style={{position: "absolute", top: "1rem", right: "1rem"}}>
            <SunIcon className='themeIcon'/>
            <Switch defaultChecked onCheckedChange={() => {setIsDarkTheme(!isDarkTheme)}}/>
            <MoonIcon className='themeIcon'/>
          </Box>
        </Flex>
      </Text>

      { !user ? <Login /> : <Home user={user} /> }

      </Theme>
    </Theme>
  )

}

export default App