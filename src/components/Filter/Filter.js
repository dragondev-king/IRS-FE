import { useCallback, useState } from "react";
import Select from "react-select"

const Filter = ({ options, onFilterChange }) => {
  const [selectedItem, setSelectedItem] = useState()
  const handleChange = useCallback((option) => {
    setSelectedItem(option)
    onFilterChange(option.value)
  }, [onFilterChange])
  return (
    <Select
      value={selectedItem}
      onChange={handleChange}
      options={options}
    />
  )
}

export default Filter
