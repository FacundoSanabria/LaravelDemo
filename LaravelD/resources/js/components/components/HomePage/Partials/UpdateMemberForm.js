import React, {useState, useEffect} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { API } from '../../../Endpoints';
import MembersForm from './MembersForm';

function UpdateMemberForm(props) {

    const handleSubmit = (firstName, lastName, address, dni)=>{
        const data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            dni: dni
        }
        axios.put(API.UPDATE_MEMBER + '/' + props.member.id, data)
        .then(res=>{
            props.onMemberUpdated(res.data.data);
            toast.success(res.data.message);
        })
        .catch(err =>{
            toast.error(err);
        })
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="Form">
                    <h2>Editar Miembro</h2>
                    <MembersForm
                        member={props.member}
                        onSubmit={(firstName, lastName, address, dni)=>handleSubmit(firstName, lastName, address, dni)}
                    />
                </div>
            </div>
        </div>
    )
}
export default UpdateMemberForm;