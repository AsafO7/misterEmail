import { EmailFilter } from '../cmps/EmailFilter'
import { EmailList } from '../cmps/EmailList'
import { Sidebar } from '../cmps/Sidebar'
import { mailService } from '../services/mail.service'
import { useState, useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { FolderFilter } from '../cmps/FolderFilter'

export function EmailIndex() {

  // const [user, setUser] = useState(mailService.createUser)
  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterBy, setFilterBy] = useState({folder: "", txt: "", isRead: null})

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
        <Sidebar />
        { loading ? <h2>Loading...</h2> : 
        <div>
        <FolderFilter onSetFilter={onSetFilter}/>
        <EmailList 
            emails={emails} 
            setEmails={setEmails} 
            filterBy={filterBy} 
            onSetFilter={onSetFilter}/>
          </div>}
      </div>
    </div>
  )
}
