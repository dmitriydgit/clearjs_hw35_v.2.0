export default class InfoModel { 
	constructor() {
		
	}       
	getUserData(){
		let userData = {
			email: "ddd@gmail.com",
			password : "12345678"
		}
		return userData;
		//return localStorage.getItem("userData");
	}
	

}