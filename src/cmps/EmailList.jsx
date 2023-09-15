import { EmailPreview } from '../cmps/EmailPreview'


export function EmailList({emails, setEmails, filterBy, onRemoveEmail, onBooleanStateChange}) {
  return (
    <>
      { emails.length === 0 ? <h2>No emails</h2> : 
        <div className="emails-wrapper">
          
          <ul className='clean-list'>
            {emails.map((email) => {
              return <li key={email.id}>
                <EmailPreview email={email} 
                setEmails={setEmails} 
                filterBy={filterBy} 
                onRemoveEmail={onRemoveEmail}
                onBooleanStateChange={onBooleanStateChange}/>
              </li>
            })}
          </ul>
        </div>
      }
    </>
  )
}
