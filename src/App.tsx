import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddContact } from "./AddContact";
import { ContactsProvider, ContactList } from "./ContactsContext";
import { EditContact } from "./EditContact";

function App() {
  return (
    <BrowserRouter>
      <ContactsProvider>
        <Routes>
          <Route path="/" element={<ContactList/>}/> 
          <Route path="/add/" element={<AddContact/>}/>
          <Route path="/edit/:id" element={<EditContact/>}/> {/* kad stavis dve tacke to znaci da je to promenjiv deo */}
        </Routes>
      </ContactsProvider>
    </BrowserRouter>
  )
} 

export default App;
