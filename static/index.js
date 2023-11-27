import router from './router.js'



router.beforeEach((to,form,next)=>{
    if(to.name !== 'Login' && !localStorage.getItem('auth-token') ? true : false) next({'name':'Login'})
    else next()
})




new Vue({
    el: '#app',
    template: `
    <div>
    <router-view/>

    </div>
    `,
    router,
    
    
})
