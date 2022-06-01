import React from 'react'
import Spinner from '../../Partials/Spinner';

function MembersTable(props) {
    return (
        <div className="card">
            <div className="card-body">
                {
                    props.members.legth === 0 ?
                        <Spinner/>
                    :
                        <table className="table">
                            <thead>
                                <tr>                       
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">SSN</th>
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
                                                <td>{member.ssn}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
            </div>
        </div>
    )
}
export default MembersTable;