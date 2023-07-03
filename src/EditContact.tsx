import React, { useState } from "react";
import { useParams } from "react-router-dom";

/* Create the EditContact component as a form for editing a contact. The form should render the
contact's name and email of the user whose id is taken by the useParam hook from the route
parameter. */

/* step1: how do i find the contact
   step 2:  */

export const EditContact = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const id = useParams; 

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onSubmit = (e: React.FormEvent) => {
        alert(`Save name:${name}, email:${email}`)
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="name-input"> Name: </label>
            <input id="name-input" value={name} onChange={onChangeName} />
            <label htmlFor="email-input"> Email: </label>
            <input id="email-input" value={email} onChange={onChangeEmail}/>
        </form>
    )
}