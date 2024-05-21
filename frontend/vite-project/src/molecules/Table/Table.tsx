import { Table, Button } from 'rsuite';
import './Table.scss'
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Modal,Toggle, ButtonToolbar, Placeholder } from 'rsuite';

function TableDemo(props:any){

  const [open, setOpen] = useState(false);
  const [overflow, setOverflow] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <>
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
            <Button size='sm'appearance="primary" color='blue' onClick={handleOpen}>
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

    
    <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    </>
    
  );
};
 
export default TableDemo;