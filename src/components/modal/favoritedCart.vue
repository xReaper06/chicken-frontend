<template>
    <div>
        <div class="modal mb-5 pb-5" v-if="props.showModal">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Add to Cart</h1>
                  <span class="close" @click="closeModal"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></span>
              </div>
              <div class="modal-body">
                <div>
                    <div class="row" v-for="prod in product" :key="prod.id">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <img :src="`http://localhost:4000/api/images/${prod.image}`" style="height: 100%; width: 100%;" alt="">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <strong>
                    {{ prod.productname }}
                </strong>
                <p class="text-muted">{{ prod.productdesc }}</p>
                <strong>P {{ prod.price }}</strong>
  
                <div class="form-control w-75">
                    <label for="quantity" class="form-label">Quantity: </label>
                    <input type="number" class="form-number w-25" v-model="quantity" @input="fixQuantity">
                </div>
                <div>
                    <span class="badge rounded-pill text-bg-success">Free Sizes</span>
                </div>
                <div>
                    Total Price: P{{ totalPrice.toFixed(2) }}
                </div>
                <button class="btn btn-secondary" @click="addToCart">Add to cart</button>
            </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </div>
  </div>
    </div>
</template>

<script setup>
import { ref,defineProps, defineEmits,watch,computed} from "vue";
import AuthenticationService from '@/service/AuthenticationService.js';

  
  const props = defineProps({
    showModal: Boolean,
    product:Array,
  });
  const product = ref([]);
  watch(async()=>{
    product.value = props.product
    console.log(props.product)
  })
const quantity = ref(1);
  const totalPrice = computed(()=>{
    return product.value[0].price * quantity.value
})
  
  const fixQuantity = ()=>{
    if(quantity.value < 1){
        quantity.value = 1
    }else if(quantity.value > product.value[0].quantity){
        quantity.value = product.value[0].quantity
    }
}

const addToCart = async()=>{
    try {
        const response = await AuthenticationService.addToCart({
            prod_id:parseInt(product.value[0].product_id),
            quantity:quantity.value,
            totalPrice:totalPrice.value
        })
        if(response){
            alert(response.data.msg);
            getMyProductCart();
            closeModal();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}

  
  const emits = defineEmits(["closeModal","getMyProductCart"]);
  const getMyProductCart = ()=>{
    emits("getMyProductCart")
  }
  
  const closeModal = () => {
    emits("closeModal");
  };

 
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  height: 450px;
  width: 500px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unread {
  background-color: #f7f7f7;
  border-left: 4px solid #2196f3;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
  cursor: pointer;
}
</style>