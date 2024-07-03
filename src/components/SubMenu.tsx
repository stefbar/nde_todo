import { Card } from "@radix-ui/themes"
import * as ToggleGroup from '@radix-ui/react-toggle-group'

type VisibilitySort = 'all' | 'uncompleted' | 'completed'

const SubMenu = ({ setVisibilitySort }: { setVisibilitySort: (visibilitySort: VisibilitySort) => void } ) => {

    return (
        <Card className='subMenuCard'>
            {/* <SegmentedControl.Root defaultValue='sort' radius='full'>
                <SegmentedControl.Item value='uncompleted'>Uncompleted</SegmentedControl.Item>
                <SegmentedControl.Item value='completed'>Completed</SegmentedControl.Item>
            </SegmentedControl.Root> */}

            <ToggleGroup.Root type='single' defaultValue='all'>
                <ToggleGroup.Item
                    value='all'
                    onClick={(e) => {
                        e.preventDefault()
                        setVisibilitySort('all')
                    }}
                >
                    Show all
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value='uncompleted'
                    onClick={(e) => {
                        e.preventDefault()
                        setVisibilitySort('uncompleted')
                    }}
                >
                    Uncompleted
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value='completed'
                    onClick={(e) => {
                        e.preventDefault()
                        setVisibilitySort('completed')
                    }}
                >
                    Completed
                </ToggleGroup.Item>
            </ToggleGroup.Root>
        </Card>
    )

}

export default SubMenu