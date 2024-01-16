<template>
    <div>
        <div class="row">
            <div class="col-md-3">
                <div class="card sidebar">
                    <div class="card-body text-center">
                        <div class="logo">
                            <img src="@/assets/logoChicken.jpg" style="width: 75px; height: 75px;" alt="">
                            <div class="text-white mt-1"><strong>Admin Panel</strong></div>
                        </div>
                    <ul class="nav flex-column mt-2 gap-4">
                        <li class="nav-item">
                            <router-link class="custom-link" to="/admin/Dashboard" :class="{'active-link':isActive('/admin/Dashboard')}">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="custom-link" to="/admin/Product" :class="{'active-link':isActive('/admin/Product')}">Product</router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="custom-link" @click="openProductCollapse"><strong>Orders menu</strong></a>
                            <div class="collapse" :class="{show:showProductCollase}">
                                <router-link class="custom-link text-small" to="/admin/Pending" :class="{'active-link':isActive('/admin/Pending')}">Pending</router-link>
                                <router-link class="custom-link text-small" to="/admin/Accepted" :class="{'active-link':isActive('/admin/Accepted')}">Accepted</router-link>
                                <router-link class="custom-link text-small" to="/admin/Prepare" :class="{'active-link':isActive('/admin/Prepare')}">Prepare</router-link>
                                <router-link class="custom-link text-small" to="/admin/Delivering" :class="{'active-link':isActive('/admin/Delivering')}">To Ship</router-link>
                                <router-link class="custom-link text-small" to="/admin/Delivered" :class="{'active-link':isActive('/admin/Delivered')}">delivered</router-link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <router-link class="custom-link" to="/admin/Rider" :class="{'active-link':isActive('/admin/Rider')}">Rider</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/admin/Settings" class="custom-link">Settings</router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="custom-link" @click="logout">Logout</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-9 mt-3">
                <main>
                    <router-view/>
                </main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import { useAuthStore } from '@/store';
import router from '@/router'

const isActive = (route) => router.currentRoute.value.path === route;

const showProductCollase =ref(false);
const authStore = useAuthStore();

const openProductCollapse = ()=>{
  showProductCollase.value = !showProductCollase.value;
}
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
.sidebar{
    height: 100%;
    background-color: #f5e504f3;
    text-shadow: 0 0 5px #000;
}
.custom-link:hover{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
.custom-link:active{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
.custom-link{
    display: block; 
    color: #ffffff;
    text-decoration: none;
    padding: 10px;
    width: 100%;
    padding: auto;
    cursor: pointer;
}
.active-link{
    color: #ffffff;
    background-color: rgba(3, 2, 2,0.5);
    border-radius: 5px;
    width: 100%;
}
.text-small{
  font-size: 15px;
}
</style>