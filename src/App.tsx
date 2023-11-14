// import type { User } from '@supabase/supabase-js' 
import { useEffect, useState } from 'react'

import type { Session } from '@supabase/supabase-js'
import { supabase } from './db/supabaseClient'
// import { Session } from '@supabase/auth-helpers-react'
// import { Database } from './db/schema'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

// import Login from './components/Login'
import Home from './components/Home'

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { Flex, Box, Text, Heading, Switch } from '@radix-ui/themes'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const App = () => {
  
  // const supabase = useSupabaseClient<Database>()
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

  // if(!session) {
  //   return <Login />
  // } else {
  // const [user, setUser] = useState<User | null>(null)

  // const user = session.user
  // useEffect(() => {
  //   const user = supabase.auth.getUser()
  //   user.then(({ data: { user }}) => {
  //     setUser(session?.user ?? null)
  //   })
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       const currentUser = session?.user
  //       setUser(currentUser ?? null)
  //     }
  //   )

  //   return () => {
  //     authListener?.subscription.unsubscribe()
  //   }
  // }, [user])
  
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
        { !session ?
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            appearance={{ theme: ThemeSupa }}
            theme={isDarkTheme ? 'dark' : 'light'}
          /> :
          <Home
            key={session.user.id}
            session={session}
          />
        }
        {/* { !session ? <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> : <Home /> } */}
        {/* { !user ? <Login /> : <Home user={user}/> } */}
        {/* <Home session={session}/> */}
        {/* <Flex direction="column" gap="4" style={{ margin: "1rem" }}>
          <Separator orientation="horizontal" size="4" />
        </Flex> */}

      </Theme>
    </Theme>
  )

}

export default App