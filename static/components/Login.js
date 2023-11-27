// ? Login page for all users,managers and admin
export default {
    template: `
    <div>
      <div class="login-form text-center">
        <form action="/">
          <body class="text-center">
            <main class="form-signin">
            <form>
    <h1 class="h3 mb-3 fw-normal">Please Login</h1>
    <div class="form-floating">
      <!-- // eslint-disable-next-line vue/no-mutating-props -->
      <input type="email" class="form-control" v-model="email" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" v-model="password" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>
    <button class="w-100 btn btn-lg btn-warning" @click.prevent="handleSubmit" type="submit">Login</button>
  </form>
  <p>New Manager? <router-link to="/register-manager">Register Manager</router-link></p>
</main>
</body>
    </form>
    <div>{{ error }}</div>
</div>
    </div>
    `,
    data () {
        return {
            
            email: null, //? To store the email address
            password: null, //? To store the password
            error: null
        }
      },
      methods: {
        handleSubmit: async function () { //*This function handles the submit function for the button
          try {
            const res = await fetch('/user-login',{
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'email':this.email,
                    'password': this.password
                })
            })
            const data = await res.json()
            if (res.ok) { //* This means that the response status is between 200 to 300
                this.userRole = data.role
                localStorage.setItem('auth-token',data.token)
                localStorage.setItem('role',data.role)
                this.$router.push('/')
            }else{
              this.error = data.message
            }
          } catch (error) {
            alert(error)
          }
        }
      }
        }