// TODO: UserHomePage only viewed by the USER
import UserNavbar from './UserNavbar.js'
import CardComponent from './CardComponent.js'
export default {
    template: `
    <div>
    <UserNavbar/>
    
    <div class='home'>

    <CardComponent v-for="product in all_products" :key='product.id' :title='product.name' :description="product.description" :quantity="product.quantity" :section="product.section" :amount="product.amount" />
    </div>
    </div>
    `,
    data () {
        return {
        all_products: []
        }
    },
    computed: {

    },
    async mounted () {
        const response = await fetch('/product',{
            headers:{
                "Authentication-Token": localStorage.getItem('auth-token')
            }
        })
        const data = await response.json()
        if(response.ok){
            this.all_products = data
            console.log(this.all_products);
        }
    },
    components: {UserNavbar,CardComponent}
    
}