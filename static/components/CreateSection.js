// ?Component used to create a new section in the database, used by the ADMIN
import AdminNavbar from './AdminNavbar.js'
import ManagerNavbar from './ManagerNavbar.js'
export default {
    template: `
    <div>
    <AdminNavbar v-if="role === 'admin'"/>
    <ManagerNavbar v-else-if="role === 'manager'"/>

    <form>
    <div class="manager-home">
        <div class="manager-form">
            <h1>Create Section</h1>
            <div class="mb-3">
  <label for="formGroupExampleInput" class="form-label"><strong>Section Name</strong></label>
  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Section Name" v-model="section_name"/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label"><strong>Section Description</strong></label>
  <input type="textarea" class="form-control" id="formGroupExampleInput2" placeholder="Enter Product Description" v-model="section_description" />
</div>

    <button type="submit" @click.prevent="handelSubmit" class="btn btn-lg btn-outline-danger">Add Section</button>
        </div>
    </div>
</form>

    </div>
    `,
    data() {
        return {
            section_name: null,
            section_description: null,
            role: localStorage.getItem('role'),
            active: localStorage.getItem('role') === 'admin' ? true : false,
            url: null
        }
    },
    methods: {
        handelSubmit: async function () {
            if (this.role === 'admin') {
                this.url = '/section'
            }else{
                this.url = '/create-section-manager'
            }
            const response = await fetch(this.url,{
                method: 'POST',
                headers: {
                    'Authentication-Token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": this.section_name,
                    "description": this.section_description,
                    'active': this.active
                })
            })
            const data = await response.json()
            if(response.ok){
                alert(data.message)
            }else{
                alert("ERROR")
            }
            this.section_name = null,
            this.section_description = null
        }
    },
    components: {AdminNavbar,ManagerNavbar} 
}