
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import PropTypes from 'prop-types'
import { useEffectUpdate } from '../Custom Hooks/useEffectUpdate';

export function EmailFilter({filterBy, onSetFilter}) {

  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffectUpdate(() => {
      onSetFilter(filterByToEdit)
    },[filterByToEdit])

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

EmailFilter.propTypes = {
  filterBy: PropTypes.shape({
    folder: PropTypes.string,
    txt: PropTypes.string,
    isRead: PropTypes.string,
    date: PropTypes.string,
    order: PropTypes.string,
  }),
  onSetFilter: PropTypes.func
}
