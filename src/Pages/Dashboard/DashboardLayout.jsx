import { Outlet } from 'react-router-dom'
import Sidebars from './Sidebars'

const DashboardLayout = () => {
  return (
    <div className='flex flex-col lg:flex-row md:flex-row'>
        <Sidebars/>
      <Outlet/>
    </div>
  )
}

export default DashboardLayout
