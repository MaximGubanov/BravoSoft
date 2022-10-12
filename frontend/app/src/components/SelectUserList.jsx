import React from "react"


export const Option = ({user, value}) => {
    return (
        <option value={value}>{`${user.firstname} ${user.lastname} ${user.surname}`}</option>
    )
}