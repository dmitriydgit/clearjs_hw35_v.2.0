export default	class LoginModel {
	constructor(urlLogin , urlUser) {
		this.urlUser = urlUser;
		this.urlLogin = urlLogin;
	}
	
	
	getData() {
		return fetch(this.urlUser).then(response => response.json())
		.then(data => {
				console.log("Initial data is loaded");
				console.log(data);
				return data;
		})         
	}
		
	setCheckboxStatus(checked){
		localStorage.setItem("remember", checked );
	}
	getCheckboxStatus(){
		return localStorage.getItem("remember");
	}

	checkSession() {
		let credentials = localStorage.getItem('credentials');
		if(credentials) {
			return true;
		} else {
			return false;
		}
	}
	
	setUserInfo(obj){
		localStorage.setItem("credentials" , JSON.stringify(obj))
	};

	logOut(){
		localStorage.removeItem('credentials');
	}


	logAndPassValidation (credentials) {
		let url = this.urlLogin;
		let params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		};
			
		return fetch(url , params)
		.then(response => response.json())
		.then(data => {
				if (data.status) {
					this.setUserInfo(credentials)
						//localStorage.setItem('credentials', JSON.stringify(credentials));
				} 
				return data;
		});


	};

	checkFields (email, pass){
		if(!email){return '2'}
		if(!pass){return '3'}
		if(!this.checkEmail(email)){return '4'}
		if(!this.checkPassword(pass)){return '5'}
		else {return true}
	};
	
	checkEmail (email) {                                                 
		let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return reg.test(email);
	};
	checkPassword(password){
		if(password.length >= 8){
				return true;
		} else { 
			return false;
		}
	};
	

	saveData(item) {         
		console.log("Saving item... " + item.name);
		let iphone = {
			"name": "Saved iPhone",
			"price": 12458,
			"popular": true,
			"date": 1467440203
		}
		return new Promise(
			function(resolve, reject) {            
				resolve(iphone);          
			}
		);
	}
	
	updateData(counter) {
		console.log("Updating item... " + counter);
		let samsung = {
			"name": "Saved Samsung",
			"price": 12458,
			"popular": true,
			"date": 1467440203
		}
		return Promise.resolve(samsung);
	}







	setLocalStorGalleryInitStatus(status){
		localStorage.isGalleryInited = status;
	}
	changeLocalStorLoggedInStatus(status){
		localStorage.isUserLoggedIn = status;
	}
	getLocalStorageGalleryStatus(){
		return localStorage.isGalleryInited;
	}
	getIsUserLoggedIn(){
		return localStorage.isUserLoggedIn;
	}

	checkUser(userData){
		let url = 'http://localhost:3000/login';
		let params = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData)
		};

		return fetch(url , params).then(response => response.json())
		
	}

			
			
			
		}
	