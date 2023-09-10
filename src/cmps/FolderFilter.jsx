import { useState, useEffect } from "react"

export function FolderFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
}, [filterByToEdit])

  function handleFilterChange(e) {
    const { value, name: field } = e.target
    setFilterByToEdit((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="folder-filter-wrapper p5">
      <label htmlFor="read-filter">isRead</label>
      <select id="read-filter" onChange={(e) => handleFilterChange(e)} name="isRead">
        <option value={""}>All</option>
        <option value={"false"}>Unread</option>
        <option value={"true"}>Read</option>
      </select>
      <label htmlFor="date-filter">Date</label>
      <select id="date-filter" onChange={(e) => handleFilterChange(e)} name="date">
        <option value={""}>All</option>
        <option value={"asc"}>Ascending</option>
        <option value={"desc"}>Descending</option>
      </select>
    </div>
  )
}
