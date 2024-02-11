<template>
  <div class="card mb-3 navbar-custom">
        <div class="card-body text-center">
        <a class="navbar-brand text-light text-center"><strong>Favorites</strong></a>
        </div>
        </div>
        <div class="card card-fluid custom-body">
          <div class="card-body">

          <div><div v-if="products.length == 0"><p class="text-center fs-3 text-light">--- No Product has been in your Favorites ---</p></div>
          <div v-else>
              <div class="row">
                    <div class="col-4" v-for="product in products" :key="product.id">
                      <div class="card custom-card ms-3 me-3">
                        <div class="card-body">
                         <div class="row">
                          <div class="col-md-7">
                            <div class="fs5"><strong>{{product.productname}}</strong></div>
                            <p class="text-muted">{{ product.productdesc }}</p>
                            <p class="text-muted text-sm">available Quantity({{ product.quantity }})</p>
                            <div>P{{ product.price }}</div>
                            <div class="form-group">
                              <button @click="openModal(product)" class="btn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg></button>
                              <button @click="removeFromFavorites(product.id)" class="btn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3l18 18" /><path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 0 3.05 .727 4 2a5 5 0 1 1 7.5 6.572" /></svg></button>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <img :src="`http://localhost:4000/api/images/${product.image}`" style="width: 120px; height: 120px;"/>
                            <update-status :status="product.status" />
                          </div>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          </div>
        </div>
            <addto-cart-modal :product="myProduct" @get-my-product-cart="getAllFavorites" :show-modal="showModal" @close-modal="closeModal"/>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
import { useAuthStore } from '@/store';
import addtoCartModal from '@/components/modal/addtoCartModal.vue';


    const authStore = useAuthStore(); 
  const products = ref([]);
  const getAllFavorites = async()=>{
  try{
        const response = await AuthenticationService.getAllFavorites();
        if(response){
            products.value = response.data.favorites
            authStore.setMyFavorites(products.value.length)
        }
    }catch(error){
        console.log(error);
    }
}
onMounted(()=>{
    getAllFavorites();
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
const myProduct = ref([])
const showModal =ref(false);
  const openModal = (product)=>{
      showModal.value = true
      getProduct(product)
  }
  const closeModal = ()=>{
    showModal.value = false
    myProduct.value = []
  }
  const getProduct = async(product)=>{
  try {
    const response = await AuthenticationService.getProduct({
      prod_id:product.product_id
    });
    if(response){
      myProduct.value = response.data.product
    }
  } catch (error) {
    console.log(error);
  }
}
const removeFromFavorites = async(id)=>{
    try {
        const response = await AuthenticationService.removeFromFavorites({
            fav_id:parseInt(id)
        });
        if(response){
            alert(response.data.msg);
            getAllFavorites();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
</script>

<style scoped>
.navbar-custom{
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 10px #080803f3;

}
.btn{
    background-color: #92890bf3;
    color: #f0f0f0;
    margin-right: 5px;
  }
  .custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;

}
.custom-card{
  box-shadow: 0 0 20px #cec108f3;
}
</style>