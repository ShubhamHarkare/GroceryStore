// ?Page to display all the users,managers to the admin. Also approve managers from here.
import AdminNavbar from './AdminNavbar.js'
export default {
    template: `
    <div>
        <AdminNavbar/>
        <div v-for="(user,index) in allUsers">{{ user.email }}
        <button class="btn btn-outline-primary" v-if='!user.active' @click.prevent='approve(user.id)'>Approve</button>
        </div>
    </div>
    `,
    data () {
        return {
            allUsers : null,
        }
    },
    methods: {
        approve: async function (managerID) {
            const res = await fetch(`activate/manager/${managerID}`,{
                headers:{
                    'Authentication-Token':localStorage.getItem('auth-token')
                }
            })
            const data =  await res.json()
            if (res.ok) {
                alert(data.message)
            }else{
                alert(data.message)
            }
        }
    },
    async mounted() {
        const res = await fetch('/users',{
            headers: {
                'Authentication-Token': localStorage.getItem('auth-token')
            }
        })
        const data = await res.json()
        if(res.ok){
            this.allUsers = data
        }
    },
    components: {AdminNavbar}
}