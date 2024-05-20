import { Table, Button } from 'rsuite';
import './Table.scss'
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

function TableDemo(props:any){

    const data = props.fil;
    console.log("props",data);
    const { Column, HeaderCell, Cell } = Table;

    const cookies = new Cookies();
    const navigate = useNavigate();

    const SerialNumberCell = ({ rowIndex, ...props }:any) => (
      <Cell {...props}>{rowIndex + 1}</Cell>
    );

    const AllUsers = async()=>{

    }
  return (
    // <div>My name is abhishek</div>
    <Table
    className='table'
      height={500} width={900}
      data={data}
    >
       <Column width={200} align='center'  fixed>
        <HeaderCell>S.no</HeaderCell>
        <SerialNumberCell/>
      </Column>

      <Column width={200} align='center'  fixed>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey='name'></Cell>
      </Column>

      <Column width={200} align='center'  fixed>
        <HeaderCell>Total Users</HeaderCell>
        <Cell>{50}</Cell>
      </Column>

      <Column width={100} align='center'>
      <HeaderCell>Users</HeaderCell>
      <Cell>
          {rowData => (
            <Button size='sm'appearance="primary" color='blue' onClick={AllUsers}>
              Users
            </Button>
          )}
        </Cell></Column>
        <Column width={200} align='center'>
      <HeaderCell>Users</HeaderCell>
      <Cell>
          {rowData => (
            <Button size='sm'appearance="primary" color='red' onClick={()=>props.deliveOrganization(rowData.name)}>
              Delete
            </Button>
          )}
        </Cell></Column>
    </Table>
  );
};
 
export default TableDemo;