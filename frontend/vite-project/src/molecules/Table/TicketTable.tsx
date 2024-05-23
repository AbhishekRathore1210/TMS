import { Table, Button, Col,Pagination } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { createIconFont } from '@rsuite/icons';
import { Cookies } from 'react-cookie';
import {useState,SetStateAction}  from 'react';
import Details from '../../../public/details.png';
import { Modal, Placeholder } from 'rsuite';
import TicketDetails from '../../organisms/Dashboard/TicketDetails/TicketDetails';
import { ToastContainer } from 'react-toastify';
import './TicketTable.scss'


const IconFont = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
  commonProps: { style: { fontSize: 30, color: '#1675e0' } },
  onLoaded: () => {
    // console.log('onLoaded');
  }
});

const cookies = new Cookies();

const EditableCell = ({ rowData, dataKey, onChange, ...props }:any) => {

  const editing = rowData.statuss === 'EDIT';

  return (
    <Cell {...props} className={editing ? 'table-content-editing' : ''}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData._id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};

export const EditCell = ({ rowData, dataKey, onChange, ...props }:any) => {
  return (
    <Cell {...props}>
      {rowData.statuss === 'EDIT' ? (
        <input
          className="input"
          defaultValue={rowData[dataKey]}
          onChange={event => {
            onChange && onChange(rowData._id, dataKey, event.target.value);
          }}
        />
      ) : (
        rowData[dataKey]
      )}
    </Cell>
  );
};
const ActionCell = ({ rowData, dataKey, onClick, ...props }:any) => {
  return (
    <Cell {...props} style={{ padding: '6px' }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData._id);
        }}
      >
        {rowData.statuss === 'EDIT' ? 'Save' : 'Edit'}
      </Button>
    </Cell>
  );
};

function UserTicket({ticket,SetTicket,lim,p,setP,t,fun,getTicket}:any){

    const SerialNumberCell = ({ rowIndex, ...props}:any) => (
      <Cell {...props}>{rowIndex + 1}</Cell>
    );
    const AllDetails = async()=>{

    }

    const handleChange = (_id: string, key: string | number, value: string) => {
      // console.log(`id ${_id} , key ${key}  value , ${value}`);
      const nextData = Object.assign([], ticket);
      nextData.find((item:any) => item._id === _id)[key] = value;
      SetTicket(nextData);
    };
    const handleEditState = (_id:string) => {
      const nextData = Object.assign([], ticket);
      const activeItem = nextData.find((item:any) => item._id === _id);
      activeItem.statuss = activeItem.statuss ? null : 'EDIT';
      // console.log(activeItem.statuss);
      SetTicket(nextData);
    };

    //     try{
    //       console.log(rowData,'**********');
    //       const token:string | undefined = cookies.get('accessToken');
    //       const config = {
    //         headers: {
    //           Authorization: `BEARER ${token}`,
    //           'Custom-Header': 'Custom Value',
    //         },
    //       };

    //       const response = await axios.put("http://localhost:8555/users/updateTicket",rowData);
    //       // console.log('*************',response.data);
    //       console.log("Row data",rowData);
    //       console.log("id",_id);
    //     }
    //     catch(error){
    //       const err = error as Error
    //       console.log(err.message);
    //     }
    // };

    const [data, setdata] = useState({
      type: "",
      status: "",
      summary: "",
      description: "",
      assignee: "",
      createdDate: "",
      updatedDate: "",
      dueDate: "",
      History: [],
    });


    const [id, Setid] = useState();
    const [open, setOpen] = useState(false);
    const [overflow, setOverflow] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const display = (id: any) => {
      handleOpen();
      Setid(id);
      const oneTicket = ticket.find((ticket: { key: string }) => ticket.key === id);
      console.log(oneTicket,'ticket is:');
      setdata(oneTicket);

    };

    return(
        <>
        <div className='table-div'>
        <Table
    className='ticket-table'
      height={400} width={1250}
      data={ticket}
    >
 
      <Column width={100} align='center' >
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey='type'/>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Key</HeaderCell>
        <Cell dataKey='key'/>
      </Column>

      <Column width={130} align='center'>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey='status'/>
      </Column>

      <Column width={220} align='center' >
        <HeaderCell>Summary</HeaderCell>
        <Cell dataKey='summary'/>
      </Column>

      <Column width={300} align='center' >
        <HeaderCell>Assignee</HeaderCell>
        <Cell dataKey='assignee'/>
      </Column>


      <Column width={300} align='center' >
        <HeaderCell>Reporter</HeaderCell>
        <Cell dataKey='reporter'/>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Created Date</HeaderCell>
        <Cell dataKey='createdDate'>{rowData=>(rowData.createdDate.split('T')[0])}</Cell>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Updated Date</HeaderCell>
        <Cell dataKey='updatedDate'>{rowData=>(rowData.updatedDate.split('T')[0])}</Cell>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Due Date</HeaderCell>
        <Cell dataKey='dueDate'>{rowData=>(rowData.dueDate.split('T')[0])}</Cell>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Details</HeaderCell>
        <Cell>
            {(rowData => (
              <img onClick={()=>display(rowData.key)} width={20} src={Details}/>
            ))}
        </Cell>
      </Column>
        </Table>

        
    <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Ticket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <TicketDetails d={data} setD = {setdata} funClose={handleClose} getTicket={getTicket}/>

        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>


      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="md"
          layout={['total', '-', 'limit', '|', 'pager', 'skip']}
          total={t*lim}
          limitOptions={[5,10, 30, 50]}
          limit={lim}
          activePage={p}
          onChangePage={setP}
          onChangeLimit={fun}
        />
      </div>
      </div>
      <ToastContainer/>
        </>
    )

}

export default UserTicket;