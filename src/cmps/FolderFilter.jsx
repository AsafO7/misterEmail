import { useState, useEffect } from "react"

export function FolderFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
}, [filterByToEdit])

  function handleChange(e) {
    const { checked, name: field } = e.target
    setFilterByToEdit((prev) => ({ ...prev, [field]: !checked }))
  }

  return (
    <div className="folder-filter-wrapper">
      <input type="checkbox" id="unread" name="isRead" onChange={(e) => handleChange(e)}/>
      <label htmlFor="unread">Unread</label>
    </div>
  )
}
