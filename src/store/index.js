import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  id:'auth',
  state: () => ({
    accessToken: sessionStorage.getItem('accessToken') || '',
    refreshToken: sessionStorage.getItem('refreshToken') || '',
    user: sessionStorage.getItem('user') || '',
    totalCart:0,
    myOrders:0,
    myFavorites:0,
    myHistory:0,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async getUser() {
       this.user;
    },
    setTokens( accessToken, refreshToken ) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    },
    setTotalCart(totalCart){
      this.totalCart = totalCart
    },
    setMyOrders(myOrders){
      this.myOrders = myOrders
    },
    setMyFavorites(myFavorites){
      this.myFavorites = myFavorites
    },
    setMyHistory(myHistory){
      this.myHistory = myHistory
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
    },
    updateAccessToken(accessToken){
      this.accessToken = accessToken
      sessionStorage.setItem('accessToken',accessToken);
    },
    setUser(user) {
      this.user = user
      sessionStorage.setItem('user',JSON.stringify(user));
    },
    updateLocalUser(user){
      this.user = user
      sessionStorage.setItem('user',JSON.stringify(user));
    },
    async logOut(){
      this.clearTokens();
      this.user = ''
      sessionStorage.removeItem('user');
    },
    
  },
});