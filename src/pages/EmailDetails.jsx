import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mailService } from "../services/mail.service"
import DeleteIcon from '@mui/icons-material/Delete';

export function EmailDetails() {

  const [email, setEmail] = useState()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getEmailDetails()
  },[])

  async function getEmailDetails() {
    try {
      const mail = await mailService.getById(params.emailId)
      setEmail(mail)
    }
    catch(err) {
      console.log(err)
    }
  }

  async function onRemoveEmail() {
    try {
      await mailService.remove(email.id)
      navigate('/mail')
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      {email ? <article>
        <h2>{email.subject}</h2>
        <section className="flex space-between email-sent-details">
            <div className="flex column">
              <span>From: <b>{email.from}</b></span>
              <span>To: <b>{email.to}</b></span>
            </div>
            <div className="flex column align-end">
              <time>{new Date(email.sentAt).toLocaleString('default', {
                  month: 'short', 
                  day: '2-digit', 
                  year: 'numeric'
                })}
              </time>
              <span onClick={onRemoveEmail} style={{cursor: 'pointer'}}>
                <DeleteIcon />
              </span>
            </div>
        </section>
        <p style={{marginTop: '30px'}}>{email.body}</p>
      </article>
      : <h2>Loading...</h2>}
    </>
  )
}
