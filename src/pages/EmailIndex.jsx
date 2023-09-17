import { EmailFilter } from '../cmps/EmailFilter'
import { EmailList } from '../cmps/EmailList'
import { Sidebar } from '../cmps/Sidebar'
import { mailService } from '../services/mail.service'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { DropdownFilter } from '../cmps/DropdownFilter'
import { Outlet, useParams } from 'react-router-dom'

export function EmailIndex() {

  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterBy, setFilterBy] = useState({folder: "", txt: "", isRead: "", date: ""})
  const params = useParams()

  useEffect(() => {
    getEmails()
  },[filterBy])

  async function getEmails() {
    try {
      const emails = await mailService.query(filterBy)
      setEmails(emails)
      setLoading(false)
    }
    catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  async function getEmailById(emailId) {
    try {
      const mail = await mailService.getById(emailId)
      return mail
    }
    catch(err) {
      console.log(err)
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await mailService.remove(emailId)
      const emails = await mailService.query(filterBy)
      setEmails(emails)
    }
    catch(err) {
      console.log(err)
    }
  }

  async function onBooleanStateChange(emailId, field, newState) {
    try {
      const email = await mailService.getById(emailId)
      const updatedMail = {...email, [field]: newState}
      await mailService.save(updatedMail)
      const emails = await mailService.query(filterBy) 
      setEmails(emails)
    }
    catch(err) {
      console.log(err)
    }
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
  }

  return (
    <div className="email-index-wrapper">
      <section className='flex email-filter-wrapper'>
        <span className='compose-btn-wrapper'>
          <button className='compose-btn flex align-center'><EditIcon />Compose</button>
        </span>
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      </section>
      <div className='sidebar-email-wrapper flex'>
        <aside className='sidebar-wrapper'>
          <Sidebar filterBy={filterBy} onSetFilter={onSetFilter}/>
        </aside>
        { loading ? <h2>Loading...</h2> : 
        <main className='emails-folder-wrapper flex column full-grow'>
          <DropdownFilter onSetFilter={onSetFilter}/>
          {params.emailId ? <Outlet context={[onRemoveEmail, getEmailById, onBooleanStateChange]}/> :
          <EmailList 
              emails={emails} 
              setEmails={setEmails} 
              filterBy={filterBy} 
              onRemoveEmail={onRemoveEmail}
              onBooleanStateChange={onBooleanStateChange}/>
          }
        </main>}
      </div>
    </div>
  )
}
