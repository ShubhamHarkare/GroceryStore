// ?This route displays the form to add products to the database. ONLY ACCESSED BY MANAGER
import ManagerNavbar from './ManagerNavbar.js'
export default {
    template: `
    <div>
    <ManagerNavbar/>
    <form>
    <div class="manager-home">
        <div class="manager-form">
            <h1>Add products  to GroStore</h1>
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

<div class="mb-2">
<label for="formGroupExampleInput2" class="form-label"><i>Quantity</i></label>
  <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Enter the quantity" v-model="product_quantity"/>
  <label for="formGroupExampleInput2" class="form-label"><i>Amount</i></label>
  <input type="number" class="form-control" id="formGroupExampleInput2" placeholder="Enter the Amount" v-model="product_amount"/>
</div>
    <button type="submit" @click.prevent="handelSubmit" class="btn btn-lg btn-outline-primary">Add Products</button>
        </div>
    </div>
</form>
</div>
    `,
    data () {
        return {
          product_name: null,
          product_description: null,
          product_quantity: null,
          product_amount: null,
          section_categories: [],
          product_section: null
        }
      },
      methods: {
        handelSubmit:  async function () {
            // alert(this.product_section)
            const response = await fetch('/product',{
                method: 'POST',
                headers: {
                    'Authentication-Token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": this.product_name,
                    "description": this.product_description,
                    "section": this.product_section,
                    "quantity":this.product_quantity,
                    "amount":this.product_amount   
                })
            })
            const data = await response.json()
            if(response.ok){
                alert(data.message)
            }
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
      components: {ManagerNavbar}
    

}