import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactsContext, ContactsDispatchContext, IContact } from "./ContactsContext";


/* Create the EditContact component as a form for editing a contact. The form should render the
contact's name and email of the user whose id is taken by the useParam hook from the route
parameter. */

/* step1: how do i find the contact
   step 2: na onsovu id-a nadjem koji je kontakt
   step 3: za taj kontakt sacuvam stanje za name i email u useState
   step 4: */

export const EditContact = () => {
    const dispatch = useContext(ContactsDispatchContext)
    const navigate = useNavigate();
    const id = useParams().id; /* gde god stavis dve tacke uspravne on ucitava kao Param, a tackom iza poziva  definisemo koji param  */
    const idnum = parseInt(id!);
    const contactarray = useContext(ContactsContext) /* ovime cuvamo vrednost niza */
    /*   treba mi niz kontakata i funkcija kojom menjam stanje kontakata */
    const element = contactarray.find(x => x.id === idnum);
   /*  if (element === undefined) {
        alert(`Contact id ${idnum} not found`)
        return null
    } */
    const [name, setName] = useState(element?.name);
    const [email, setEmail] = useState(element?.email);

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const onSubmit = (e: React.FormEvent) => {
        dispatch({ type: 'EDIT', id:idnum, name: name!, email: email! })
        navigate("/")
    }
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