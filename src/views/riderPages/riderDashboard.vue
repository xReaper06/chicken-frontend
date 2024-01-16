<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body text-center">
        <a class="navbar-brand text-light text-center"><strong>Home</strong></a>
        </div>
        </div>
        <div class="card card-fluid custom-body">
        <div class="card-body">
            <div class="mb-3">
                <div class="fs-3 text-light">
                    <strong>Shipping Orders</strong>
                </div>
            </div>
            <div class="card card-fluid card-custom">
                <div class="card-body">
                    <table class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>Reciever's Name</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>TotalPrice</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in pendings" :key="order.id">
                                <td>{{ order.order_id }}</td>
                                <td>{{ order.fullname }}</td>
                                <td>{{ order.address }} {{ order.zipcode }}</td>
                                <td>#{{ order.phone }}</td>
                                <td>P{{ order.totalprice }}</td>
                                <td><order-status
                                :status="order.status"
                                /></td>
                                <td><button class="btn btn-primary" @click="openModal(JSON.parse(order.products))">View Order</button>
                                <button class="btn btn-success" @click="deliverOrder(order.order_id)">Delivered</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        <view-product-modal @close-modal="closeModal" :products="products" :show-modal="showModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
import orderStatus from '@/components/products/orderStatus.vue';
import viewProductModal from '@/components/modal/viewProductModal.vue';

const pendings = ref([])

const products = ref([])
const showModal = ref(false)
const openModal = (data)=>{
    showModal.value = true;
    products.value = data;
}
const closeModal = ()=>{
    showModal.value = false
}
const getAllItemsCheckedOut = async()=>{
    try {
        const response = await AuthenticationService.getAllItemsShip()
        if(response){
            pendings.value = response.data.allItemsPrepare
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllItemsCheckedOut();
})
const deliverOrder = async(data)=>{
    try {
        const response = await AuthenticationService.deliverOrder({
            order_id:data
        })
        if(response){
            alert(response.data.msg)
            getAllItemsCheckedOut();
        }
    } catch (error) {
        console.log(error)
    }
}

</script>

<style scoped>
.navbar-custom{
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 10px #080803f3;
}
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
.card-custom{
    max-height: 500px;
    overflow-y: scroll;
}
</style>