
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

export function EmailFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
        let { value, name: field/*, type*/ } = ev.target
        // value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
      ev.preventDefault()
      onSetFilter(filterByToEdit)
    }

  return (
    <form onSubmit={onSubmitFilter} className='txt-filter-form flex'>
      <label className='filter-wrapper flex align-center p10'>
        <SearchIcon />
        <input type="text" 
          placeholder="Search" 
          className='mail-filter-input' 
          name='txt' 
          onChange={handleChange}/>
      </label>
    </form>
  )
}
