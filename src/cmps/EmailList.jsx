import { EmailPreview } from '../cmps/EmailPreview'


export function EmailList({emails, onRemoveEmail, onUpdateEmail, setUnreadCount}) {
  return (
    <>
      { emails.length === 0 ? <h2>No emails</h2> : 
        <div className="emails-wrapper">
          
          <ul className='clean-list'>
            {emails.map((email) => {
              return <li key={email.id}>
                <EmailPreview email={email} 
                onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail}
                setUnreadCount={setUnreadCount}/>
              </li>
            })}
          </ul>
        </div>
      }
    </>
  )
}
