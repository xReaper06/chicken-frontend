<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body text-center">
        <a class="navbar-brand text-light text-center"><strong>My Cart</strong></a>
        </div>
        </div>
        <div class="card card-fluid custom-body">
            <div class="card-body">

                <div v-if="ProductCart.length == 0"><p class="text-center fs-3 text-light">--- No Products In Your Cart ---</p></div>
                <div v-else>
                    <div class="form-group d-flex justify-content-end mb-2 me-3">
                        <div class="flex-column">
                            <button class="btn btn-secondary" @click="openModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checklist" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg></button>
                        </div>
                    </div>
                    <div class="card">
                    <div class="card-body">
                    <table class="table table-responsive table-striped">
                        <thead>
                            <tr>
                                <th>select</th>
                                <th>image Prod</th>
                                <th>name</th>
                                <th>quantity</th>
                                <th>subtle Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="mt-2">
                            <tr v-for="product in ProductCart" :key="product.id">
                    <td><input type="checkbox" class="form-checkbox" @input="SelectIDs(product.id,product.product_id,product.image,product.productname,product.quantity,subtlePrice(product))" :value="product.product_id"/></td>
                    <td><img :src="`http://localhost:4000/api/images/${product.image}`" style="height: 75px; width: 75px;" alt=""></td>
                    <td>{{ product.productname }}</td>
                    <td><div v-if="!editQuantity[product.id]">
                        {{ product.quantity }}
                    </div>
                    <div v-else>
                        <input type="number" name="quantity" id="quantity" @input="fixQuantity(product)" v-model="quantity" class="form-control w-50" placeholder="Enter quantity...">
                        <button class="btn" @click="updateQuantity(product)">Save</button>
                    </div>
                        </td>
                    <td>P{{ subtlePrice(product)}}</td>
                    <td>
                        <button type="button" class="btn" @click="editingQuantity(product)">edit</button>
                        <button type="button" class="btn" @click="removeFromCart(product)">remove</button>
                    </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <checkout-modal @get-my-product-cart="getMyProductCart" @close-modal="closeModal" :selected-cart-i-d="selectedCartID" :show-modal="showModal" :selected-i-d="selectedID" :selected-items="selectedItems" />
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import checkoutModal from '@/components/modal/checkoutModal.vue';
import { useAuthStore } from '@/store';
const ProductCart = ref([]);
const editQuantity = ref({});
const showModal = ref(false);
const selectedItems = ref([])
const selectedCartID = ref([])
const selectedID = ref([])
const quantity = ref(1)
const authStore = useAuthStore();

const openModal = ()=>{
    showModal.value = true;
    
}
const closeModal = ()=>{
    showModal.value = false
}

const getMyProductCart = async()=>{
    try {
        const response = await AuthenticationService.getMyProductCart()
        if(response){
            ProductCart.value = response.data.myProductCart
            authStore.setTotalCart(ProductCart.value.length);
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{ 
    getMyProductCart();
});


const subtlePrice = (product)=>{
  return product.price * product.quantity
}

const editingQuantity = (product)=>{
      if (editQuantity.value[product.id] === undefined) {
        editQuantity.value[product.id] = false;
      }
      editQuantity.value[product.id] = !editQuantity.value[product.id];
}
const updateQuantity = async(product)=>{
    try {
        const response = await AuthenticationService.editCart({
        quantity:quantity.value,
        cart_id:product.id
        });
        if(response){
            alert(response.data.msg);
            getMyProductCart();
            quantity.value = 1
            editQuantity.value[product.id] = false
        }
    } catch (error) {
        console.log(error)
    }
}
const removeFromCart = async(product)=>{
    try {
        const response = await AuthenticationService.removeFromCart({
            cart_id:product.id
        })
        if(response){
            alert(response.data.msg);
            getMyProductCart();
        }
    } catch (error) {
        console.log(error)
    }
}
const fixQuantity = (product)=>{
    if(quantity.value < 1){
        quantity.value = 1
    }else if(quantity.value > product.prod_quantity){
        quantity.value = product.prod_quantity
    }
}
const SelectIDs = (id,data,image, name, quant, price) => {
  const index = selectedID.value.indexOf(data);
  const thisindex = selectedCartID.value.indexOf(id);

  if (index !== -1 || thisindex !== -1) {
    // If the product is already selected, remove it from the arrays
    selectedID.value.splice(index, 1);
    selectedCartID.value.splice(thisindex, 1);
    selectedItems.value = selectedItems.value.filter(item => item.id !== data);
  } else {
    // If the product is not selected, add it to the arrays
    selectedCartID.value.push(id)
    selectedID.value.push(data);
    selectedItems.value.push({
      id: data,
      image:image,
      productname: name,
      quantity: quant,
      price: price
    });
  }
};
</script>

<style scoped>
.navbar-custom{
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 10px #080803f3;
}
.btn{
    background-color: #92890bf3;
    color: #f0e8e8;
}
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
</style>