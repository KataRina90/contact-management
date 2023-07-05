import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactsContext, ContactsDispatchContext } from "./ContactsContext";

/* Create the EditContact component as a form for editing a contact. The form should render the
contact's name and email of the user whose id is taken by the useParam hook from the route
parameter. */

/* step1: how do i find the contact
   step 2:  */

export const AddContact = () => {
    const dispatch = useContext(ContactsDispatchContext)
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onSubmit = (e: React.FormEvent) => {
        dispatch({ type: 'ADD', id: 50, name: name, email: email })
        navigate("/")
        /*  alert(`Save name:${name}, email:${email}`) */
    }

    {/* {e => dispatch({ type: 'ADD', id: props.id })}> ADD  */ }
    return (
        <form>
            <button onClick={onSubmit}>Submit</button>
            <button onClick={e=> {navigate("/")}}>Cancel</button>
            <label htmlFor="name-input"> Name: </label>
            <input id="name-input" value={name} onChange={onChangeName} />
            <label htmlFor="email-input"> Email: </label>
            <input id="email-input" value={email} onChange={onChangeEmail} />
        </form>
    )
}