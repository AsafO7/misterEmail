import { useState } from "react"
import PropTypes from 'prop-types'
import { useEffectUpdate } from '../Custom Hooks/useEffectUpdate';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { mailService } from "../services/mail.service";

/*
1) Add a checkbox here that selects all mails when checked
2) When a mail is selected, change the entire JSX rendered to an icon section
3) Implement the functionality for when the icons are clicked
*/

export function DropdownFilter({filterBy, onSetFilter, emails, selectedEmails, setSelectedEmails, onUpdateEmail, onRemoveEmail}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  // const [selected, setSelected] = useState(false)

  // useEffectUpdate(() => {
  //   setSelected(selectedEmails.length > 0)
  //   console.log("dropdown useEffect", selectedEmails);
  // },[selectedEmails])

  useEffectUpdate(() => {
    onSetFilter(filterByToEdit)
  },[filterByToEdit])

  function handleFilterChange(e) {
    const { value, name: field } = e.target
    setFilterByToEdit((prev) => ({ ...prev, [field]: value }))
  }

  function handleSelectAll(e) {
    if(!e.target.checked) {
      setSelectedEmails([])
    }
    else {
      const emailsIds = emails.map((email) => email.id)
      setSelectedEmails(emailsIds)
    }
  }

  async function handleFieldChangeSelected(field, value) {
    console.log("Dropdown ", selectedEmails);
    if(filterBy.folder === "Trash") {
      for(let i = 0; i < selectedEmails.length; i++) {
        const mail = await mailService.getById(selectedEmails[i])
        field === "isTrash" && value ? await onRemoveEmail(mail.id) : await onUpdateEmail(mail, field, value)
      }
    }
    else {
      for(let i = 0; i < selectedEmails.length; i++) {
        const mail = await mailService.getById(selectedEmails[i])
        await onUpdateEmail(mail, field, value)
      }
    }
  }

// console.log("Dropdown ", selectedEmails);
  return (
      <div className="dropdown-filter-wrapper p5 flex">
        <input type='checkbox' name="select-all" onChange={(e) => handleSelectAll(e)} checked={selectedEmails.length > 0}></input>
        {selectedEmails.length > 0 ? 
        <section /*className={'mail-icons-read' 'mail-icons-unread'}*/>
          <span className='mark-as-unread'><MarkunreadIcon onClick={() => handleFieldChangeSelected("isRead", false)} sx={{cursor: 'pointer'}}/></span>
          <span className='mark-as-read'><MarkEmailReadIcon onClick={() => handleFieldChangeSelected("isRead", true)} sx={{cursor: 'pointer'}}/></span>
          {filterBy.folder === "Trash" && <span className='unarchive-icon'><UnarchiveIcon onClick={() => handleFieldChangeSelected("isTrash", false)} sx={{cursor: 'pointer'}}/></span>}
          <span className='delete-icon'><DeleteIcon onClick={() => handleFieldChangeSelected("isTrash", true)} sx={{cursor: 'pointer'}}/></span>
        </section> :
          <>
            <label htmlFor="read-filter">isRead</label>
            <select id="read-filter" onChange={(e) => handleFilterChange(e)} name="isRead">
              <option value={""}>All</option>
              <option value={"false"}>Unread</option>
              <option value={"true"}>Read</option>
            </select>
            <label htmlFor="order-filter">Order</label>
            <select id="order-filter" onChange={(e) => handleFilterChange(e)} name="order">
              <option value={""}>All</option>
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
            <label htmlFor="date"><input type='date' id="date" onChange={(e) => handleFilterChange(e)} name="date"/></label>
          </>
        }
      </div>
  )
}

DropdownFilter.propTypes = {
  filterBy: PropTypes.shape({
    folder: PropTypes.string,
    txt: PropTypes.string,
    isRead: PropTypes.string,
    date: PropTypes.string,
    order: PropTypes.string,
  }),
  onSetFilter: PropTypes.func
}
