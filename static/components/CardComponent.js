//! We wil be using redis for storing data of the cart
// *This component is used to display all the products in the database to the USER.
export default {
    template: `
    <div>
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">{{description}}</p>
    <p class="card-text">{{section}}</p>

    <h6>$ {{amount}}.00</h6>
    <input type="number" v-model="quantity">
    <button class="btn btn-outline-success" @click.prevent="handleSubmit">Add to Cart</button>
  </div>
</div>
    </div>
    `,
    props: {
      title: String,
      description: String,
      section:String,
      amount: Number,
    },
    data () {
      return {
        cart: [],
        quantity: null
      }
    },
    methods: {
      handleSubmit: function() {
        const existingCart = localStorage.getItem('cart')
        if (existingCart !== null) {
          this.cart = JSON.parse(existingCart) 
          this.cart.push({'name':this.title,'quantity':this.quantity,'amount': this.quantity*this.amount})
          localStorage.setItem('cart',JSON.stringify(this.cart))
        }
        this.cart.push({'name':this.title,'quantity':this.quantity,'amount': this.quantity*this.amount})
        localStorage.setItem('cart',JSON.stringify(this.cart))
        alert("Added to cart")
        
        
      }
    }
}