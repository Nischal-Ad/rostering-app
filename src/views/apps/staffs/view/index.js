// ** React Imports
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import InvoiceLists from '../../invoiceStaff/list'


// ** Styles
import '@styles/react/apps/app-users.scss'
import { StaffsDetails } from '../../../../redux1/action/auth'


const UserView = props => {
  // ** Vars
    const dispatch = useDispatch()
 const { id } = useParams()
  // ** Get suer on mount
  useEffect(() => {
    dispatch(StaffsDetails({id}))
  }, [dispatch])

   const datas = useSelector(state => state.Staffs)
  const data = (datas?.staffs)
  const dataStaff = data
console.log(data)
  return data !== null ? (
    <div className='app-user-view'>
      <Row>
        <Col sm='no-gutters' >
        <UserInfoCard data = {data} />
        </Col>
        <Col sm='9' >
          <InvoiceLists dataStaff = {dataStaff}/>
          
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/staffs/list'>Staffs List</Link>
      </div>
    </Alert>
  )
}
export default UserView
