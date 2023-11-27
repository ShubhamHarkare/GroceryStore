// ?ADMIN-HOME -> Homepage for the admin, ONLY ACCESSED BY the admin
import AdminNavbar from './AdminNavbar.js'
export default {
    template: `
    <div>
    <AdminNavbar/>
    Welcome Admin
    </div>   
    `,
    components: {AdminNavbar}

}