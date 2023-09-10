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
    email.isRead ? onBooleanStateChange("isRead", !email.isRead, 'show-unread', 'show-read')
    : onBooleanStateChange("isRead", !email.isRead, 'show-read', 'show-unread')
  }

  async function onFavoriteStateChange() {
    email.isStarred ? onBooleanStateChange("isStarred", !email.isStarred, 'full-star', 'empty-star')
    : onBooleanStateChange("isStarred", !email.isStarred, 'empty-star', 'full-star')
  }

  async function onBooleanStateChange(field, newState, classToAdd, classToRemove) {
    const updatedMail = {...email, [field]: newState}
    try {
      await mailService.save(updatedMail)
      const emails = await mailService.query(filterBy) 
      toggleIconClass(classToAdd, classToRemove)
      setEmails(emails)
    }
    catch(err) {
      console.log(err)
    }
  }

  function handleIconClass(action) {
    const showClass = email.isRead ? 'show-read' : 'show-unread'
    action === "enter" ? toggleIconClass(showClass, 'hide') : toggleIconClass('hide', showClass)
  }

  function toggleIconClass(classToAdd, classToRemove) {
    iconsEl.current.classList.add(classToAdd)
    iconsEl.current.classList.remove(classToRemove)
  }

  function identifyIcon(dataAtt, classEl) {
    if(dataAtt !== null) {
      switch(dataAtt) {
        case "DeleteIcon": 
          onRemoveEmail()
          break;
        case "StarIcon":
        case  "StarBorderIcon":
          onFavoriteStateChange()
          break;
        default: 
        onReadStateChange() 
      }
    }
    else {
      switch(classEl) {
        case "show-read":
        case "show-unread":
          onRemoveEmail()
          break;
        case 'full-star':
        case 'empty-star':
        case 'flex':
          onFavoriteStateChange()
          break;
        default: 
        onReadStateChange()
      }
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
    // console.log(e.target.getAttribute('data-testid'))
  }

  return (
    <section className={`flex email ${email.isRead ? 'read-email' : ''}`} 
      onMouseOver={() => handleIconClass("enter")} 
      onMouseLeave={() => handleIconClass("leave")}
      onClick={(e) => handleClick(e)}>
      {email.isStarred ? <span className='full-star'>
        <StarIcon sx={{color: '#fbba00'}} onClick={handleClick}/></span> 
        : <span className='empty-star'><StarBorderIcon onClick={handleClick}/></span>}
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
