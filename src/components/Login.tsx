import { useRef, useState } from 'react'
import { supabase } from '../supabaseClient'

import { Flex, Card, Text, TextField, Button } from '@radix-ui/themes'
// import { TrashIcon } from '@radix-ui/react-icons'

const Login = () => {

  const [helperTxt, setHelperTxt] = useState({ error: null, text: null })
  const emailRef = useRef()
  const pwdRef = useRef()

  const handleLogin = async (type) => {
    const email = emailRef?.current.value
    const pwd = pwdRef?.current.value

    const{user, error} = type === 'LOGIN' ? await supabase.auth.signIn({email, pwd}) : await supabase.auth.signUp({email, pwd})

    if(error) {
      setHelperTxt({error: true, text: error.message})
    } else if(!user && !error) {
      setHelperTxt({
        error: false,
        text: 'An email has been sent to you for verification, please check your mailbox !'
      })
    }
  }

  const handleAuth = async (provider) => {
    let {error} = await supabase.auth.signIn({provider})
    if(error) {
      console.log('Error : ', error.message)
    }
  }

  const forgotPwd = async (e) => {
    e.preventDefault()
    const email = prompt('Please enter your email')

    if(email === null || email === '') {
      setHelperTxt({error: true, text: 'You must enter your email'})
    } else {
      let {error} = await supabase.auth.api.resetPasswordForEmail(email)
      if(error) {
        console.log('Error : ', error.message)
      } else {
        setHelperTxt({error: false, text: 'Password recovery email has been sent, please check your mailbox.'})
      }
    }
  }

  return (
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
              defaultValue="Email"
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
              defaultValue="Password"
              placeholder="Type your password"
              required
            />
          </label>
          <span onClick={forgotPwd} >
            { !!helperTxt.text && (<div className={ helperTxt.error ? 'errorTxt' : 'successTxt' } >{helperTxt.text}</div>) }
          </span>
      </Card>
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
      <div>
        <span>
          Or continue with :
        </span>
        <div>
          <span>
            <Button
              type='button'
              onClick={() => handleAuth('github')}
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
    </Flex>
  )

}

export default Login