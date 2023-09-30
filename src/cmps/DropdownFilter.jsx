import { useState } from "react"
import PropTypes from 'prop-types'
import { useEffectUpdate } from '../Custom Hooks/useEffectUpdate';

export function DropdownFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffectUpdate(() => {
    onSetFilter(filterByToEdit)
  },[filterByToEdit])

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

DropdownFilter.propTypes = {
  filterBy: PropTypes.shape({
    folder: PropTypes.string,
    txt: PropTypes.string,
    isRead: PropTypes.bool,
    date: PropTypes.string,
    order: PropTypes.string,
  }),
  onSetFilter: PropTypes.func
}
