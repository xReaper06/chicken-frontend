import { createRouter, createWebHistory } from 'vue-router'
import mainNav from '../components/navigations/mainNav.vue';
import landingPage from '../views/landingPage.vue'
import registrationPage from '../views/registrationPage.vue';
import loginPage from '../views/loginPage.vue'
import adminNav from '../components/adminNav.vue'
import adminDashboard from '../views/adminPages/adminDashboard.vue'
import productInventory from '../views/adminPages/productInventory.vue'
import orderDelivering from '../views/adminPages/orderDelivering.vue'
import orderDelivered from '../views/adminPages/orderDelivered.vue'
import orderPending from '../views/adminPages/orderPending.vue'
import orderCart from '../views/userPages/orderCart.vue'
import trackOrder from '../views/userPages/trackOrder.vue'
import productFavorites from '../views/userPages/productFavorites.vue'
import orderAccepted from '../views/adminPages/orderAccepted.vue'
import orderPrepare from '../views/adminPages/orderPrepare.vue'
import adminRider from '../views/adminPages/adminRider.vue'
import riderRegistration from '../views/adminPages/riderRegistration.vue'
import riderNav from '../components/navigations/riderNav.vue'
import riderDashboard from '../views/riderPages/riderDashboard.vue'
import orderHistory from '../views/userPages/orderHistory.vue'
import userSettings from '../views/userPages/userSettings.vue'
import riderSettings from '../views/riderPages/riderSettings.vue'
import adminSettings from '../views/adminPages/adminSettings.vue'





const routes = [
  {
    path: '/',
    name: 'mainNav',
    component: mainNav,
    children:[
      {
        path: '',
        name:'landingPage',
        component:landingPage
      },
      {
        path: 'Registration',
        name:'registrationPage',
        component:registrationPage
      },
      {
        path: 'Login',
        name:'loginPage',
        component:loginPage
      },
      {
        path: 'Cart',
        name:'orderCart',
        component:orderCart
      },
      {
        path: 'TrackingOrder',
        name:'trackOrder',
        component:trackOrder
      },
      {
        path: 'Favorites',
        name:'productFavorites',
        component:productFavorites
      },
      {
        path: 'History',
        name:'orderHistory',
        component:orderHistory
      },
      {
        path:'Settings',
        name:'userSettings',
        component:userSettings
      }
    ]
  },
  {
    path:'/admin/',
    name:'adminNav',
    component:adminNav,
    children:[
      {
        path: 'Dashboard',
        name:'adminDashboard',
        component:adminDashboard
      },
      {
        path: 'Product',
        name:'productInventory',
        component:productInventory
      },
      {
        path: 'Pending',
        name:'orderPending',
        component:orderPending
      },
      {
        path: 'Accepted',
        name:'orderAccepted',
        component:orderAccepted
      },
      {
        path: 'Prepare',
        name:'orderPrepare',
        component:orderPrepare
      },
      {
        path: 'Delivering',
        name:'orderDelivering',
        component:orderDelivering
      },
      {
        path: 'Delivered',
        name:'orderDelivered',
        component:orderDelivered
      },
      {
        path: 'Rider',
        name:'adminRider',
        component:adminRider
      },
      {
        path: 'RiderRegistration',
        name:'riderRegistration',
        component:riderRegistration
      },
      {
        path:'Settings',
        name:'adminSettings',
        component:adminSettings
      }
    ]
  },
  {
    path:'/rider/',
    name:'riderNav',
    component:riderNav,
    children:[
      {
        path:'Dashboard',
        name:'riderDashboard',
        component:riderDashboard
      },
      {
        path:'Settings',
        name:'riderSettings',
        component:riderSettings
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
