// import './Dashboard.scss';
// import { Button } from 'rsuite';
// import { Link } from 'react-router-dom';
// import {useEffect, useState} from 'react'
// import axios from 'axios'
// import { ToastContainer,toast } from 'react-toastify';

// function Dashboard(){   
//     const[org,SetOrg]=useState([]);
//     useEffect(()=>{ 
//         toast.success("Login Successful!"); 
//         axios.get("http://localhost:8555/admin/dashboard")
//         .then((res: any)=>{
//             // console.log(res.data)
//             SetOrg(res.data);
//         }).catch(err => {console.log(err)});
//     },[])

    
//     return(
//         <>
//         <div className="upperContainer">
//            <h1>System User Dashboard</h1>
//             <div className='btn'>
//                 <Link to='/dashboard/create'>
//                 <Button color='green' appearance='primary' >Create Organizations</Button>
//                 </Link>
//                 <Link to='/dashboard/createOrgUser'>
//                 <Button color='green' appearance='primary' >Create Organization User</Button>
//                 </Link>
//             </div>
//             <>
//             <div className='org-heading'><h2>All Organizations</h2></div>
//             {org.map((e:any,i:any)=>{
            
//            return( <div className='org'>
//             <p className='orgName' key={i} >{e.name}</p>
//             </div> )
//         })}
//         </>
//         </div>
//         <ToastContainer/>
//         </>
//     )
// }
// export default Dashboard


// Dashboard.jsx

import './Dashboard.scss';
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
    const [org, setOrg] = useState([]);

    useEffect(() => {
        toast.success("Login Successful!");
        axios.get("http://localhost:8555/admin/dashboard")
            .then((res) => {
                setOrg(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar">
                    <h2>All Organizations</h2>
                    <div className='org'>
                        {org.map((e:any, i) => (
                            <p className='orgName' key={i}>{e.name}</p>
                        ))}
                    </div>
                </div>
                </div>
                <div className="main-content">
                    <h1>System User Dashboard</h1>
                    <div className='btn'>
                        <Link to='/dashboard/create'>
                            <Button color='green' appearance='primary'>Create Organizations</Button>
                        </Link>
                        <Link to='/dashboard/createOrgUser'>
                            <Button color='green' appearance='primary'>Create Organization User</Button>
                        </Link>
                    </div>
                </div>
            {/* </div> */}
            <ToastContainer />
        </>
    )
}

export default Dashboard;
