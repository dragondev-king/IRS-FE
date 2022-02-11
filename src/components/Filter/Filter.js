import { useCallback, useState } from "react";
import Select from "react-select"

const Filter = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState(null)
  const handleChange = useCallback((value) => {
    setSelectedValue(value)
  }, [])
  return (
    <Select
      defaultValue='All'
      value={selectedValue}
      onChange={handleChange}
      options={options}
    />
  )
}

export default Filter
