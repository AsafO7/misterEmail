import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';
import { mailService } from '../services/mail.service';
import { useNavigate } from 'react-router-dom';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

// On hover, make the action icons appear
export function EmailPreview({email, setEmails, filterBy}) {

  const iconsEl = useRef()
  const navigate = useNavigate()

  async function onRemoveEmail() {
    try {
      await mailService.remove(email.id)
      const emails = await mailService.query(filterBy)
      setEmails(emails)
    }
    catch(err) {
      console.log(err)
    }
  }

  async function onEmailNav() {
    await mailService.save({...email, isRead: true})
    navigate(`/mail/${email.id}`)
  }

  async function onReadStateChange() {
    const readState = email.isRead
    const updatedMail = {...email, isRead: !readState}
    try {
      await mailService.save(updatedMail)
      const emails = await mailService.query(filterBy)
      if(readState) {
        iconsEl.current.classList.add('show-unread')
        iconsEl.current.classList.remove('show-read')
      }
      else {
        iconsEl.current.classList.add('show-read')
        iconsEl.current.classList.remove('show-unread')
      }  
      setEmails(emails)
    }
    catch(err) {
      console.log(err)
    }
  }

  function handleIconClass(action) {
    const showClass = email.isRead ? 'show-read' : 'show-unread'
    if(action === "enter") {
      iconsEl.current.classList.add(showClass)
      iconsEl.current.classList.remove('hide')
    } else {
      iconsEl.current.classList.remove(showClass)
      iconsEl.current.classList.add('hide')
    }
  }

  function identifyIcon(dataAtt, classEl) {
    if(dataAtt !== null) {
      dataAtt === "DeleteIcon" ? onRemoveEmail() : onReadStateChange()
    }
    else {
      classEl === "show-read" || classEl === "show-unread" ? onRemoveEmail() : onReadStateChange()
    }
  }

  function handleClick(e) {
    switch(e.target.localName) {
      case "path": identifyIcon(null, e.target.parentElement.parentElement.classList[0])
                   break;
      case "svg": identifyIcon(e.target.getAttribute('data-testid'), null)
                  break;
      default: onEmailNav()
    }
  }

  return (
    <section className={`flex email ${email.isRead ? 'read-email' : ''}`} 
      onMouseOver={() => handleIconClass("enter")} 
      onMouseLeave={() => handleIconClass("leave")}
      onClick={(e) => handleClick(e)}>
      {email.isStarred ? <StarIcon sx={{color: '#fbba00'}}/> : <StarBorderIcon/>}
      <span className='email-from'>{email.from}</span>
      <span className='text-subject'>{email.subject}</span>
      <p className='email-body'>{email.body}</p>
      <div className='email-date'>
        <span>{new Date(email.sentAt).toLocaleString('default',
        { month: 'short',})}</span>
        <span>{new Date(email.sentAt).getFullYear() % 100}</span>
      </div>
      <section className='hide' ref={iconsEl} onClick={(e) => handleClick(e)}>
        {email.isRead ? <span className='mark-as-unread'><MarkunreadIcon onClick={handleClick}/></span>
        : <span className='mark-as-read'><MarkEmailReadIcon onClick={handleClick}/></span>}
        <DeleteIcon />
      </section>
    </section>
  )
}
