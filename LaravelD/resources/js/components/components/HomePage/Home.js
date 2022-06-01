import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import { API } from '../../Endpoints';
import AddMemberForm from './Partials/AddMemberForm';
import UpdateMemberForm from './Partials/UpdateMemberForm';
import MembersTable from './Partials/MembersTable';
import Idle from 'react-idle';

function Home() {
    const [members, setMembers] = useState([])
    const [editingMemberId, setEditingMemberId] = useState(-1)
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
            setMembers(res.data.data);
        })
        .catch(err=>{
            console.log(err);
        }) 
    }
    
    const onMemberCreatedHandler = (newMember) =>{
        setMembers([...members, newMember]);
    }

    const onMemberUpdatedHandler = (member) =>{
        console.log(member);
        const newMembers = [...members];
        newMembers[members.findIndex(e=>e.id==member.id)] = member
        setMembers(newMembers);
        console.log(newMembers);
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
                                    {
                                        editingMemberId === -1 
                                        ?
                                            <AddMemberForm
                                                onMemberCreated={(m)=>{onMemberCreatedHandler(m)}}
                                            />
                                        :
                                            <UpdateMemberForm
                                                member={members.find(e=>e.id==editingMemberId)}
                                                onMemberUpdated={(m)=>{onMemberUpdatedHandler(m)}}
                                            />
                                    }

                                </div>
                                <div className="col">
                                    <MembersTable
                                        members={members}
                                        onEditMember={(memberId)=>{setEditingMemberId(memberId)}}
                                        onCreateMember={()=>{setEditingMemberId(-1)}}
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