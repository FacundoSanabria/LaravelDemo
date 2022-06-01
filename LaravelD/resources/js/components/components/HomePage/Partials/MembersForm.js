import React, {useState, useEffect} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { API } from '../../../Endpoints';

function MembersForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [dni, setDni] = useState("");
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    useEffect(()=>{ 
        //validation
        setIsSubmitEnabled(
            firstName.length > 1 &&
            lastName.length > 1 &&
            address.length > 1 &&
            /^\d{8}$/.test(dni)
        );
    },[firstName, lastName, address, dni]); 

    const handleSubmit = ()=>{
        const data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            dni: dni
        }
        axios.post(API.POST_MEMBER, data)
        .then(res=>{
            props.onMemberCreated(res.data.data);
            toast.success(res.data.message);
            resetForm();
        })
        .catch(err =>{
            toast.error(err.response.data.message);
        })
    }

    const handleReset = ()=>{
        resetForm();
    }

    const resetForm = ()=>{
        setFirstName("");
        setLastName("");
        setAddress("");
        setDni("");
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="Form">
                    <div className="mb-3">
                        <label htmlFor="FirstNameInput" className="form-label">Nombre:</label>
                        <input type="text" className="form-control" id="FirstNameInput" placeholder="Nombre"
                            value={firstName}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="LastNameInput" className="form-label">Apellido:</label>
                        <input type="text" className="form-control" id="LastNameInput" placeholder="Apellido"
                            value={lastName}
                            onChange={(e)=>{setLastName(e.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AddressInput" className="form-label">Direccion:</label>
                        <input type="text" className="form-control" id="AddressInput" placeholder="Direccion"
                            value={address}
                            onChange={(e)=>{setAddress(e.target.value)}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="DNIInput" className="form-label">DNI:</label>
                        <input type="text" className="form-control" id="DNIInput" placeholder="DNI"
                            value={dni}
                            onChange={(e)=>{setDni(e.target.value)}}
                        />
                    </div>
                    <button type="submit" className="btn btn-danger me-2"
                        onClick={(e)=>{handleReset()}}
                        >Reset
                    </button>
                    <button type="submit" className="btn btn-primary"
                        disabled={!isSubmitEnabled}
                        onClick={(e)=>{handleSubmit()}}
                        >Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
export default MembersForm;