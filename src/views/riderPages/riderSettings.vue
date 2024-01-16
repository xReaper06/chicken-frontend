<template>
    <div>
        <div class="card mb-3 navbar-custom">
        <div class="card-body text-center">
        <a class="navbar-brand text-light text-center"><strong>Settings</strong></a>
        </div>
        </div>
        <div class="card card-fluid custom-body">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-column">
                                    <a href="#" class="custom-form" @click="openPersonalInfo" :class="{'active':personInfo}">Personal Information</a>
                                    <a href="#" class="custom-form" @click="openChangePass" :class="{'active':personPass}">Change Pasword</a>
                                    <a href="#" class="custom-form" @click="openPersonalAdd" :class="{'active':personAddress}">Change Address</a>
                                    <a href="#" class="custom-form" @click="openPersonalProfile" :class="{'active':personProfile}">Change Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="card card-fluid">
                            <div class="card-body">
                                <div v-if="personInfo">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="firstname" placeholder="firstname" v-model="formdata.firstname">
                                        <label for="firstname">First name</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="lastname" placeholder="lastname" v-model="formdata.lastname">
                                        <label for="lastname">Last name</label>                                       
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="middlename" placeholder="middlename" v-model="formdata.middlename"> 
                                        <label for="middlename">Middle name</label>                                     
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="tel" class="form-control" id="phone" placeholder="phone" @keyup="validatePhoneNumber" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" v-model="formdata.phone">
                                        <label for="phone">Phone Number</label>
                                    </div>
                                        <p v-if="!isPhoneNumberValid">Invalid phone number</p>
                                    <div class="mt-3"><button class="btn" @click="changeInfo">Save</button></div>
                                </div>
                
                                <div v-if="personPass">
                                    <div class="form-floating mb-3">
                                        <input type="password" name="password" id="password" class="form-control" placeholder="newPass" v-model="formdata.newPass" @keyup="isStrongPassword">
                                        <label for="password">New Password</label>
                                    </div>
                                    <div class="text-error" v-if="passmsgVisible">
                                        {{ passmsg }}
                                    </div>
                                    <div class="mt-3"><button class="btn" @click="changePass">Save</button></div>
                                </div>
                
                                <div v-if="personAddress">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" placeholder="Sitio/Street" v-model="formdata.sitio">
                                        <label for="sitio">Sitio/Street</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" placeholder="baranggay" v-model="formdata.baranggay">
                                        <label for="baranggay">Baranggay</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                    <input type="text" class="form-control" placeholder="city" v-model="formdata.city">
                                        <label for="city">City</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                    <input type="text" class="form-control" placeholder="province" v-model="formdata.province">
                                        <label for="province">Province</label>
                                    </div>
                                    <div class="form-floating mb-3">
                                    <input type="text" class="form-control" placeholder="zipcode" v-model="formdata.zipcode">
                                        <label for="zipcode">ZipCode</label>
                                    </div>
                                    <div class="mt-3"><button class="btn" @click="changeAddress">Save</button></div>
                                </div>
                                <div v-if="personProfile">
                                    <div>
                                        <label for="">Upload New Pic: </label>
                                    </div>
                                    <input type="file" name="image" class="form-control" id="image" @change="handleimageChange">
                                    <div v-if="showFile">
                                        <img :src="fileView.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px;">
                                    </div>
                                    <div class="mt-3"><button class="btn" @click="changeProfile">Save</button></div>
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
import {ref,onMounted,watchEffect,watch} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
const personAddress = ref(false)
const personInfo = ref(true)
const personPass = ref(false)
const personProfile = ref(false);
const isPhoneNumberValid = ref(true);

const info = ref([]);
const address = ref([]);
const fileView = ref({ preview: "" });
const showFile = ref(false);

const openPersonalInfo = ()=>{
    personInfo.value = true;
    personAddress.value = false;
    personPass.value = false
    personProfile.value = false
}
const openChangePass = ()=>{
    personPass.value = true
    personInfo.value = false;
    personAddress.value = false;
    personProfile.value = false
}
const openPersonalAdd = ()=>{
    personAddress.value = true
    personPass.value = false
    personInfo.value = false;
    personProfile.value = false
}
const openPersonalProfile= ()=>{
    personProfile.value = true;
    personPass.value = false
    personInfo.value = false;
    personAddress.value = false;
}
const formdata = ref({
    newPass:'',
    firstname:'',
    lastname:'',
    middlename:'',
    phone:'',
    sitio:'',
    baranggay:'',
    city:'',
    province:'',
    zipcode:'',
    file:null
})
const passmsg = ref(null)
const passmsgVisible = ref(false);

const isStrongPassword = () => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(formdata.value.newPass);
  const hasLowercase = /[a-z]/.test(formdata.value.newPass);
  const hasNumber = /\d/.test(formdata.value.newPass);

  // Check if the newPass meets the criteria
  if (
    formdata.value.newPass.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    passmsgVisible.value = false;
    passmsg.value = "newPass is Strong";
  } else if(formdata.value.newPass == ''){
    passmsgVisible.value = false;
  } else {
    passmsgVisible.value = true;
    passmsg.value = "newPass is Weak";
  }
};

const handleimageChange = (event)=>{
    const img = event.target.files;
    if (img.length > 0) {
      formdata.value.file = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        fileView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFile.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
}
const getAllInformation = async()=>{
    try {
        const response = await AuthenticationService.getAllInformation();
        if(response){
            info.value = response.data.info,
            address.value = response.data.address
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getAllInformation();
})
watchEffect(()=>{
    formdata.value.firstname = info.value.fname
    formdata.value.lastname = info.value.lname
    formdata.value.middlename = info.value.mname
    formdata.value.phone = info.value.phone
    formdata.value.sitio = address.value.sitio
    formdata.value.baranggay = address.value.baranggay
    formdata.value.city = address.value.city
    formdata.value.province = address.value.province
    formdata.value.zipcode = address.value.zipcode
})
watch(formdata.value.phone, (newPhoneNumber) => {
      isPhoneNumberValid.value = validatePhoneNumber(newPhoneNumber);
    });
    
    function validatePhoneNumber(phoneNumber) {
      const phonePattern = /^[0-9]{4}-[0-9]{3}-[0-9]{4}$/;
      return phonePattern.test(phoneNumber);
    }
const changeInfo = async ()=>{
    try {
        const response = await AuthenticationService.changeInfo({
            fname:formdata.value.firstname,
            lname:formdata.value.lastname,
            mname:formdata.value.middlename,
            phone:formdata.value.phone
        })
        if(response){
            alert(response.data.msg);
            getAllInformation();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const changePass = async()=>{
    try {
        const response = await AuthenticationService.changePassword({
            newPassword:formdata.value.newPass
        });
        if(response){
            alert(response.data.msg)
            formdata.value.newPass = ''
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const changeAddress = async()=>{
    try {
        const response = await AuthenticationService.changeAddress({
            sitio:formdata.value.sitio,
            baranggay:formdata.value.baranggay,
            city:formdata.value.city,
            province:formdata.value.province,
            zipcode:formdata.value.zipcode
        })
        if(response){
            alert(response.data.msg);
            getAllInformation();
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
const changeProfile = async()=>{
    try {
        let data = new FormData();
        data.append('image',formdata.value.file);
        const response = await AuthenticationService.changeProfilePic(data)
        if(response){
            alert(response.data.msg);
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}
</script>

<style scoped>
.custom-form{
    padding: auto;
    border: solid 1px #0a070721;
    text-decoration: none;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    padding-left: 10px;
    padding-top: 5px;
    padding-right: 10px;
}
.custom-form:hover{
    color: #fff;
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 5px #080803f3;
}
.active{
    color: #fff;
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 5px #080803f3;
}
.btn{
    background-color: #cec108f3;
    color: #f0f0f0;
    margin-right: 5px;
}
.custom-body{
    height: 570px;
    box-shadow: 0 0 20px #080803f3;
    background-color: #080803f3;
    overflow-y: scroll;
}
.navbar-custom{
    background-color: #f5e504f3;
    box-shadow: 0 3px 10px #080803f3;
    text-shadow: 0 0 10px #080803f3;
}
</style>