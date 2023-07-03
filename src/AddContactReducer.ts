
import { type } from "os";
import React from "react";
import { useState, useContext, useReducer } from "react";
import { ContactsContext,IContact } from "./ContactsContext";

//Define the ContactAction type defining reducer actions for adding, editing and deleting contacts.
export type ContactAction =
  | { type: "ADD"; id: number; name: 'string'; email: 'string' }
  | { type: "DELETE"; id: number }
  | { type: "EDIT"; id: number; name: 'string'; email: 'string' }; //zasto sam ovde morala da definisem novi objekat tipa IContact?

/* Define the contactsReducer function, which accepts an array of IContact and action of type
ContactAction. It returns a new array of contacts based on the dispatched action. A newly added
contact should have a randomly generated id. */
export function contactsReducer(state: IContact[], action: ContactAction): IContact[]
{switch (action.type) {
  case "ADD":
    return [
      ...state,
      { id: action.id, name: action.name, email: action.email } //ovde sta znaci dodeliti random id? kako se to radi?
    ];
  case "DELETE":
    return state.filter((contact) => contact.id !== action.id); //koji se niz tacno filtrira - niz stanj?


  case "EDIT":
    return state.map((contact) => {
      if (contact.id === action.id) {
        return {name: action.name, email: action.email, id:action.id }
      } else {
        return contact;
      }
    });
    default: //sta znaci ovo default? 
    return state;} }

export const initialContacts: IContact[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" }
];


/*    case "COMPLETE":
  return state.map((todo) => {
    if (todo.id === action.id) {
      return { ...todo, complete: !todo.complete };
    } else {
      return todo;
    }
  }); */

/* if (todo.id === action.id) {
  return { ...todo, complete: !todo.complete };
} else {
  return todo; */