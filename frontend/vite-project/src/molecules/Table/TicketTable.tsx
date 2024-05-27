import { Table, Button, Col,Pagination } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { createIconFont } from '@rsuite/icons';
// import { Cookies } from 'react-cookie';

import {useState}  from 'react';
import Details from '../../../public/details.png';
import { Modal, Placeholder } from 'rsuite';
import TicketDetails from '../../organisms/Dashboard/TicketDetails/TicketDetails';
import './TicketTable.scss'


const IconFont = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2144422_r174s9i1orl.js',
  commonProps: { style: { fontSize: 30, color: '#1675e0' } },
  onLoaded: () => {
    // console.log('onLoaded');
  }
});

// const cookies = new Cookies();


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

function UserTicket({ticket,SetTicket,lim,p,setP,t,fun,getTicket}:any){


  const [sortColumn, setSortColumn] =useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);


    const getData = () => {
      if (sortColumn && sortType) {
        return ticket.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          const isDateString = (dateStr: string) => {
            // Simple check if the string matches the format YYYY-MM-DD
            // console.log('x',dateStr);
            dateStr = dateStr.split('T')[0];
            return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
          };
    
          if (isDateString(x) && isDateString(y)) {
            console.log('x',x);
            console.log('y',y);
            x = new Date(x);
            y = new Date(y);
          }
          else if (typeof x === 'string') {
            x = x.charCodeAt(0);
          }
          else if (typeof y === 'string') {
            y = y.charCodeAt(0);
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return ticket;
    };



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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const display = (id: any) => {
      handleOpen();
      Setid(id);
      const oneTicket = ticket.find((ticket: { key: string }) => ticket.key === id);
      console.log(oneTicket,'ticket is:');
      setdata(oneTicket);

    };

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

    return(
        <>
        <div className='table-div'>
        <Table
    className='ticket-table'
      height={400}
      data={getData()}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column flexGrow={1} align='center' >
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey='type'/>
      </Column>

      {/* <Column flexGrow={1} align='center' >
        <HeaderCell>Key</HeaderCell>
        <Cell dataKey='key'/>
      </Column> */}

      <Column flexGrow={1} align='center'>
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey='status'/>
      </Column>

      <Column flexGrow={1.5} align='center' >
        <HeaderCell>Summary</HeaderCell>
        <Cell dataKey='summary'/>
      </Column>

      <Column flexGrow={3} align='center' >
        <HeaderCell>Assignee</HeaderCell>
        <Cell dataKey='assignee'/>
      </Column>


      <Column flexGrow={3} align='center' >
        <HeaderCell>Reporter</HeaderCell>
        <Cell dataKey='reporter'/>
      </Column>

      <Column flexGrow={1.3} align='center' sortable>
        <HeaderCell>Created Date</HeaderCell>
        <Cell dataKey='createdDate'>{rowData=>(rowData.createdDate.split('T')[0])}</Cell>
      </Column>

      <Column flexGrow={1.4} align='center' sortable>
        <HeaderCell>Updated Date</HeaderCell>
        <Cell dataKey='updatedDate'>{rowData=>(rowData.updatedDate.split('T')[0])}</Cell>
      </Column>

      <Column flexGrow={1.3} align='center' sortable >
        <HeaderCell>Due Date</HeaderCell>
        <Cell dataKey='dueDate'>{rowData=>(rowData.dueDate.split('T')[0])}</Cell>
      </Column>

      <Column flexGrow={1} align='center'>
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
          limitOptions={[15, 30, 50]}
          limit={lim}
          activePage={p}
          onChangePage={setP}
          onChangeLimit={fun}
        />
      </div>
      </div>
      {/* <ToastContainer/> */}
        </>
    )

}

export default UserTicket;