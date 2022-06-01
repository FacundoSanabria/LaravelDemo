import React from 'react'
import Spinner from '../../Partials/Spinner';

function MembersTable(props) {
    const editBttnClickHandle = (memberId)=>{
        props.onEditMember(memberId);
    }

    return (
        <div className="card">
            <div className="card-body">
                {
                    props.members.legth === 0 ?
                        <Spinner/>
                    :
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>                       
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Direccion</th>
                                        <th scope="col">DNI</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.members.map((member,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{member.firstName}</td>
                                                    <td>{member.lastName}</td>
                                                    <td>{member.address}</td>
                                                    <td>{member.dni}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-info"
                                                            onClick={(e)=>{props.onEditMember(member.id)}}
                                                        >
                                                            Editar
                                                        </button>    
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                                <button className="btn btn-sm btn-primary"
                                onClick={()=>{props.onCreateMember()}}
                            >
                                Crear Nuevo Miembro
                            </button>  
                        </div>  
                    }
            </div>
        </div>
    )
}
export default MembersTable;