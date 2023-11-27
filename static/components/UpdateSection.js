
// ?Updating the sections present in the database. Only accessed by the ADMIN
import AdminNavbar from './AdminNavbar.js'
export default {
    template: `
    <div>
    <AdminNavbar/>
    <form>
    <div class="manager-home">
        <div class="manager-form">
            <h1>Update Section</h1>
            <div class="mb-3">
    <div class="mb-3">
    <label for="formGroupExampleInput" class="form-label"><strong>Section Name</strong></label>
    <select v-model='section_name'>
    <option v-for="(name,id) in all_sections">{{ name.name }}</option>
    </select>
    </div>                  
  <label for="formGroupExampleInput" class="form-label"><strong>Change section Name</strong></label>
  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Section Name" v-model="changed_section_name" required/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label"><strong>Change section Description</strong></label>
  <input type="textarea" class="form-control" id="formGroupExampleInput2" placeholder="Enter Product Description" v-model="section_description" required/>
</div>

    <button type="submit" @click.prevent="handelSubmit" class="btn btn-lg btn-outline-danger">Update Section</button>
        </div>
    </div>
</form>
    
    </div>
    `,
    data() {
        return {
            section_name: null,
            changed_section_name:null,
            section_description: null,
            all_sections: null
        }
    },
    methods: {
        handelSubmit: async function () {
            const response = await fetch('/update-section',{
                method:'POST',
                headers:{
                    'Authentication-Token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    'name':this.section_name,
                    'changed_name':this.changed_section_name,
                    'description':this.section_description
                })
            })
            const data = await response.json()
            if (response.ok){
                alert(data.message)
            }else{
                alert("error")
            }
        }
    },
    async mounted() {
        const response = await fetch('/section',{
            headers:{
                'Authentication-Token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        if (response.ok){
            this.all_sections = data
            
        }else{
            console.log('error');
        }
    },
    components: {AdminNavbar}
}