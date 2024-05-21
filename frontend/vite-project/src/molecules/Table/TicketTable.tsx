import { Table, Button, Col,Pagination } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
import { createIconFont } from '@rsuite/icons';
import { Cookies } from 'react-cookie';

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

function UserTicket({ticket,SetTicket,lim,p,setP,t,fun}:any){

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

        // try{
        //   console.log(rowData,'**********');
        //   const token:string | undefined = cookies.get('accessToken');
        //   const config = {
        //     headers: {
        //       Authorization: `BEARER ${token}`,
        //       'Custom-Header': 'Custom Value',
        //     },
        //   };

        //   const response = await axios.put("http://localhost:8555/users/updateTicket",rowData);
        //   // console.log('*************',response.data);
        //   console.log("Row data",rowData);
        //   console.log("id",_id);
        // }
        // catch(error:any){
        //   console.log(error.message);
        // }
    // };

    return(
        <>
        <div>
        <Table
    className='ticket-table'
      height={400} width={1100}
      data={ticket}
    >
    <Column width={50} align='center' fixed>
        <HeaderCell>S.no</HeaderCell>
        <SerialNumberCell/>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Type</HeaderCell>
        <EditableCell dataKey='type' onChange={handleChange}/>
      </Column>

      <Column width={130} align='center' >
        <HeaderCell>Status</HeaderCell>
        <EditableCell dataKey='status' onChange={handleChange}/>
      </Column>

      <Column width={220} align='center' >
        <HeaderCell>Summary</HeaderCell>
        <EditableCell dataKey='summary' onChange={handleChange}/>
      </Column>


      <Column width={300} align='center' >
        <HeaderCell>Reporter</HeaderCell>
        <Cell dataKey='reporter'/>
      </Column>

      <Column flexGrow={1} align='center' >
        <HeaderCell>...</HeaderCell>
        <ActionCell dataKey='_id' onClick={handleEditState}/>
      </Column>
        </Table>

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
        </>
    )

}

export default UserTicket;