<template>
    <div>
        <div>
            <router-link class="btn btn-secondary" to="/admin/RiderRegistration">Add Rider</router-link>
        </div>
        <div class="card custom-body">
            <div class="card-body">
                <table class="table table-responsive">
                    <thead>
                        <tr>
                            <th class="text-light bg-dark">Rider's Name</th>
                            <th class="text-light bg-dark">Email</th>
                            <th class="text-light bg-dark">Address</th>
                            <th class="text-light bg-dark">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="rider in riders" :key="rider.id">
                            <td>{{ rider.fullname }}</td>
                            <td>{{ rider.email }}</td>
                            <td>{{ rider.address }} {{ rider.zipcode }}</td>
                            <td>{{ rider.created }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/service/AuthenticationService';
const riders = ref([]);
const getRiders = async()=>{
    try {
        const response = await AuthenticationService.getRiders()
        if(response){
            riders.value = response.data.rider
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(()=>{
    getRiders();
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