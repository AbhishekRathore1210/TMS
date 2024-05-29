import { Table } from 'rsuite';
import './Table.scss'
import { SetStateAction, useState } from 'react';
// import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import DeleteLogo from "../../../public/bin.png"
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';

function TableDemo(props:any){

  // const [open, setOpen] = useState(false);
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
    console.log(sortColumn,'(((((((((');
    console.log(sortType,'))))))))))))');
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

    // const cookies = new Cookies();
    const navigate = useNavigate();

    const handleSortColumn = (sortColumn: SetStateAction<string | undefined>,sortType: SetStateAction<'asc' | 'desc' |undefined>)=>{
      setSortColumn(sortColumn);
      setSortType(sortType);
    }

    
  return (
    // <div>My name is abhishek</div>
    <>
    <Table
    className='table'
      height={300} width={700}
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
            <Button size='sm' onClick={()=>handleOpen(rowData.name)}>
              <img width={25} src={DeleteLogo}/>
            </Button>
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
    </>
    
  );
};
 
export default TableDemo;