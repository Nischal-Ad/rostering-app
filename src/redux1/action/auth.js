import {LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST} from '../constant/authConstant'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
try {
dispatch({ type: LOGIN_REQUEST })

const config = { headers: { 'Content-Type': 'application/json', 'x-api-key':'23124134' } }
const { data } = await axios.post(
`http://rostering.delshagroup.com/admin/login`,
{ email, password },
config
)

dispatch({
type: LOGIN_SUCCESS,
payload: data.admin
})
} catch (error) {
dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
}
}