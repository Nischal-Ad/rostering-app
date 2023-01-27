import DataTable from 'react-data-table-component'
import { Card } from 'reactstrap'
const columns = [
    {
        name: 'Name',
        selector: row => row.title
    },
    {
        name: 'Email',
        selector: row => row.year
    }
  
]

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988'
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984'
    }
]

const approved = () => {
    return (
       <Card>
         <DataTable
               
                   title='Event List'
                    columns={columns}
                    data={data}
                />
       </Card>
    )
}
export default approved