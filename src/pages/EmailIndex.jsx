import { EmailFilter } from '../cmps/EmailFilter'
import { EmailList } from '../cmps/EmailList'
import { Sidebar } from '../cmps/Sidebar'
import { mailService } from '../services/mail.service'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { DropdownFilter } from '../cmps/DropdownFilter'
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { EmailCompose } from '../cmps/EmailCompose'
import { eventBusService } from '../services/event-bus.service'

export function EmailIndex() {

  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  //{folder: "", txt: "", isRead: "", date: ""}
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))
  const [composeModalState, setComposeModalState] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setSearchParams(filterBy)
    getEmails()
  },[filterBy])

  async function getEmails() {
    try {
      const emails = await mailService.query(filterBy)
      setEmails(emails)
      const allEmails = await mailService.query()
      // if(filterBy.folder === "" || filterBy.folder === "Inbox") {
        setUnreadCount(allEmails.filter((email) => !email.isRead).length)
      // }
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
      eventBusService.emit('show-user-msg', {type: 'error', txt: 'Could not open'})
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await mailService.remove(emailId)
      getEmails()
      eventBusService.emit('show-user-msg', {type: 'success', txt: 'Successfully removed'})
    }
    catch(err) {
      console.log(err)
      eventBusService.emit('show-user-msg', {type: 'error', txt: 'Could not be removed'})
    }
  }

  async function onUpdateEmail(email, field, newState) {
    try {
      const updatedMail = {...email, [field]: newState}
      await mailService.save(updatedMail)
      getEmails()
    }
    catch(err) {
      console.log(err)
      eventBusService.emit('show-user-msg', {type: 'error', txt: 'Could not update'})
    }
  }

  async function onCreateMail(email, setComposedEmail) {
    try {
      if(email === null) return
      const newM = await mailService.save(email)
      setComposedEmail(newM)
      if(email.sentAt) {
        eventBusService.emit('show-user-msg', {type: 'success', txt: 'Successfully added'})
      }
      navigate(`/mails?${searchParams}`)
      // setUnreadCount((prev) => prev + 1)
      getEmails()
    }
    catch(err) {
      console.log(err)
      eventBusService.emit('show-user-msg', {type: 'error', txt: 'Could not create'})
    }
  }

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
  }

  function handleComposeClick() {
    composeModalState ? navigate(`/mails?${searchParams}`) : navigate(`/mails/compose?${searchParams}`)
    setComposeModalState(!composeModalState)
  }

  return (
    <div className="email-index-wrapper">
      <section className='flex email-filter-wrapper'>
        <span className='compose-btn-wrapper'>
          <button className='compose-btn flex align-center' onClick={handleComposeClick}><EditIcon />Compose</button>
        </span>
        <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      </section>
      <div className='sidebar-email-wrapper flex'>
        <aside className='sidebar-wrapper'>
          <Sidebar filterBy={filterBy} onSetFilter={onSetFilter} unreadCount={unreadCount}/>
        </aside>
        { loading ? <h2>Loading...</h2> : 
        <main className='emails-folder-wrapper flex column full-grow'>
          <DropdownFilter onSetFilter={onSetFilter}/>
          {params.emailId ? <Outlet context={[onRemoveEmail, getEmailById, onUpdateEmail, searchParams]}/> :
          <EmailList 
              emails={emails} 
              setEmails={setEmails} 
              filterBy={filterBy} 
              onRemoveEmail={onRemoveEmail}
              onUpdateEmail={onUpdateEmail}
              setUnreadCount={setUnreadCount}/>
          }
          {composeModalState && <EmailCompose 
            setComposeModalState={setComposeModalState} 
            onCreateMail={onCreateMail} />}
        </main>}
      </div>
    </div>
  )
}
