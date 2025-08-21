import { Table } from 'rsuite';
import './Table.scss'
import { SetStateAction, useState } from 'react';

import Persons from '../../../public/group.png';
import DeleteLogo from "../../../public/bin.png"
import { Modal, Button } from 'rsuite';
import { Tooltip, Whisper } from 'rsuite';
import { apiFetch } from '../../api';

interface Iuser{
  userId:string,
  name:string,
  email:string,
  id:string
}

function TableDemo(props:any){

  // const [open, setOpen] = useState(false);
  const [users,setUsers] = useState([]);
  const [orgName,setOrgName] = useState("");
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (orgName:string) => {
    setOpen2(true);
    // console.log(orgName);
    setOrgName(orgName);
    userDetails(orgName);
  }
  const handleClose2 = () => setOpen2(false);



  const [name,setName] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = (orgName:string) => {
    setName(orgName);
    setOpen(true);}

  const handleClose = () => {
    setOpen(false);
  }



  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortType, setSortType] = useState<'asc' | 'desc'>();

  const data = props.fil;


  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        console.log(x,'x');
        if (typeof x === 'string') {
          x = x.charCodeAt(0);
        }
        if (typeof y === 'string') {
          y = y.charCodeAt(0);
        }

        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

    console.log("props",data);
    const { Column, HeaderCell, Cell } = Table;

    const handleSortColumn = (sortColumn: SetStateAction<string | undefined>,sortType: SetStateAction<'asc' | 'desc' |undefined>)=>{
      setSortColumn(sortColumn);
      setSortType(sortType);
    }

    const userDetails = async(org:string)=>{

    const response = await apiFetch(`/users/users/${org}`,{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const result = await response.json();
    if(result.data.success){
      setUsers(result.data.userList);
      console.log("user fetch successful");
    }
    else{
      console.log("something is wrong!");
    }
  }
  return (
    // <div>My name is abhishek</div>
    <>
    <Table
    className='table'
      height={500} width={700}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
    >

      <Column flexGrow={1} align='center' sortable >
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey='name'></Cell>
      </Column>

      <Column flexGrow={1} align='center' >
        <HeaderCell>Total Users</HeaderCell>
        <Cell dataKey='user_list.length'>{rowData => (rowData.user_list.length).toString()}</Cell>
      </Column>
        <Column width={150} align='center'>
      <HeaderCell>Delete</HeaderCell>
      <Cell>
          {rowData => (
            // <Button size='sm' onClick={()=>props.deliveOrganization(rowData.name)}>
            <Whisper followCursor speaker={<Tooltip>Delete</Tooltip>}>
            <Button size='sm' onClick={()=>handleOpen(rowData.name)}>
              <img width={25} src={DeleteLogo}/>
            </Button></Whisper>
          )}
        </Cell></Column>

        <Column width={150} align='center'>
      <HeaderCell>Users</HeaderCell>
      <Cell>
          {rowData => (
              <Whisper followCursor speaker={<Tooltip>Users</Tooltip>}>
            <Button size='sm' onClick={()=>handleOpen2(rowData.name)}>
              <img width={20} src={Persons}/>
            </Button></Whisper>

          )}
        </Cell></Column>
    </Table>
    
    <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are You Sure You Want to Delete this Organization??
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            props.deliveOrganization(name);
            handleClose();
          }} appearance="primary" color='green'>
            Ok
          </Button>
          <Button onClick={handleClose} appearance="primary" color='red'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal open={open2} onClose={handleClose2}>
        <Modal.Header>
          <Modal.Title><strong style={{color:'black'}}>Users in {orgName}</strong> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
              users.map((e:Iuser,i:number)=>(
                <div key={i} className='user-detail'> 
                <strong>{i+1}{')'} {'  '} {e.email}<br></br></strong>
                </div>
              ))
            }
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
    
  );
};
 
export default TableDemo;