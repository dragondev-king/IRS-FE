import { useCallback } from "react";
import Select from "react-select"

const Filter = ({ options, onFilterChange, selectedValue }) => {
  const handleChange = useCallback((option) => {
    onFilterChange(option)
  }, [onFilterChange])
  return (
    <Select
      value={selectedValue}
      onChange={handleChange}
      options={options}
    />
  )
}

export default Filter
