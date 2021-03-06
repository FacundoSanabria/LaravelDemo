import React, {useState, useEffect} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { API } from '../../../Endpoints';
import MembersForm from './MembersForm';

function AddMembersForm(props) {
    const [key, setKey] = useState(0); // this is to reset MembersForm controller after a member is created

    const handleSubmit = (firstName, lastName, address, dni)=>{
        const data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            dni: dni
        }
        axios.post(API.CREATE_MEMBER, data)
        .then(res=>{
            props.onMemberCreated(res.data.data);
            toast.success(res.data.message);
            resetMembersForm();
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const resetMembersForm = () =>{
        setKey(key+1);
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="Form">
                    <h2>Crear Nuevo Miembro</h2>
                    <MembersForm
                        key={key}
                        member={null}
                        onSubmit={(firstName, lastName, address, dni)=>handleSubmit(firstName, lastName, address, dni)}
                    />
                </div>
            </div>
        </div>
    )
}
export default AddMembersForm;