import { EmailPreview } from '../cmps/EmailPreview'
import PropTypes from 'prop-types'

export function EmailList({emails, getEmails, onRemoveEmail, onUpdateEmail, filterBy, setComposeModalState, searchParams, selectedEmails, setSelectedEmails}) {

  return (
    <>
      { emails.length === 0 ? <h2>No emails</h2> : 
        <div className="emails-wrapper">
          
          <ul className='clean-list'>
            {emails.map((email) => {
              return <li key={email.id}>
                <EmailPreview email={email} 
                getEmails={getEmails}
                onRemoveEmail={onRemoveEmail}
                onUpdateEmail={onUpdateEmail}
                filterBy={filterBy}
                setComposeModalState={setComposeModalState}
                searchParams={searchParams}
                selectedEmails={selectedEmails}
                setSelectedEmails={setSelectedEmails}/>
              </li>
            })}
          </ul>
        </div>
      }
    </>
  )
}

EmailList.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  onRemoveEmail: PropTypes.func.isRequired,
  onUpdateEmail: PropTypes.func.isRequired,
  // setUnreadCount: PropTypes.func.isRequired,
}