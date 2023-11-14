import { Flex, Button } from '@radix-ui/themes'

const Footer = ({ handleLogout }: { handleLogout: () => void }) => {

  return (
    <Flex className='footerContainer' gap='5'>
      <p className='footerMentions'>nde@2023 - react * typescript * supabase</p>
      <div className='footerActions'>
        <Button
          className='todoActionBtn'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Flex>
  )

}

export default Footer