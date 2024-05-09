import './Dashboard.scss';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';

function Dashboard(){

    return(
        <div className="upperContainer">
            <h3 className="heading">System Admin Dashboard</h3>

            <div className='Left'>
                <Link to='/dashboard/create'>
                <Button appearance='ghost' >Create Organizations</Button>
                </Link>
            </div>
        </div>
    )
}
export default Dashboard