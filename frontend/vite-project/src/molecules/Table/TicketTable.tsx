import { Table, Button, Col } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

function UserTicket({ticket}:any){
    
    // console.log("Tickets in org",ticket);
    console.log(typeof(ticket),">>>>>>>>>>>>>");

    return(
        <>
        <Table
    className='ticket-table'
      height={800} width={800}
      data={ticket}
    >
    <Column width={50} align='center' fixed>
        <HeaderCell>S.no</HeaderCell>
        <Cell>{1}</Cell>
      </Column>

      <Column width={100} align='center' >
        <HeaderCell>Type</HeaderCell>
        <Cell dataKey='type'></Cell>
      </Column>

      <Column width={130} align='center' >
        <HeaderCell>Status</HeaderCell>
        <Cell dataKey='status'></Cell>
      </Column>

      <Column width={70} align='center' >
        <HeaderCell>Key</HeaderCell>
        <Cell dataKey='key'></Cell>
      </Column>

      <Column width={200} align='center' >
        <HeaderCell>Summary</HeaderCell>
        <Cell dataKey='summary'></Cell>
      </Column>

      <Column width={300} align='center' >
        <HeaderCell>Reporter</HeaderCell>
        <Cell dataKey='reporter'></Cell>
      </Column>

      </Table>
        
        
        </>
    )

}

export default UserTicket;