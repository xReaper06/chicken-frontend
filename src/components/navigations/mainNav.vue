<template>
    <div>
        <div class="bg-dark text-white p-3">
            <div class="row">
                <div class="col-md-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" /></svg> Sr.San Roque New Bridge Pusok Lapu Lapu City
                </div>
                <div class="col-md-8">
                    <div class="custom-Intro">
                        Welcome to CFC-Crispy Fried Chicken Order Your Favorite Crispy Fried Chicken Now
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg bg-custom">
    <router-link class="navbar-brand ms-5" to="/"><img src="@/assets/logoChicken.jpg" alt="" style="width: 50px; height: 50px;"></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end me-5" id="navbarNavDropdown">
        <div v-if="user == null">
            <ul class="navbar-nav">
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle me-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
          </a>
          <ul class="dropdown-menu me-5">
            <li><router-link class="dropdown-item me-5" to="/Login">Login</router-link></li>
            <li><router-link class="dropdown-item me-5" to="/Registration">Register</router-link></li>
          </ul>
        </li>
        </ul>
        </div>
        <div v-else>
            <ul class="navbar-nav">
        <li class="nav-item"><router-link to="/" class="nav-link" :class="{'active-link':isActive('/')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg></router-link></li>
        <li class="nav-item"><router-link to="/Favorites" class="nav-link" :class="{'active-link':isActive('/Favorites')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" /></svg><span class="badge rounded-pill text-bg-danger">{{ favorites }}</span></router-link></li>
        <li class="nav-item"><router-link to="/TrackingOrder" class="nav-link" :class="{'active-link':isActive('/TrackingOrder')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pinned-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" stroke-width="0" fill="currentColor" /></svg><span class="badge rounded-pill text-bg-danger">{{ trackingOrder }}</span></router-link></li>
        <li class="nav-item"><router-link to="/History" class="nav-link" :class="{'active-link':isActive('/History')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg><span class="badge rounded-pill text-bg-danger">{{ history }}</span></router-link></li>
        <li class="nav-item"><router-link to="/Cart" class="nav-link" :class="{'active-link':isActive('/Cart')}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg><span class="badge rounded-pill text-bg-danger">{{ totalCart }}</span></router-link></li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="`http://localhost:4000/api/images/${myInfo.image}`" alt="" style="width: 40px; height: 40px; border-radius: 50%;">
            {{ myInfo.fullname }}
            </a>
            <ul class="dropdown-menu">
            <li><router-link class="dropdown-item nav-link" to="/Settings"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg> Settings</router-link></li>
            <li><a class="dropdown-item nav-link" href="#" @click="logout"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> Log out</a></li>
            </ul>
        </li>
        </ul>
        </div>
    </div>
</nav>
<main class="mb-2">
    <router-view />
</main>
<footer >
    <div class="card card-fluid bg-footer">
        <div class="card-body w-100">
            <div class="row">
                <div class="col-md-6">
                    <div>
                    <img src="@/assets/logoChicken.jpg" style="width: 10%; height: 10%;" alt="">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" stroke-width="0" fill="currentColor" /></svg> Sr.San Roque New Bridge Pusok Lapu Lapu City
                </div>
                <div>
                </div>
            </div>
                <div class="col-md-6">
                    <div class="mt-2">
                        © CFC-Crispy Fried Chicken All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
    </div>
</template>

<script setup>
import AuthenticationService from '@/service/AuthenticationService';
import { useAuthStore } from '@/store';
import { watchEffect,ref } from 'vue';
import router from '@/router'

const isActive = (route) => router.currentRoute.value.path === route;
const authStore = useAuthStore();
let myInfo = ref([])
const user = sessionStorage.getItem('user');
let totalCart = ref(0)
let trackingOrder = ref(0)
let favorites = ref(0)
let history = ref(0)
watchEffect(()=>{
    totalCart.value = authStore.totalCart
    trackingOrder.value = authStore.myOrders
    favorites.value = authStore.myFavorites
    history.value = authStore.myHistory
    myInfo.value = authStore.userInfo
})
console.log(authStore.userInfo)

const logout = async ()=>{
try{  
    const response = await AuthenticationService.logout();
    if(!response){
      console.log('Cannot Logout');
    }
    authStore.logOut()
    window.location.replace('/')
}catch(err){
    console.error('Error Logout')
}
}

</script>

<style scoped>
.newblock{
    display: inline-block;
}
.active-link{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.3);
    border-radius: 5px;
    width: 100%;
}
.custom-Intro{
    transform: translateY(200%);
    animation: intro 3.3s ease-in-out infinite;
}
@keyframes intro{
    0%{
        transform: translateY(200%);
    }
    100%{
        transform: translateY(-200%);
    }
}
.nav-link:hover{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.3);
    border-radius: 5px;
    width: 100%;
}
.bg-custom{
    background: linear-gradient(to right, #f8f4f4f5, #fcececfa,#f7ededfa,#ebee5bea,#f1ef49ea,#f3e13bea);
    box-shadow: 0 0 15px #f9fc49ea;
}
.bg-footer{
    background: linear-gradient(to left, #f8f4f4f5, #fcececfa,#f7ededfa,#ebee5bea,#f1ef49ea,#f3e13bea);
    box-shadow: 0 0 20px #f9fc49ea;
}
</style>