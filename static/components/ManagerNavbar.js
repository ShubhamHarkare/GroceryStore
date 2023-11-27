// !Navbar for the Manager which helps in navigation for the manager
export default {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GroStore-Manager</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/add-product">Add Products</router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/update-product">Update Product</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/create-section">Create Section</router-link>
      </li>

        </ul>
      </div>
    </div>
    <form class="d-flex">
          <button v-if='is_login' class="btn btn-primary" type="submit" @click.prevent="generateCSV">CSV</button>
        </form>
        <form class="d-flex">
        <button v-if='is_login' class="btn btn-primary" type="submit" @click.prevent="handleSubmit">Logout</button>
      </form>

        </nav>
    `,
    data() {
      return {
        role: localStorage.getItem('role'),
        is_login: localStorage.getItem('auth-token'),
        is_waiting: false
      }
    },
    methods: {
      handleSubmit: function (){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.$router.push('/login')
      },
      generateCSV : async function () {
        this.is_waiting = true
        const res = await fetch('/download-csv')
        const data = await res.json()
        if (res.ok){
          const taskID = data['task-id']
          const intv = setInterval(async()=>{
            const csv_res = await fetch(`/get-csv/${taskID}`)
            if(csv_res.ok){
              this.is_waiting = false
              clearInterval(intv)
              window.location.href = `/get-csv/${taskID}`
              alert("Download Complete!")

            }
          },1000)

        }
      }
    }
  
}