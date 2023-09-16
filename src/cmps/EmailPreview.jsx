import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import { mailService } from '../services/mail.service';
import { useNavigate } from 'react-router-dom';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

export function EmailPreview({email, onRemoveEmail, onBooleanStateChange}) {

  const navigate = useNavigate()

  async function onEmailNav() {
    await mailService.save({...email, isRead: true})
    navigate(`${email.id}`)
  }

  async function identifyIcon(dataAtt, classEl) {
    dataAtt !== null ? chooseIconAction(dataAtt) : chooseIconAction(classEl)
  }

  async function chooseIconAction(identifier) {
    switch(identifier) {
      case "delete-icon":
      case "DeleteIcon":
        email.isTrash ? await onRemoveEmail(email.id) : await onBooleanStateChange(email.id, "isTrash", true)
        break;
      case "unarchive-icon":
      case "UnarchiveIcon":
        await onBooleanStateChange(email.id, "isTrash", false)
        break;
      case 'full-star':
      case 'empty-star':
      case 'flex':
      case "StarIcon":
      case "StarBorderIcon":
        await onBooleanStateChange(email.id, "isStarred", !email.isStarred)
        break;
      default: 
      await onBooleanStateChange(email.id, "isRead", !email.isRead)
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
      onClick={(e) => handleClick(e)}>
      {email.isStarred ? 
      <span className='full-star'><StarIcon sx={{color: '#fbba00'}} onClick={handleClick}/></span> 
        : <span className='empty-star'><StarBorderIcon onClick={handleClick}/></span>}
      <span className='email-from'>{email.from}</span>
      <span className='text-subject'>{email.subject}</span>
      <p className='email-body'>{email.body}</p>
      <div className='email-date'>
        <span>{new Date(email.sentAt).toLocaleString('default',
        { month: 'short',})}</span>
        <span>{new Date(email.sentAt).getFullYear() % 100}</span>
      </div>
      <section className={email.isRead ? 'mail-icons-read' : 'mail-icons-unread'}>
        {email.isRead ? <span className='mark-as-unread'><MarkunreadIcon onClick={handleClick}/></span>
        : <span className='mark-as-read'><MarkEmailReadIcon onClick={handleClick}/></span>}
        {email.isTrash && <span className='unarchive-icon'><UnarchiveIcon onClick={handleClick}/></span>}
        <span className='delete-icon'><DeleteIcon /></span>
      </section>
    </section>
  )
}
