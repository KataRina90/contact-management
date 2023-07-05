import { createContext, Dispatch, useReducer, useState } from "react";
import React from 'react';
import { useContext } from 'react';
import { ContactAction, contactsReducer } from "./AddContactReducer";
import { useNavigate } from "react-router-dom";


//1. Define the IContact interface with the numeric id property and string properties name and email
export interface IContact { id: number, name: string, email: string }
interface kontakti { children: React.ReactNode }

//2.Define ContactsContext for keeping the list of contacts as an array of IContact
export const ContactsContext = React.createContext<IContact[]>([])

//Create ContactsDispatchContext to keep the dispatch function
export const ContactsDispatchContext = createContext<Dispatch<ContactAction>>(null as any) //null jer ne znamo sta je inicijalna vrednost za dispatch funkciju

/* 3. Create the ContactsProvider component which renders the context provider of 
ContactsContext with an initial list of contacts. */

/* Update the ContactsProvider component to render a provider of ContactsDispatchContext.
The value of the provider should be set to the dispatch function obtained by calling the
useReducer()hook with arguments contactsReducer function and an initial list of contacts. */

export function ContactsProvider(props: kontakti) {
    const [contactArray, dispatchContacts] = useReducer(contactsReducer, niz)
    return (
        <ContactsDispatchContext.Provider value={dispatchContacts}> {/* value dispatch znaci da se ova funkcija cuva u ovom kontekstu i da ce deca imati pristup funkciji koristeci useContext pa to ime konteksta */}
            <ContactsContext.Provider value={contactArray}>
                {props.children}
            </ContactsContext.Provider> {/* //ne znam kako da mi vrednost bude inicijalna lista. Deca mogu da pristupe value kada pozovu usecontext */}
        </ContactsDispatchContext.Provider>)
}

//4.Create the component ContactCard for displaying props name and email of IContact
export function ContactCard(props: IContact) {
    const dispatch = useContext(ContactsDispatchContext) //ovime uzimam value od dispatchContacts na liniji 27
    const navigate = useNavigate();
    return (
        <div>
            <p> Name: {props.name} </p>
            <p> Email: {props.email} </p>
            <button onClick={e => dispatch({ type: 'DELETE', id: props.id })}> DELETE </button> {/* // zovem dispatch funkciju koja je predefinisana koja zahteva akciju kojom se kaze kako hocu da menjam stanje. Ona zove moj reducer interno, koji stvarno menja stanje i to se pamti u dispatch funkciji (sa onim setState ali mi to ne vidimo). On pamti kao novo stanje ono sto mu reducer vrati (u nasem slucaju reducer je funkcija contactsReducer) */}

            {/* Add a button with an image for editing in the ContactCard component, which navigates to a route
for editing a contact. The route should include the contact's id property as a route parameter */}
            <button
                onClick={e => navigate("/edit/" + props.id)}> {/* navigiraj mi na tu rutu, gde mu je identifier kontakta. kao da sam kucala na adresnoj liniji tu putanju, gde je props.id u stvari id kontakta, radi se konkatenacija stringa */}
                EDIT
            </button>
        </div>
    )
}


/* 5.Create the component ContactList to render the list of contacts obtained from ContactsContext
 using ContactCard.*/

//zasto umesto Icontact [] nisam mogla da koristim interfejs 'kontakti'?
export function ContactList() {
    const navigate = useNavigate();
    let useC = useContext(ContactsContext) //ovo je vrednost koju dobijam iz konteksta, znaci bice onaj niz. Znaci ne treba da idem preko propsa, nego idem preko contexta. 
    return (
        <div> <button onClick={e => navigate("/add/")}> Add Contact </button>
            <ul>
                {useC.map((el) => <li key={el.id}> <ContactCard name={el.name} email={el.email} id={el.id} /> </li>)
                }
            </ul>
        </div>
    )

}

/* 

6. Create the main App component rendering ContactsProvider and ContactList */

const niz: IContact[] = [
    { email: 'kaca', id: 1, name: 'Katarina' },
    { email: 'aki', id: 2, name: 'Andrej' },
    { email: 'kiki', id: 3, name: 'Kiki' }
]



