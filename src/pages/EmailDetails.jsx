import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useOutletContext } from "react-router-dom";
import { mailService } from "../services/mail.service";
import { formatDistanceToNow } from 'date-fns';

export function EmailDetails() {

  const [onRemoveEmail, getEmailById, onBooleanStateChange] = useOutletContext()

  const [email, setEmail] = useState()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getEmailDetails()
  },[])

  async function getEmailDetails() {
    const mail = await getEmailById(params.emailId)
    setEmail(mail)
  }

  async function onDelete() {
    email.isTrash ? await onRemoveEmail(email.id) : await onBooleanStateChange(email.id, "isTrash", true)
    setEmail({})
    navigate('/mails')
  }

  function getTimeAgo(sentDate) {
    return formatDistanceToNow(sentDate, { addSuffix: true });
  }

  return (
    <>
      {email ? <article className="displayed-email-wrapper p5">
        <h2>{email.subject}</h2>
        <section className="flex space-between email-sent-details">
            <div className="flex column">
              <span>From <b>{email.from}</b></span>
              <span>To {mailService.getUser().email === email.to ? "me" : <b>{email.to}</b>}</span>
            </div>
            <div className="flex column align-end">
              <time style={{textAlign: 'end'}}>{new Date(email.sentAt).toLocaleString('default', {
                  month: 'short', 
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                })}
                , ({getTimeAgo(email.sentAt)})
              </time>
              <span onClick={onDelete} style={{cursor: 'pointer'}}>
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
