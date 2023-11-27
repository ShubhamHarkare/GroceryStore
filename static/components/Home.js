
// TODO: Home route used to display different homepages according to the user and it's role
import AdminHome from './AdminHome.js'
import ManagerHome from './ManagerHome.js'
import UserHome from './UserHome.js'
export default {
    template: `
    <div>
    <UserHome v-if="userRole == 'user'"/> 
    <ManagerHome v-if="userRole == 'manager'"/> 
    <AdminHome v-if="userRole == 'admin'"/> 
    </div>
    `,
    data () {
        return {
            userRole: localStorage.getItem('role')
        }
    },
    components: {AdminHome, ManagerHome, UserHome}
}