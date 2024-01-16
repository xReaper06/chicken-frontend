<template>
    <div>
        <swiper class="custom-height"
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    :autoplay="{
        delay:2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="prod in products" :key="prod.id" class="backGround">
      <img :src="`http://localhost:4000/api/images/${prod.image}`" class="img-fluid" style="width: 400px; height:400px; display: block; margin-left: auto; margin-top: 40px; margin-right: auto;" alt="">
      <a href="#menu" class="orderNow"><strong>Order Now</strong></a>
  </swiper-slide>
  </swiper>
  
      <div class="container-fluid" id="menu">
        <div class="text-center fs-3 border-menu"><strong>Our Menu</strong></div>
        <div class="card main-card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-4" v-for="product in products" :key="product.id">
                <div class="card custom-card card-fluid mt-2">
                  <div class="card-body">
                   <div class="row">
                    <div class="col-md-7">
                      <div class="fs5"><strong>{{product.productname}}</strong></div>
                      <p class="text-muted text-sm">available Quantity({{ product.quantity }})</p>
                      <div>P{{ product.price }}</div>
                    </div>
                    <div class="col-md-4">
                      <img :src="`http://localhost:4000/api/images/${product.image}`" class="img-fluid mb-1" style="width: 120px; height: 120px;"/>
                      <update-status :status="product.status" />
                    </div>
                    <div class="col-md-12 mt-2">
                      <div class="form-group">
                        <button @click="openModal(product)" class="btn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg></button>
                        <button @click="addToFavorites(product.id)" class="btn"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" /><path d="M16 19h6" /><path d="M19 16v6" /></svg></button>
                      </div>
                    </div>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <addto-cart-modal :product="myProduct" @get-my-product-cart="getMyProductCart" :show-modal="showModal" @close-modal="closeModal"/>
    </div>
  </template>
  
  <script setup>
  import { ref,onMounted } from 'vue';
  import { Navigation, Pagination, Scrollbar,Autoplay, A11y } from 'swiper/modules';
  import AuthenticationService from '@/service/AuthenticationService.js';
  import updateStatus from '@/components/updateStatus.vue';
  import addtoCartModal from '@/components/modal/addtoCartModal.vue';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore();

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/autoplay'
  
  const user = sessionStorage.getItem('user');
  const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
  const modules = ref([Navigation,Pagination,Scrollbar,Autoplay, A11y]);

  const products = ref([]);
  const getAllProducts = async()=>{
    try{
      const response = await AuthenticationService.getAllProduct();
      if(response){
        products.value = response.data.allProduct
      }
    }catch(error){
      console.log(error);
    }
  }
  const Orders = ref([])
  const trackMyorder = async()=>{
    try{
        const response = await AuthenticationService.trackMyorder();
        if(response){
            Orders.value = response.data.orderTrack
            authStore.setMyOrders(Orders.value.length)
        }
    }catch(error){
        console.log(error);
    }
}
const Favorites = ref([])
const getAllFavorites = async()=>{
  try{
        const response = await AuthenticationService.getAllFavorites();
        if(response){
            Favorites.value = response.data.favorites
            authStore.setMyFavorites(Favorites.value.length)
        }
    }catch(error){
        console.log(error);
    }
}
const addToFavorites = async(prodID)=>{
  try {
    if(user == null){
        alert('You need to log in')
      }else{
        const response = await AuthenticationService.addtoFavorites({
          prod_id:parseInt(prodID)
        })
        if(response){
          alert(response.data.msg);
          getAllFavorites()
        }
      }
  } catch (error) {
    console.log(error);
    alert(error.response.data.msg)
  }
}
const history =ref([])
const myOrderDelivered = async()=>{
    try{
        const response = await AuthenticationService.myOrderDelivered();
        if(response){
            history.value = response.data.orderTrack
            authStore.setMyHistory(history.value.length)
        }
    }catch(error){
        console.log(error);
    }
}
const user_role = JSON.parse(user);
  onMounted(()=>{
    getAllProducts();
    getMyProductCart();
    trackMyorder();
    getAllFavorites();
    myOrderDelivered();
    if(user != null){
      switch (user_role.role) {
                    case 'admin':
                        router.push('/admin/Dashboard');
                    break;
                    case 'rider':
                        router.push('/rider/Dashboard');
                    break;
                    case 'user':
                    router.push('/');

                    break;
      
        default:
          break;
    }
    }
  })

  const myProduct = ref([]);
  const showModal =ref(false);
  const openModal = (product)=>{
    if(user == null){
      alert('You need to log in')
    }else{
      showModal.value = true
      getProduct(product)
    }
  }
  const closeModal = ()=>{
    showModal.value = false
    myProduct.value = []
  }
const getProduct = async(product)=>{
  try {
    const response = await AuthenticationService.getProduct({
      prod_id:product.id
    });
    if(response){
      myProduct.value = response.data.product
    }
  } catch (error) {
    console.log(error);
  }
}
const carts = ref([])
const getMyProductCart = async()=>{
try {
    const response = await AuthenticationService.getMyProductCart()
    if(response){
        carts.value = response.data.myProductCart
        authStore.setTotalCart(carts.value.length);
    }
} catch (error) {
    console.log(error);
}
}
  </script>
  
  <style scoped>
  .border-menu {
    margin-top: 20px;
    margin-bottom: 30px;
    border-bottom: solid 10px #f5be0b;
  }
  .custom-height{
    height: 500px;
  }
  .orderNow{
display: flex;
justify-content: center;
transform: translateY(-225px);
text-decoration: none;
padding: 25px;
background-color: rgba(00, 00, 00, 0.5);;
color: #f6fa0d;
  }
  .btn{
    background-color: #cec108f3;
    color: #f0f0f0;
    margin-right: 5px;
  }
  .custom-card{
    box-shadow: 0 0 10px #cec108f3;
  }
  .backGround{
    background-color: #0e0c0c;
  }
  .main-card{
    background-color: #0e0c0c;

  }
  </style>
  