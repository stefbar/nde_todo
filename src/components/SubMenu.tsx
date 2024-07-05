import { Card } from "@radix-ui/themes"
import * as ToggleGroup from '@radix-ui/react-toggle-group'

type VisibilitySort = 'all' | 'uncompleted' | 'completed'

const SubMenu = ({ setVisibilitySort }: { setVisibilitySort: (visibilitySort: VisibilitySort) => void } ) => {

    const submenuItemsList: NodeListOf<HTMLElement> = document.querySelectorAll('.ToggleGroupItem') 
    const dataState = Object.values(submenuItemsList).map((item) => item.getAttribute('data-state'))    
    
    return (
        <Card className='subMenuCard'>
            {/* <SegmentedControl.Root defaultValue='sort' radius='full'>
                <SegmentedControl.Item value='uncompleted'>Uncompleted</SegmentedControl.Item>
                <SegmentedControl.Item value='completed'>Completed</SegmentedControl.Item>
            </SegmentedControl.Root> */}

            <ToggleGroup.Root
                className="ToggleGroup"
                type='single'
                defaultValue='all'
                aria-label='Display todos by status'
                rovingFocus={true}
            >
                <ToggleGroup.Item
                    asChild
                    className={dataState[0] === 'on' ? 'ToggleGroupItem active' : 'ToggleGroupItem'}
                    value='all'
                    aria-label='Display all todos'
                    
                >
                    <button onClick={() => {setVisibilitySort('all')
                    }}>
                        Show all
                    </button>
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    asChild
                    className={dataState[1] === 'on' ? 'ToggleGroupItem active' : 'ToggleGroupItem'}
                    value='uncompleted'
                    aria-label='Display uncompleted todos'
                >
                    <button onClick={() => {setVisibilitySort('uncompleted')}}>
                        Uncompleted
                    </button>      
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    asChild
                    className={dataState[2] === 'on' ? 'ToggleGroupItem active' : 'ToggleGroupItem'}
                    value='completed'
                    aria-label='Display completed todos'
                >
                    <button onClick={() => {setVisibilitySort('completed')}}>
                        Completed
                    </button>        
                </ToggleGroup.Item>
            </ToggleGroup.Root>
        </Card>
    )

}

export default SubMenu