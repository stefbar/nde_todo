import { Flex, Button } from '@radix-ui/themes'

const Footer = ({ handleLogout }: { handleLogout: () => void }) => {

  return (
    <Flex className='todoContainer'>
      <div className='todoActions'>
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