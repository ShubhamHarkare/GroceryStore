//! TO BE WORKED ON
//* This component is used to display the cart or the user's buyed products
import UserNavbar from './UserNavbar.js'
export default {
    template: `
    <div>
    <UserNavbar/>
    <table class='cart-table'>
    <th>Product</th>
    <th>Quantity</th>
    <th>Amount</th>
    <tr v-for="(product,id) in cartItems">
    <td>{{product.name}}</td>
    <td>{{product.quantity}}</td>
    <td>$ {{product.amount}}</td>
    </tr>
    </table>
    <button @click.prevent="handleSubmit" class="btn btn-outline-success">Procced and Checkout</button>
    </div>
    `,
    data () {
        return {
            cartItems: [],
        }
    },
    methods: {
        handleSubmit: async function() {
        const response = await fetch('/update-product-cart',{
            method: "POST",
            headers: {
                'Authentication-Token': localStorage.getItem('auth-token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.cartItems)
        })  
        if (response.ok) {
            alert("thank you")
        }
        localStorage.clear('cart')
        this.$router.push('/')
        
    }
    },
    mounted : function () {
        this.cartItems = JSON.parse(localStorage.cart)
    },

    components: {UserNavbar}
}
