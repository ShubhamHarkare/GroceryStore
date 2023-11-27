import AdminNavbar from './AdminNavbar.js'
export default {
    template:`
    <div>
    <AdminNavbar/>
    Approve Sections
    <div v-for="(section,index) in allSections">{{ section.name }}, {{section.description}}
    <button class='btn btn-outline-warning' v-if="!section.active" @click="approve(section.id)">Approve</button>
    </div>
    </div>
    `,
    data () {
        return {
            allSections: null,
        }
    },
    methods: {
        approve: async function(sectionID) {
            const resposne = await fetch(`/activate/section/${sectionID}`,{
                headers:{
                    'Authentication-Token': localStorage.getItem('auth-token')
                }
            })
            const data = await resposne.json()
            if (resposne.ok){
                alert(data.message)
            }else{
                alert(data.message)
            }
        }
    },
    async mounted() {
        const response = await fetch(`/section`,{
            headers: {
                'Authentication-Token': localStorage.getItem('auth-token')
            }
        })
        const data = await response.json()
        if (response.ok) {
            this.allSections = data
        }
    },
    components: {AdminNavbar}
}