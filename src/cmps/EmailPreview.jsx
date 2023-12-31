import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
// import { useState } from 'react';
// import { useEffectUpdate } from '../Custom Hooks/useEffectUpdate';

export function EmailPreview({email, getEmails, onRemoveEmail, onUpdateEmail, filterBy, setComposeModalState, searchParams, selectedEmails, setSelectedEmails}) {

  // const [selected, setSelected] = useState(false)
  const navigate = useNavigate()

  // useEffectUpdate(() => {
  //   setSelected(selectedEmails.includes(email.id))
  // },[selectedEmails])

  async function onEmailNav() {
    if(filterBy.folder !== "Draft") {
      await onUpdateEmail(email, "isRead", true)
      navigate(`${email.id}`)
    }
    else {
      navigate(`compose/${email.id}?${searchParams}`)
      setComposeModalState(true)
      getEmails(filterBy)
    }
  }

  async function identifyIcon(dataAtt, classEl) {
    dataAtt !== null ? chooseIconAction(dataAtt) : chooseIconAction(classEl)
  }

  async function chooseIconAction(identifier) {
    switch(identifier) {
      case "delete-icon":
      case "DeleteIcon":
        email.isTrash ? await onRemoveEmail(email.id) : await onUpdateEmail(email, "isTrash", true)
        break;
      case "unarchive-icon":
      case "UnarchiveIcon":
        await onUpdateEmail(email, "isTrash", false)
        break;
      case 'full-star':
      case 'empty-star':
      case 'flex':
      case "StarIcon":
      case "StarBorderIcon":
        await onUpdateEmail(email, "isStarred", !email.isStarred)
        break;
      default: 
      await onUpdateEmail(email, "isRead", !email.isRead)
    }
  }

  function handleClick(e) {
    switch(e.target.localName) {
      case "path": identifyIcon(null, e.target.parentElement.parentElement.classList[0])
                   break;
      case "svg": identifyIcon(e.target.getAttribute('data-testid'), null)
                  break;
      case "input": handleCheckboxChange()
                  break;
      default: onEmailNav()
    }
    // console.log(e.target.localName)
    // console.log(e.target.getAttribute('data-testid'))
  }

  function handleCheckboxChange() {
    let newSelectedMails = [...selectedEmails]
    // console.log(selectedEmails)
    if(selectedEmails.includes(email.id)) {
      const ind = selectedEmails.indexOf(email.id)
      newSelectedMails.splice(ind, 1)
    }
    else {
      newSelectedMails.push(email.id)
    }
    // setSelected((prev) => !prev)
    setSelectedEmails(newSelectedMails)
    // console.log("Preview handleCheckBox", newSelectedMails)
  }

  return (
    <section className={`flex email ${email.isRead ? 'read-email' : ''}`} 
      onClick={(e) => handleClick(e)}>
      <input type='checkbox' checked={selectedEmails.includes(email.id)} name='isSelected' onChange={() => {}}></input>
      {email.isStarred ? 
      <span className='full-star'><StarIcon sx={{color: '#fbba00'}} onClick={handleClick}/></span> 
        : <span className='empty-star'><StarBorderIcon onClick={handleClick}/></span>}
      <span className='email-from'>{email.from}</span>
      <span className='text-subject'>{email.subject}</span>
      <p className='email-body-preview'>{email.body}</p>
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

EmailPreview.propTypes = {
  email: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired, 
    isRead: PropTypes.bool.isRequired, 
    isStarred: PropTypes.bool.isRequired, 
    sentAt : PropTypes.number || null, 
    removedAt : PropTypes.number || null,
    from: PropTypes.string.isRequired, 
    to: PropTypes.string.isRequired,
    isTrash: PropTypes.bool.isRequired
  }).isRequired,
  onRemoveEmail: PropTypes.func.isRequired, 
  onUpdateEmail: PropTypes.func.isRequired,
}