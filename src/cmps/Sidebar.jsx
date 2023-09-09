import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';

export function Sidebar() {

  const [folder, setFolder] = useState("Inbox")

  return (
    <nav className="sidebar-wrapper flex column">
      <span 
        className={`flex ${folder === "Inbox" ? "selected-folder" : ""}`}
        onClick={() => setFolder("Inbox")}>
        <InboxIcon />
        <span>Inbox</span>
      </span>
      <span 
        className={`flex ${folder === "Starred" ? "selected-folder" : ""}`}
        onClick={() => setFolder("Starred")}>
        <StarBorderIcon />
        <span>Starred</span>
      </span>
      <span 
        className={`flex ${folder === "Sent" ? "selected-folder" : ""}`}
        onClick={() => setFolder("Sent")}>
        <SendIcon />
        <span>Sent</span>
      </span>
      <span 
        className={`flex ${folder === "Draft" ? "selected-folder" : ""}`}
        onClick={() => setFolder("Draft")}>
        <DraftsIcon />
        <span>Draft</span>
      </span>
      <span 
        className={`flex ${folder === "Trash" ? "selected-folder" : ""}`}
        onClick={() => setFolder("Trash")}>
        <DeleteOutlineIcon />
        <span>Trash</span>
      </span>
    </nav>
  )
}
