// !This is the Admin-Navbar component used for navigation on the admin panel
export default {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #FA7070;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">GroStore-Admin</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/users">Approve Users</router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/create-section">Create Section</router-link>
        </li>
        <li class="nav-item">
        <router-link class="nav-link active" aria-current="page" to="/update-section">Update Section</router-link>
      </li>
      <li class="nav-item">
      <router-link class="nav-link active" aria-current="page" to="/approve-sections">Approve Sections</router-link>
    </li>

        </ul>
      </div>
    </div>
    <form class="d-flex">
          <button v-if='is_login' class="btn btn-outline-danger" type="submit" @click.prevent="handleSubmit">Logout</button>
        </form>
  </nav>
    `,
    data() {
      return {
        role: localStorage.getItem('role'),
        is_login: localStorage.getItem('auth-token')
      }
    },
    methods: {
      handleSubmit: function (){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('role')
        this.$router.push('/login')
      },
    }
  
}