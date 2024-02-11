<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body text-center">
        <a class="navbar-brand text-light text-center"><strong>Order History</strong></a>
        </div>
        </div>
        <div class="card card-fluid custom-body">
            <div class="card-body">

                <div v-if="Orders.length == 0"><p class="text-center text-light fs-3">--- No Order has been Delivered ---</p></div>
                <div v-else>
                    <div class="card" v-for="order in Orders" :key="order.id">
                        <div class="card-body">
                            <div class="order-context">
                                <div>OrderID: {{ order.order_id }}</div>
                                <div>Address: {{ order.address }} {{ order.zipcode }}</div>
                                <div><order-status
                                    :status="order.status"
                                    />
                                    </div>
                                <div><button class="btn btn-primary" @click="openModal(JSON.parse(order.products))">View</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <view-order-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import AuthenticationService from '@/service/AuthenticationService.js'
import viewOrderModal from '@/components/modal/viewProductModal.vue'
import orderStatus from '@/components/products/orderStatus.vue';
import { useAuthStore } from '@/store';

const authStore = useAuthStore();
const Orders = ref([]);
const showModal = ref(false);
const products = ref([])
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}

const myOrderDelivered = async()=>{
    try{
        const response = await AuthenticationService.myOrderDelivered();
        if(response){
            Orders.value = response.data.orderTrack
            authStore.setMyHistory(Orders.value.length)
        }
    }catch(error){
        console.log(error);
    }
}
onMounted(()=>{
    myOrderDelivered();
    getMyInfo()
})
const getMyInfo = async()=>{
    try {
        const response = await AuthenticationService.getMyInfo()
        if(response){
            authStore.setUserInfo(response.data.myProfile) 
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.navbar-custom{
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 10px #080803f3;
}
.order-context{
    display:flex;
    flex:column;
    justify-content: space-between;
}
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;

}

</style>