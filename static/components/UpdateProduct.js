//! This page needs mending
// ?Route to update the products that are already in the database.Only accessed by the MANAGER
import ManagerNavbar from './ManagerNavbar.js'
export default {
    template: `
    <div>
    <ManagerNavbar/>
    <form>
    <div class="manager-home">
        <div class="manager-form">
            <h1>Update Products</h1>
            <div class="mb-3">
  <label for="formGroupExampleInput" class="form-label"><strong>Product Name</strong></label>
  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter Product Name" v-model="product_name"/>
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label"><strong>Product Description</strong></label>
  <input type="textarea" class="form-control" id="formGroupExampleInput2" placeholder="Enter Product Description" v-model="product_description" />
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label"><strong>Select Section</strong></label>
  <select v-model="product_section">
  <option v-for="(name,id) in section_categories">{{ name.name }}</option>
  </select>
</div>

    <button type="submit" @click.prevent="handelSubmit" class="btn btn-lg btn-primary">Update Products</button>
        </div>
    </div>
</form>

    </div>
    `,
    data () {
        return {
          product_name: null,
          product_description: null,
          section_categories: [],
          product_section: null
        }
      },

    mounted: async function () {
        const response = await fetch('/section',{
            headers:{
            'Authentication-Token' : localStorage.getItem('auth-token')
      }})
      const data = await response.json()
      if(response.ok){
        console.log(data);
        this.section_categories = data
      }else{
        console.log('Something is not write');
      }
      },
      methods: {
        handelSubmit: async function () {
          alert("Working")
        }
      },

    components: {ManagerNavbar}
}