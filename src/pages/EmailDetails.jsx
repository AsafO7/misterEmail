import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { useOutletContext } from "react-router-dom";
import { mailService } from "../services/mail.service";
import { formatDistanceToNow } from 'date-fns';
import { eventBusService } from '../services/event-bus.service'

export function EmailDetails() {

  const [onRemoveEmail, getEmailById, onUpdateEmail, searchParams] = useOutletContext()

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
    email.isTrash ? await onRemoveEmail(email) : await onUpdateEmail(email, "isTrash", true)
    setEmail({})
    navigate(`/mails/${searchParams}`)
    eventBusService.emit('show-user-msg', {type: 'success', txt: 'Successfully removed'})
  }

  function getTimeAgo(sentDate) {
    return formatDistanceToNow(sentDate, { addSuffix: true });
  }

  return (
    <>
      {email ? <article className="displayed-email-wrapper">
        <h2>{email.subject}</h2>
        <section className="flex space-between email-sent-details">
            <div className="flex column">
              <span>From {mailService.getUser().email === email.from ? "me" : <b>{email.from}</b>}</span>
              <span>To {mailService.getUser().email === email.to ? "me" : <b>{email.to}</b>}</span>
            </div>
            <div className="flex column align-end">
              {email.sentAt !== null && <time style={{textAlign: 'end'}}>{new Date(email.sentAt).toLocaleString('default', {
                  month: 'short', 
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                  year: 'numeric',
                })}
                , ({getTimeAgo(email.sentAt)})
              </time>}
              <span onClick={onDelete} style={{cursor: 'pointer'}}>
                <DeleteIcon />
              </span>
            </div>
        </section>
        <p className="email-body">{email.body}</p>
      </article>
      : <h2>Loading...</h2>}
    </>
  )
}
