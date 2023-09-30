import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom"
import PropTypes from 'prop-types'

export function Sidebar({filterBy, onSetFilter, unreadCount}) {

  const [folder, setFolder] = useState(filterBy.folder === "" ? "Inbox" : filterBy.folder)
  const params = useParams()
  const navigate = useNavigate()

  function handleFolderSwitch(folderName) {
    onSetFilter({...filterBy, folder: folderName})
    setFolder(folderName)
    if(params.emailId) {
      navigate(`/mails`)
    }
  }

  return (
    <nav className="sidebar-wrapper flex column">
      <span 
        className={`flex ${folder === "Inbox" ? "selected-folder" : ""}`}
        onClick={() => handleFolderSwitch("Inbox")}>
        <InboxIcon />
        <span>Inbox</span>
        <div className='inbox-unread-count'>{unreadCount ? unreadCount : ""}</div>
      </span>
      <span 
        className={`flex ${folder === "Starred" ? "selected-folder" : ""}`}
        onClick={() => handleFolderSwitch("Starred")}>
        <StarBorderIcon />
        <span>Starred</span>
      </span>
      <span 
        className={`flex ${folder === "Sent" ? "selected-folder" : ""}`}
        onClick={() => handleFolderSwitch("Sent")}>
        <SendIcon />
        <span>Sent</span>
      </span>
      <span 
        className={`flex ${folder === "Draft" ? "selected-folder" : ""}`}
        onClick={() => handleFolderSwitch("Draft")}>
        <DraftsIcon />
        <span>Draft</span>
      </span>
      <span 
        className={`flex ${folder === "Trash" ? "selected-folder" : ""}`}
        onClick={() => handleFolderSwitch("Trash")}>
        <DeleteOutlineIcon />
        <span>Trash</span>
      </span>
    </nav>
  )
}

Sidebar.propTypes = {
  filterBy: PropTypes.shape({
    folder: PropTypes.string,
    txt: PropTypes.string,
    isRead: PropTypes.string,
    date: PropTypes.string,
    order: PropTypes.string,
  }),
  onSetFilter: PropTypes.func,
  unreadCount: PropTypes.number,
}