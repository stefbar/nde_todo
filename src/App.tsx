import { useEffect, useState } from 'react'

import type { Session } from '@supabase/supabase-js'
import { supabase } from './db/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// import Home from './components/Home'
import Todos from './withReducerNoDb/Todos'

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { Flex, Box, Text, Heading, Switch, Separator } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const App = () => {
  
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session }}) => {
      setSession(session)
    })

    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])
  
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
            <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
              <Separator orientation="horizontal" size="4" />
            </Flex>
          { !session ?
            <Auth
                supabaseClient={supabase}
                providers={['google', 'github']}
                appearance={{ theme: ThemeSupa }}
                theme={isDarkTheme ? 'dark' : 'light'}
            /> :
            // <Home
            //   key={session.user.id}
            //   session={session}
            // />
            <Todos
                key={session.user.id}
                session={session}
            />
          }
        </Theme>
    </Theme>
  )

}

export default App