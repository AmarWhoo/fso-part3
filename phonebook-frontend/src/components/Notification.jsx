import React from 'react'
const Notification = ({ message, notifType }) => {
    const errorStyle = {
        color: 'red'
    }

    const confirmStyle ={
        color: 'green'
    }

    if (message === null) return null;

    return (
    <div className='notif' style={notifType ? confirmStyle : errorStyle}>
        {message}
    </div>
    )
}

export default Notification