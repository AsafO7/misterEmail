import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { mailService } from '../services/mail.service';
import PropTypes from 'prop-types'


export function EmailCompose({setComposeModalState, onCreateMail}) {

  const [screenState, setScreenState] = useState("normal")
  const [composedEmail, setComposedEmail] = useState()
  const refTimeout = useRef(null)

  useEffect(() => {
    setComposedEmail(setEmptyMail())
  },[])

  useEffect(() => {
    if(composedEmail && (composedEmail.body !== ""
    || composedEmail.subject !== ""
    || composedEmail.to !== "")) {
      refTimeout.current = setTimeout(() => {
        saveDraft()
      },5000)

      return () => {
        clearTimeout(refTimeout.current)
      }
    }
  },[composedEmail])

  async function saveDraft() {
    await onCreateMail(composedEmail, setComposedEmail)
  }

  async function handleCloseModal() {
    setScreenState("normal")
    setComposeModalState((prev) => !prev)
    setComposedEmail(setEmptyMail())
  }

  function handleInputChange(value, field) {
    setComposedEmail((prev) => ({...prev, [field]: value}))
  }

  async function handleSendMail() {
    try {
      await onCreateMail({...composedEmail, sentAt: new Date().getTime(), removedAt: new Date().getTime()}, setComposedEmail)
      setComposedEmail(setEmptyMail())
      handleCloseModal()
    }
    catch(err) {
      console.log(err)
    }
  }
  
  function handleScreenStateChange(e) {
    if(e.target.id && e.target.id === 'full' || e.target.parentElement && e.target.parentElement.id === 'full') {
      screenState === "fullscreen" ? setScreenState("normal") : setScreenState("fullscreen")
    }
    else {
      screenState === "minimized" ? setScreenState("normal") : setScreenState("minimized")
    }
  }

  function setEmptyMail() {
    return {
      subject: "",
      body: "", 
      isRead: false, 
      isStarred: false, 
      sentAt: null, 
      removedAt: null,
      from: mailService.getUser().email, 
      to: "",
      isTrash: false,
    }
  }

  return (
    <div className={`email-compose-wrapper 
    ${screenState !== "minimized" ? 'height-full' : ""}
    ${screenState === "fullscreen" ? "compose-fullscreen" : ""}`}>
        <header className='flex space-between email-compose-header p10' 
        onClick={(e) => handleScreenStateChange(e)}>
          <h4 style={{marginRight: `${screenState === "minimized" ? '30px' : ""}`}}>New Message</h4>
          <section className='screen-size-btns'>
            <button className='simple-button'
              onClick={(e) => handleScreenStateChange(e)}>
              <MinimizeIcon className='minimize-icon' id='minimized'
              sx={{fontSize: '1rem', transform: `${screenState !== "minimized" ? 'rotate(0deg)' : 'rotate(180deg)'}`}}
              /></button>
            <button className='simple-button' id='full' 
              onClick={(e) => handleScreenStateChange(e)}>
              <OpenInFullIcon sx={{fontSize: '1rem'}} id='full'/>
            </button>
            <button className='simple-button' onClick={handleCloseModal}><CloseIcon sx={{fontSize: '1rem'}}/></button>
          </section>
        </header>
        {screenState !== "minimized" && <>
          <form className='compose-form'>
            <input type='text' 
              className='compose-to-input p10' 
              placeholder='Recipients'
              name='to'
              onFocus={(e) => e.target.placeholder='To'}
              onBlur={(e) => e.target.placeholder='Recipients'}
              onChange={(e) => handleInputChange(e.target.value, 'to')}/>

            <input type='text' 
              className='compose-subject-input p10' 
              placeholder='Subject'
              name='subject'
              onChange={(e) => handleInputChange(e.target.value, 'subject')}/>
            <textarea className='compose-body' name='body' onChange={(e) => handleInputChange(e.target.value, 'body')}></textarea>
          </form>
          <footer className='flex space-between p5'>
            <button className='compose-send-btn' onClick={handleSendMail}>Send</button>
            <button className='compose-delete-btn simple-button' onClick={handleCloseModal}><DeleteIcon /></button>
          </footer>
      </>}
    </div>
  )
}

EmailCompose.propTypes = {
  setComposeModalState: PropTypes.func,
  onCreateMail: PropTypes.func,
}