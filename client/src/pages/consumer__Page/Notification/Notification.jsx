import React, { useContext } from 'react'
import { UserData } from '../../../../hooks/useContext/ConsumerInfo'

const Notification = () => {
  const userData = useContext(UserData)
 if(userData.notification.length === 0) return <div  style={{
  color:'white',
  textAlign:'center'
}}><h2>No Notification</h2></div> 
return (
  <>
  <h2 style={{
  color:'white',
  textAlign:'center'
}}>Notification</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Message</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
      {userData.notification && userData.notification.length > 0 && userData.notification.map((value,index) => (
          <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.message}</td>
              <td>{new Date(value.date).toLocaleTimeString('en-US', { weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',})}</td>
          </tr>
      ))}
  </tbody>
</table>
</>
)
}

export default Notification