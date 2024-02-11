import Api from "./Api";

export default{
    login(credentials){
        return Api().post('/login',credentials)
    },
    userRegistration(credentials){
        return Api().post('/userRegistration',credentials)
    },
    riderRegistration(credentials){
        return Api().post('/riderRegistration',credentials)
    },
    logout(){
        return Api().post('/logout');
    },
    insertProduct(credentials){
        return Api().post('/insertProduct',credentials);
    },
    getAllProductInserted(){
        return Api().get('/getAllProductInserted')
    },
    getAllProduct(){
        return Api().get('/getAllProduct')
    },
    getUsersInfo(){
        return Api().get('/getUsersInfo')
    },
    getMyInfo(){
        return Api().get('/getMyInfo')
    },
    addToCart(credentials){
        return Api().post('/addToCart',credentials);
    },
    getProduct(credentials){
        return Api().post('/getProduct',credentials);
    },
    checkout(credentials){
        return Api().post('/checkout',credentials);
    },
    getMyProductCart(){
        return Api().get('/getMyProductCart')
    },
    editCart(credentials){
        return Api().post('/editCart',credentials);
    },
    removeFromCart(credentials){
        return Api().post('/removeFromCart',credentials);
    },
    trackMyorder(credentials){
        return Api().post('/trackMyorder',credentials);
    },
    addtoFavorites(credentials){
        return Api().post('/addtoFavorites',credentials);
    },
    getAllFavorites(){
        return Api().get('/getAllFavorites')
    },
    removeFromFavorites(credentials){
        return Api().post('/removeFromFavorites',credentials);
    },
    getAllItemsCheckedOut(){
        return Api().get('/getAllItemsCheckedOut')
    },
    itemProcess(credentials){
        return Api().post('/itemProcess',credentials);
    },
    getAllItemsAccepted(){
        return Api().get('/getAllItemsAccepted')
    },
    itemPrepare(credentials){
        return Api().post('/itemPrepare',credentials);
    },
    getAllItemsPrepare(){
        return Api().get('/getAllItemsPrepare')
    },
    itemShip(credentials){
        return Api().post('/itemShip',credentials);
    },
    UpdateProduct(credentials){
        return Api().post('/UpdateProduct',credentials);
    },
    UnavailableProduct(credentials){
        return Api().post('/UnavailableProduct',credentials);
    },
    AvailableProduct(credentials){
        return Api().post('/AvailableProduct',credentials);
    },
    getAllItemsShip(){
        return Api().get('/getAllItemsShip')
    },
    getRiders(){
        return Api().get('/getRiders')
    },
    deliverOrder(credentials){
        return Api().post('/deliverOrder',credentials);
    },
    getAllItemsDelivered(){
        return Api().get('/getAllItemsDelivered')
    },
    myOrderDelivered(){
        return Api().get('/myOrderDelivered')
    },
    getAllSummary(){
        return Api().get('/getAllSummary')
    },
    changePassword(credentials){
        return Api().post('/changePassword',credentials);
    },
    changeAddress(credentials){
        return Api().post('/changeAddress',credentials);
    },
    changeInfo(credentials){
        return Api().post('/changeInfo',credentials);
    },
    changeProfilePic(credentials){
        return Api().post('/changeProfilePic',credentials);
    },
    getAllInformation(){
        return Api().get('/getAllInformation')
    },
}