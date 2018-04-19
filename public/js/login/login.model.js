export default	class LoginModel {
	constructor(url) {
		this.getUrl = url;
		
	}
	
	
	getData() {
			return fetch(this.getUrl).then(response => response.json())
			.then(data => {
					console.log("Initial data is loaded");
					console.log(data);
					return data;
			})         
	}
		
	setCheckboxStatus(checked){
		localStorage.setItem("remember", checked )
	}
	getCheckboxStatus(checked){
		return localStorage.getItem("remember")
	}

	checkSession() {
				let log = localStorage.getItem('login');
				let pass = localStorage.getItem('password');
				if(log && pass) {
					return true;
				} else {
					return false;
				}
			}

			logOut(){
				localStorage.removeItem('login');
				localStorage.removeItem('password');
			}

			logAndPassValidation (data) {
				let userData = data;
				let email = data.login;
				let password = data.password;
				let url = this.getUrl;
				let params = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userData)
				};
				
				/*
				var error1 = "1"
				var promise1 = new Promise(function(resolve, reject) {
					if(!error1){
						resolve('Success!');
					} else {
						reject (error1);
					}
				});

				promise1.then(function(value) {
					console.log(value);
					// expected output: "Success!"
				})
				.catch(function(value) {
					console.log(value)
				})

				*/


				let isFieldsChecked = this.checkFields(email , password);

				
				return new Promise(
					function(resolve, reject) { 
						if( isFieldsChecked == true )    {
							resolve (fetch(url , params))
						} else {    
							reject(isFieldsChecked)
						}        
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
    	checkUser(email, password) { 
				this.user1 = this.utils.getInfo();                                        
				if(email === this.user1.email && password === this.user1.password) {
						this.print("itsok");
						return true;
				} else {
						this.print("incorrect");
						this.utils.showHide1({ "show" : [this.DOMEls.alertMsg]});
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






			setUserInfo(obj){
				localStorage.setItem("userInfo" , JSON.stringify(obj))
			};

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
	