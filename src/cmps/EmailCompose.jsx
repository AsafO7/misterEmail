import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

// HANDLE FULL SCREEN STATE
export function EmailCompose({setComposeModalState, onCreateMail, onCreateDraft, currDraft}) {

  const [screenState, setScreenState] = useState("normal")
  const [composedEmail, setComposedEmail] = useState({recipients: "", subject: "", body: ""})
  const [draftCreated, setDraftCreated] = useState(false)

  useEffect(() => {
    // let int
    // if(currDraft === null && (composedEmail.subject !== "" || composedEmail.body !== "" || composedEmail.recipients !== "")) {
    if(!draftCreated) {
      setDraftInterval()
    }
    // }
    // return () => {
    //   clearInterval(int)
    // }
  },[])

  async function saveDraft() {
    await onCreateDraft(composedEmail.subject, composedEmail.body, composedEmail.recipients)
    setDraftCreated(true)
  }

  function handleCloseModal() {
    setScreenState("normal")
    setComposeModalState((prev) => !prev)
    if(currDraft !== null) {
      setComposedEmail({recipients: "", subject: "", body: ""})
    }
  }

  function handleInputChange(value, field) {
    setComposedEmail((prev) => ({...prev, [field]: value}))
  }

  async function handleSendMail() {
    try {
      await onCreateMail(composedEmail.subject, composedEmail.body, composedEmail.recipients)
      setComposedEmail({recipients: "", subject: "", body: ""})
      handleCloseModal()
    }
    catch(err) {
      console.log(err)
    }
  }

  function setDraftInterval() {
    console.log(2)
    setInterval(() => {
      saveDraft()
    },5000)
  }
  
  function handleScreenStateChange(e) {
    console.log(e.target);
    if(e.target.id && e.target.id === 'full' || e.target.parentElement && e.target.parentElement.id === 'full') {
      screenState === "fullscreen" ? setScreenState("normal") : setScreenState("fullscreen")
    }
    else {
      screenState === "minimized" ? setScreenState("normal") : setScreenState("minimized")
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
          <section>
            <input type='text' 
              className='compose-to-input p10' 
              placeholder='Recipients'
              value={composedEmail.recipients}
              name='recipient'
              onFocus={(e) => e.target.placeholder='To'}
              onBlur={(e) => e.target.placeholder='Recipients'}
              onChange={(e) => handleInputChange(e.target.value, 'recipients')}/>

            <input type='text' 
              className='compose-subject-input p10' 
              placeholder='Subject'
              value={composedEmail.subject}
              name='subject'
              onChange={(e) => handleInputChange(e.target.value, 'subject')}/>
          </section>
          <textarea className='compose-body' name='body' value={composedEmail.body} onChange={(e) => handleInputChange(e.target.value, 'body')}></textarea>
          <footer className='flex space-between p5'>
            <button className='compose-send-btn' onClick={handleSendMail}>Send</button>
            <button className='compose-delete-btn simple-button' onClick={handleCloseModal}><DeleteIcon /></button>
          </footer>
      </>}
    </div>
  )
}
