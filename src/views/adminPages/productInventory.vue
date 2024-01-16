<template>
    <div>
        
        <div class="inventory-header mb-2">
            <button class="btn btn-success" @click="openModal">Add Product</button>
        </div>
        <div class="card custom-body">
            <div class="card-body">

                <input type="text" class="form-control mb-2 w-25" v-model="seachProduct" placeholder="Search Product..."/>
                <table class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th class="text-light bg-dark">Image</th>
                                <th class="text-light bg-dark">Name</th>
                                <th class="text-light bg-dark">Quantity</th>
                                <th class="text-light bg-dark">Price</th>
                                <th class="text-light bg-dark">Status</th>
                                <th class="text-light bg-dark">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="prod in filterProduct" :key="prod.id">
                                <td>
                      <img :src="`http://localhost:4000/api/images/${prod.image}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border: solid 0.5px #000; box-shadow: 0 0 2px #000;" >
                                </td>
                                <td>{{ prod.productname }}</td>
                                <td>{{ prod.quantity }}</td>
                                <td>P{{ prod.price }}</td>
                                <td><update-status
                                    :status="prod.status"
                                    /></td>
                                <td><button @click="openAddModal(prod)">Edit</button>
                                    <div v-if="prod.status == 2">
                                <button @click="AvailableStock(prod)">Available</button>
                                    </div>
                                    <div v-else>
                                        <button @click="unavailableStock(prod)">UnAvailable</button>
                                    </div>
                            </td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
        <add-stocks-modal  @get-all-product-inserted="getAllProductInserted" @close-add-modal="closeAddModal" :show-add-modal="showAddModal" :product="product"/>
        <add-product @get-all-product-inserted="getAllProductInserted" @close-modal="closeModal" :show-modal="showModal"/>
</template>

<script setup>
import {ref,onMounted,computed} from 'vue';
import addProduct from '@/components/modal/addProduct.vue';
import addStocksModal from '@/components/modal/addStocksModal.vue';
import AuthenticationService from '@/service/AuthenticationService.js';
import updateStatus from '@/components/updateStatus.vue'

const showModal = ref(false);
const openModal = ()=>{
    showModal.value = true;
}
const closeModal = ()=>{
    showModal.value = false
    getAllProductInserted()
}
const product = ref([]);
const showAddModal = ref(false);
const openAddModal = (prod)=>{
    showAddModal.value = true;
    product.value = prod
}
const closeAddModal = ()=>{
    showAddModal.value = false
    getAllProductInserted()
}
const allItems = ref([]);
const seachProduct = ref('');

const getAllProductInserted = async()=>{
    try {
        const response = await AuthenticationService.getAllProductInserted();
        if(response){
            allItems.value = response.data.insertedProd
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllProductInserted();
})
const filterProduct = computed(()=>{
    if(allItems.value.length > 0){
        return allItems.value.filter(data=>{
            return data.productname.toLowerCase().includes(seachProduct.value.toLowerCase());
        });
    }else{
        return [];
    }
});
const unavailableStock = async(prod)=>{
    try {
        const response = await AuthenticationService.UnavailableProduct({
            prod_id:prod.id
        });
        if(response){
            alert(response.data.msg);
            getAllProductInserted();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const AvailableStock = async(prod)=>{
    try {
        const response = await AuthenticationService.AvailableProduct({
            prod_id:prod.id
        });
        if(response){
            alert(response.data.msg);
            getAllProductInserted();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}



</script>

<style scoped>
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
</style>