<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-custom">
    <router-link class="navbar-brand ms-5" to="/rider/Dashboard"><img src="@/assets/logoChicken.jpg" style="width: 50px; height: 50px;" alt=""></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end me-5" id="navbarNavDropdown">
        <div>
            <ul class="navbar-nav">
                 <li class="nav-item"><router-link to="/rider/Dashboard" class="nav-link" :class="{'active-link':isActive('/rider/Dashboard')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></router-link></li>
                <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="`http://localhost:4000/api/images/${myInfo.image}`" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
            {{ myInfo.fullname }}
            </a>
            <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" to="/rider/Settings">Settings</router-link></li>
            <li><a class="dropdown-item" href="#" @click="logout">Log out</a></li>
            </ul>
        </li>
        </ul>
        </div>
        </div>
        </nav>
        <main class="mt-3">
            <router-view/>
        </main>
    </div>
</template>

<script setup>
import AuthenticationService from '@/service/AuthenticationService';
import { useAuthStore } from '@/store';
import { ref,onMounted } from 'vue';
import router from '@/router'

const authStore = useAuthStore();
const myInfo = ref([])
const isActive = (route) => router.currentRoute.value.path === route;
const getMyInfo = async()=>{
    try {
        const response = await AuthenticationService.getMyInfo()
        if(response){
            myInfo.value = response.data.myProfile
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getMyInfo()
})
const logout = async ()=>{
try{  
    const response = await AuthenticationService.logout();
    if(!response){
      console.log('Cannot Logout');
    }
    authStore.logOut()
    router.push('/')
}catch(err){
    console.error('Error Logout')
}
}
</script>

<style scoped>
.active-link{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.3);
    border-radius: 5px;
    width: 100%;
}
.bg-custom{
    background: linear-gradient(to right, #f8f4f4f5, #fcececfa,#f7ededfa,#ebee5bea,#f1ef49ea,#f3e13bea);
    box-shadow: 0 0 15px #f9fc49ea;
}
</style>