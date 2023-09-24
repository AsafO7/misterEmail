
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';

export function EmailFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {
      let { value, name: field } = ev.target
      setFilterByToEdit({ ...filterBy, [field]: value })
    }

  return (
    <form className='txt-filter-form flex'>
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
