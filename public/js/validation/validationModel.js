(function(){
		
	
	class ValidationModel {
			constructor(url) {
					this.getUrl = url;
			}
 
			getData() {
					return fetch(this.getUrl).then(responce => responce.json())
					.then(data => {
							console.log("Initial data is loaded");
							console.log(data);
							return data;
					})         
			}
			
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
	
	window.app = window.app || {};
	window.app.ValidationModel = ValidationModel;
	
}())
