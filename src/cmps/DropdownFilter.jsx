import { useState } from "react"
import PropTypes from 'prop-types'
import { useEffectUpdate } from '../Custom Hooks/useEffectUpdate';

/*
1) Add a checkbox here that selects all mails when checked
2) When a mail is selected, change the entire JSX rendered to an icon section
3) Implement the functionality for when the icons are clicked
*/

export function DropdownFilter({filterBy, onSetFilter, emails, selectedEmailsLength, setSelectedEmails}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
  const [selected, setSelected] = useState(false)

  useEffectUpdate(() => {
    setSelected(selectedEmailsLength > 0)
  },[selectedEmailsLength])

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

  return (
      <div className="dropdown-filter-wrapper p5">
        <input type='checkbox' name="select-all" onChange={(e) => handleSelectAll(e)} checked={selected}></input>
        {selectedEmailsLength > 0 ? <span>There should be icons here</span> :
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
