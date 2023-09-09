import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from 'react';
import { mailService } from '../services/mail.service';
import { useNavigate } from 'react-router-dom';

// On hover, make the action icons appear
export function EmailPreview({email, setEmails, filterBy}) {

  const iconsEl = useRef()
  const navigate = useNavigate()

  async function onRemoveEmail() {
    await mailService.remove(email.id)
    const emails = await mailService.query(filterBy)
    setEmails(emails)
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

  function onEmailNav() {
    navigate(`/mail/${email.id}`)
  }

  return (
    <section className={`flex email ${email.isRead ? 'read-email' : ''}`} 
      onMouseOver={() => handleIconClass("enter")} 
      onMouseLeave={() => handleIconClass("leave")}
      onClick={onEmailNav}>
      {email.isStarred ? <StarIcon sx={{color: '#fbba00'}}/> : <StarBorderIcon/>}
      <span className='email-from'>{email.from}</span>
      <span className='text-subject'>{email.subject}</span>
      <p className='email-body'>{email.body}</p>
      <div className='email-date'>
        <span>{new Date(email.sentAt).toLocaleString('default',
        { month: 'long',}).substring(0,3)}</span>
        <span>{new Date(email.sentAt).getFullYear() % 100}</span>
      </div>
      <span className='hide' ref={iconsEl} onClick={onRemoveEmail}>
        <DeleteIcon />
      </span>
    </section>
  )
}
