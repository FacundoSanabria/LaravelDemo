import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import { API } from '../../Endpoints';
import MembersForm from './Partials/MembersForm';
import MembersTable from './Partials/MembersTable';
import Idle from 'react-idle'

function Home() {
    const [members, setMembers] = useState([])
    const [isIdle, setIsIdle] = useState(false);
    const [idleKey, setIsIdleKey] = useState(0);

    useEffect(()=>{ 
        getMembers();  
    }, []);

    useEffect(()=>{ 
        if(isIdle === true){
            getMembers();
            setIsIdle(false);
            setIsIdleKey(idleKey+1); // restart idle component to restart the counter
        }
    }, [isIdle]);

    const getMembers = () =>{
        axios.get(API.GET_MEMBERS)
        .then(res=>{
            setMembers(res.data);
        })
        .catch(err=>{
            console.log(err);
        }) 
    }
    
    const onMemberCreatedHandler = (newMember) =>{
        setMembers([...members, newMember]);
    }

    return (
        <div className='container p-3'>
            <Idle
                key = {idleKey}
                timeout={120000}
                onChange={(e)=>{setIsIdle(e.idle)}}
            />
            <div className='row'>
                <div className="card" id="main-card">
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <MembersForm
                                        onMemberCreated={(m)=>{onMemberCreatedHandler(m)}}
                                    />
                                </div>
                                <div className="col">
                                    <MembersTable
                                        members={members}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;