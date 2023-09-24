import { useState, useEffect } from "react"

export function DropdownFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
}, [filterByToEdit])

  function handleFilterChange(e) {
    const { value, name: field } = e.target
    setFilterByToEdit((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="dropdown-filter-wrapper p5">
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
    </div>
  )
}
