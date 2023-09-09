import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { mailService } from "../services/mail.service"

export function EmailDetails() {

  const [email, setEmail] = useState()
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

  return (
    <>
      {email ? <div>
        <div>{email.subject}</div>
        <div>{email.body}</div>
        <div>{email.sentAt}</div>
        <div>{email.to}</div>
        <div>{email.from}</div>
      </div>
      : <h2>Loading...</h2>}
    </>
  )
}
