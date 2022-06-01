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
        setData();
    },[props.member]); 

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
        props.onSubmit(firstName, lastName, address, dni);
    }

    const setData = ()=>{
        if(props.member){
            setFirstName(props.member.firstName);
            setLastName(props.member.lastName);
            setAddress(props.member.address);
            setDni(props.member.dni);
        }
        else{
            resetData();
        }
    }

    const resetData = ()=>{
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
                        onClick={(e)=>{setData()}}
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