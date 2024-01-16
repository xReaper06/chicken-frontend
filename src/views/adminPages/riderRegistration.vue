<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
        
                    </div>
                    <div class="col-md-4">
                        <div class="card height">
                            <div class="card-body">
                                <div class="first-input mt-3" v-if="first_input">
                                <div class="text-center fs-5 mt-3 mb-4">
                                    <strong>Rider Inputs:</strong>
                                </div>
                                <div class="form-floating mb-3">
                                <input type="email" class="form-control" v-model="formdata.email" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput">Email address</label>
                                </div>

                                <div class="form-floating mb-2">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="formdata.password" @keyup="isStrongPassword">
                                    <label for="floatingPassword" class="form-label">Password:</label>
                                    <div class="text-error" v-if="passmsgVisible">
                                    {{ passmsg }}
                                    </div>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="password" id="cpassword" name="cpassword" v-model="formdata.cPassword" class="form-control" placeholder="Confirm Your Password">
                                    <label for="cpassword" class="form-label">confirm password:</label>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <button class="btn" @click="openSecondInput">Next-></button>
                                </div>
                            </div>
                            <div class="second-input" v-if="second_input">
                                <div class="text-center fs-5 mt-3 mb-4">
                                    <strong>Personal Info:</strong>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="fname" name="fname" v-model="formdata.firstname" class="form-control" placeholder="Enter Your First Name">
                                    <label for="fname" class="form-label">First Name:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="lname" name="lname" v-model="formdata.lastname" class="form-control" placeholder="Enter Your Last Name">
                                    <label for="lname" class="form-label">Last Name:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="mname" name="mname" v-model="formdata.middlename" class="form-control" placeholder="Enter Your Middle Name">
                                    <label for="mname" class="form-label">Middle Name:</label>
                                </div>
                               
                                <div class="form-floating mb-2">
                                    <input type="tel" id="phone" name="phone" v-model="formdata.phone" class="form-control" placeholder="Pattern: 0000-000-0000" @input="validatePhoneNumber" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" required><br><br>
                                    <label for="phone" class="form-label">Phone:</label>
                                    <p v-if="!isPhoneNumberValid">Invalid phone number</p>
                                </div>
                                    <div class="d-flex justify-content-start">
                                        <button class="btn" @click="backFirstInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="openThirdInput">Next-></button>
                                    </div>
                            </div>
                            <div class="third-input" v-if="third_input">
                                <div class="text-center fs-5 mt-3 mb-4">
                                    <strong>Personal Address:</strong>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="sitio" name="sitio" v-model="formdata.sitio" class="form-control" placeholder="Enter Your Sitio/Street">
                                    <label for="sitio" class="form-label">Sitio/Street:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="baranggay" name="baranggay" v-model="formdata.baranggay" class="form-control" placeholder="Enter Your Baranggay">
                                    <label for="baranggay" class="form-label">Baranggay:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="city" name="city" class="form-control" v-model="formdata.city" placeholder="Enter Your City">
                                    <label for="city" class="form-label">City:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="province" name="province" v-model="formdata.province" class="form-control" placeholder="Enter Your Province">
                                    <label for="province" class="form-label">Province:</label>
                                </div>
                                <div class="form-floating mb-2">
                                    <input type="text" id="zipcode" name="zipcode" v-model="formdata.zipcode" class="form-control" placeholder="Enter Your Zipcode">
                                    <label for="zipcode" class="form-label">Zipcode:</label>
                                </div>
                                    <div class="d-flex justify-content-start">
                                        <button class="btn" @click="backSecondInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="openLastInput">Next-></button>
                                    </div>
                            </div>
                            <div class="last-input" v-if="last_input">
                                <div class="text-center fs-5 mt-3 mb-4">
                                    <strong>Profile Image:</strong>
                                </div>
                                <div class="form-floating mb-2">
                                    <label for="profile" class="form-label">Profile</label>
                                    <input type="file" name="image" id="image" class="form-control" @change="handleimageChange">
                                    <div v-if="showFile">
                                      <img :src="fileView.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px;">
                                  </div>
                                </div>
                                <div class="form-check mb-3">
                                <input class="form-check-input" v-model="terms" type="checkbox" value="agree" id="invalidCheck" required>
                                <label class="form-check-label" for="invalidCheck">
                                    Agree to terms and conditions
                                </label>
                                <div class="invalid-feedback">
                                    You must agree before submitting.
                                </div>
                                </div>
                                <div class="d-flex justify-content-start">
                                        <button class="btn" @click="backThirdInput">Back</button>
                                    </div>
                                    <span></span>
                                    <div class="d-flex justify-content-end">
                                        <button class="btn" @click="riderRegistration">Submit Registration</button>
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
import {ref,watch} from 'vue';
import AuthenticationService from '@/service/AuthenticationService';
import router from '@/router';

let first_input = ref(true);
let second_input = ref(false);
let third_input = ref(false);
let last_input = ref(false);
const isPhoneNumberValid = ref(true);

const terms = ref('');
const fileView = ref({ preview: "" });
const showFile = ref(false);


const formdata = ref({
    password:'',
    cPassword:'',
    firstname:'',
    lastname:'',
    middlename:'',
    email:'',
    phone:'',
    sitio:'',
    baranggay:'',
    city:'',
    province:'',
    zipcode:'',
    file:null
});
watch(formdata.value.phone, (newPhoneNumber) => {
      isPhoneNumberValid.value = validatePhoneNumber(newPhoneNumber);
});

    function validatePhoneNumber(phoneNumber) {
      const phonePattern = /^[0-9]{4}-[0-9]{3}-[0-9]{4}$/;
      return phonePattern.test(phoneNumber);
    }

    const passmsg = ref(null)
const passmsgVisible = ref(false);
const isStrongPassword = () => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(formdata.value.password);
  const hasLowercase = /[a-z]/.test(formdata.value.password);
  const hasNumber = /\d/.test(formdata.value.password);

  // Check if the password meets the criteria
  if (
    formdata.value.password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    passmsgVisible.value = false;
    passmsg.value = "Password is Strong";
  } else if(formdata.value.password == ''){
    passmsgVisible.value = false;
  } else {
    passmsgVisible.value = true;
    passmsg.value = "Password is Weak";
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


const openSecondInput = ()=>{
    if(formdata.value.email == '' || formdata.value.password == '' || formdata.value.cPassword == ''){
        alert('Please Fill in Empty Fields')
    }else{
        first_input.value = false;
        second_input.value = true;
    }
}
const openThirdInput = ()=>{
    if(formdata.value.firstname == '' || formdata.value.lastname == '' || formdata.value.middlename == ''  || formdata.value.phone == '' ){
        alert('Please Fill in Empty Fields')
    }else{
        second_input.value = false;
        third_input.value = true;
    }
}
const openLastInput = ()=>{
    if(formdata.value.sitio == '' ||formdata.value.baranggay == '' ||formdata.value.city == '' ||formdata.value.province == '' ||formdata.value.zipcode == '' ){
        alert('Please Fill in Empty Fields')
    }else{
        third_input.value = false;
        last_input.value = true;
    }
}
const backFirstInput = ()=>{
    second_input.value = false;
    first_input.value = true;
}
const backSecondInput = ()=>{
    third_input.value = false;
    second_input.value = true;
}
const backThirdInput = ()=>{
    last_input.value = false;
    third_input.value = true;
}

const riderRegistration = async()=>{
    try {
        if(formdata.value.password != formdata.value.cPassword){
            alert('Password is not thesame!!');
            console.log(formdata.value.password != formdata.value.cPassword)
            console.log(formdata.value.password,formdata.value.cPassword)
        }else{
            if(formdata.value.password == '' || formdata.value.cPassword == '' ||
            formdata.value.firstname == '' || formdata.value.lastname == '' || formdata.value.email == '' || formdata.value.phone == '' ||
            formdata.value.sitio == '' || formdata.value.baranggay == '' || formdata.value.city == '' || formdata.value.province == '' ||
            formdata.value.zipcode == '' || terms.value == ''){
                alert('Please Fill in Empty Fields')
            }else{
                let data = new FormData();
                    data.append('password',formdata.value.password);
                    data.append('fname',formdata.value.firstname);
                    data.append('lname',formdata.value.lastname);
                    data.append('mname',formdata.value.middlename);
                    data.append('email',formdata.value.email);
                    data.append('phone',formdata.value.phone);
                    data.append('sitio',formdata.value.sitio);
                    data.append('baranggay',formdata.value.baranggay);
                    data.append('city',formdata.value.city);
                    data.append('province',formdata.value.province);
                    data.append('zipcode',formdata.value.zipcode);
                    data.append('image',formdata.value.file);
                const response = await AuthenticationService.riderRegistration(data);
                if(response){
                    formdata.value.password = '';
                    formdata.value.cPassword = '';
                    formdata.value.firstname = '';
                    formdata.value.lastname = '';
                    formdata.value.middlename = '';
                    formdata.value.email = '';
                    formdata.value.phone = '';
                    formdata.value.sitio = '';
                    formdata.value.baranggay = '';
                    formdata.value.city = '';
                    formdata.value.province = '';
                    formdata.value.zipcode = '';
                    alert(response.data.msg);
                    router.push('/admin/Rider')
                }
            }
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.msg);
    }
}

</script>

<style scoped>
.height{
    height: 600px;
}
.custom-link{
    text-decoration: none;
}

</style>