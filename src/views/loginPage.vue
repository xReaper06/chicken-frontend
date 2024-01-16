<template>
    <div>
        <div class="card custom-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <img src="@/assets/logoChicken.jpg" style="width: 100%; width: 100%;" alt="">
                    </div>
                    <div class="col-md-6">
                        <div class="card customLogin card-fluid p-4">
                            <div class="card-body">
                               <div class="text-center text-warning fs-5"><strong>Welcome to CJ Fried Chicken</strong></div>
                               <div class="mt-2">
                                <div class="form-floating mb-3">
                                <input type="email" class="form-control" v-model="formdata.email" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Email address</label>
                                </div>
                                <div class="form-floating">
                                <input type="password" v-model="formdata.password" class="form-control" id="floatingPassword" placeholder="Password">
                                <label for="floatingPassword">Password</label>
                                </div>
                                <div class="mt-2"><button class="btn btn-warning w-100 text-white" @click="login"><strong>Login</strong></button></div>
                                    <router-link to="/Registration" class="custom-link mt-3">Sign up</router-link>
                                    <a href="#" class="custom-link mt-2">forgot Password</a>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import {useAuthStore} from '@/store';
import {useRouter} from 'vue-router'
const authStore = useAuthStore();
const router = useRouter();

const formdata = ref({
    email:'',
    password:'',
})
const login = async()=>{
    if(formdata.value.email == '' || formdata.value.password == ''){
        alert('Please fill in Empty Fields')
    }
    try{
        const response = await AuthenticationService.login({
            email:formdata.value.email,
            password:formdata.value.password,
        })
        if(response){
            alert(response.data.msg);
            authStore.setTokens(response.data.accessToken,response.data.refreshToken);
            authStore.setUser(response.data.user);
            switch (response.data.user.role) {
                case 'admin':
                        router.push('/admin/Dashboard');
                    break;
                    case 'rider':
                        router.push('/rider/Dashboard');
                    break;
                    case 'user':
                        window.location.replace('/')
                    break;
                default:
                    break;
            }
        }
    }catch(error){
        console.log(error);
        alert(error.response.data.msg);
    }
}

</script>

<style scoped>
.custom-card{
    height: 600px;
}
.customLogin{
    margin-top: 100px;
    width: 350px;
    box-shadow: 0 10px 15px #0000009d;
    height: auto;
}
.custom-link{
    display: block;
    text-decoration: none;
    font-weight: bold;
    color: #f5e504f3;
    text-align: center;
}
.custom-link:hover{
    color: blue;
}
@media (max-width: 767px) {
  .customLogin {
    width: 285px;
  }
}
</style>