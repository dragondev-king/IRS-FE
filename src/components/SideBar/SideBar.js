import { Link } from 'react-router-dom'

const SideBar = ({items}) => {
  return (
    <ul className="list-group mt-5">
      {items.map((item, idx) => (
        <Link key={idx} to={`/${item}`} className="list-group-item list-group-item-action list-group-item-secondary">
          {item}
      </Link>
      ))}
    </ul>
  )
}

export default SideBar
