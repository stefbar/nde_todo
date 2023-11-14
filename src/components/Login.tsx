import type { AuthError, Provider, User } from '@supabase/supabase-js'
import { useRef, useState } from 'react'

import { supabase } from '../db/supabaseClient'

import { Flex, Card, Text, TextField, Button } from '@radix-ui/themes'
// import { TrashIcon } from '@radix-ui/react-icons'

const Login = () => {
  const supabaseUrl = import.meta.env.VITE_NDETODO_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_NDETODO_SUPABASE_KEY

  const [helperTxt, setHelperTxt] = useState<{ error: boolean, text: string | null }>({ error: true, text: null })
  const emailRef = useRef<HTMLInputElement>(null)
  const pwdRef = useRef<HTMLInputElement>(null)

  const handleLogin = async (type: string) => {
    const email = emailRef.current?.value
    const password = pwdRef.current?.value

    const {data: {user}, error}: {data: {user: User | null}, error: AuthError | null } = type === 'LOGIN' ? await supabase.auth.signInWithPassword({email, password}) : await supabase.auth.signUp({email, password})

    if(error) {
      setHelperTxt({error: true, text: error.message})
    } else if(!user && !error) {
      setHelperTxt({
        error: false,
        text: 'An email has been sent to you for verification, please check your mailbox !'
      })
    }
  }

  const handleAuth = async (provider: Provider) => {
    // You need to enable the third party auth you want in Authentication > Settings
    // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
    const {error} = await supabase.auth.signInWithOAuth({provider})
    if(error) {
      console.log('Error : ', error.message)
    }
  }

  const forgotPwd = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault()
    const email = prompt('Please enter your email')

    if(email === null || email === '') {
      setHelperTxt({error: true, text: 'You must enter your email'})
    } else {
      const {error} = await supabase.auth.resetPasswordForEmail(email)
      if(error) {
        console.log('Error : ', error.message)
      } else {
        setHelperTxt({error: false, text: 'Password recovery email has been sent, please check your mailbox.'})
      }
    }
  }

  return (
    supabaseUrl && supabaseKey ? (
      <p>There is no api key and url</p>
    ) : (
    <>
      <Flex className='todoContainer' direction="row" gap="3">
        <Card className='todoCard' variant="classic">
          <Text as="div" size="2" weight="bold">
            Login
          </Text>
          <label htmlFor='userEmail'>
              <Text as="div" size="2" mb="1" weight="bold">
                Email
              </Text>
              <TextField.Input
                ref={emailRef}
                type='email'
                name='userEmail'
                // defaultValue="Email"
                placeholder="Type your email"
                required
              />
            </label>
            <label htmlFor='userPwd'>
              <Text as="div" size="2" mb="1" weight="bold">
                Password
              </Text>
              <TextField.Input
                ref={pwdRef}
                type='password'
                name='userPwd'
                // defaultValue="Password"
                placeholder="Type your password"
                required
              />
            </label>
            <span onClick={forgotPwd} >
              { !!helperTxt.text && (<div className={ helperTxt.error ? 'errorTxt' : 'successTxt' } >{helperTxt.text}</div>) }
            </span>
          <div className='todoActions'>
            <Button
              type='submit'
              className='todoActionBtn'
              onClick={() => handleLogin('REGISTER').catch(console.error)}
            >
              Sign up
            </Button>
            <Button
              type='button'
              className='todoActionBtn'
              onClick={() => handleLogin('LOGIN')}
            >
              Sign in
            </Button>
          </div>
        </Card>
      </Flex>
      <div>
        <span>
          Or continue with :
        </span>
        <div>
          <span>
            <Button
              type='button'
              onClick={() => handleAuth('github')}
              disabled
            >
              GitHub
            </Button>
          </span>
        </div>
        <div>
          <span>
            <Button
              type='button'
              onClick={() => handleAuth('google')}
            >
              Google
            </Button>
          </span>
        </div>
      </div>
    </>
  )
  )
}

export default Login