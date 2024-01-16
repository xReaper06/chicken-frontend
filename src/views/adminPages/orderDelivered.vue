<template>
    <div>
        <div class="card custom-body">
        <div class="card-body">
            <div class="mb-3">
                <div class="fs-3 text-light">
                    <strong>Delivered Orders</strong>
                </div>
            </div>
            <table class="table table-responsive table-striped table-hover">
                <thead>
                    <tr>
                        <th class="text-light bg-dark">ORDER ID</th>
                        <th class="text-light bg-dark">Reciever's Name</th>
                        <th class="text-light bg-dark">Address</th>
                        <th class="text-light bg-dark">Contact Number</th>
                        <th class="text-light bg-dark">TotalPrice</th>
                        <th class="text-light bg-dark">Status</th>
                        <th class="text-light bg-dark">Action</th>
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
                        </td>
                    </tr>
                </tbody>
            </table>
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
        const response = await AuthenticationService.getAllItemsDelivered()
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

</script>

<style scoped>
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
</style>