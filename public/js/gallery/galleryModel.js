(function(){
		
	
	class GalleryModel {
			constructor(url) {
					this.getUrl = url;
			}	
 
			getDataFromGist() {
				return fetch(this.getUrl).then(responce => responce.json())
				.then(data => {
						console.log("Initial data is loaded");
						console.log(data);
						return data;
				})         
		}
		getData() {
			let url = "http://localhost:3000/cars";
			 return fetch(url).then(responce => responce.json())
			// .then(data => {
			// 		console.log("data from base is loaded");
			// 		console.log("data from base", data);
			// 		return data;
			// })         
	}

			saveData(data) {
				let url = "http://localhost:3000/cars";
				let params = {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(data)
				};

				 fetch(url , params).then(response => console.log(response))
 
				// let newName = 	this.nameFormat(this.DOMElements.newName.value);
				// let newUrlForItem = this.urlFomat(this.DOMElements.newUrl.value);
				// let newDescr = this.descriptionFormat(this.DOMElements.newDescription.value);
				// let newDate = moment();
				// let newId;
				
				// for(let i = 0; i < 	this.cardsIdAtBase.length; i++){  //магия
				// 	if(this.cardsIdAtBase.indexOf(i)  == -1){
				// 		newId = i;
				// 		break;
				// 	}
				// }			
				// this.utils.showHide1({"hide" : [this.DOMElements.formForAdding]});
			};


			getLocalStorageGalleryStatus(){
				return localStorage.isGalleryInited;
			}



			editGallery(url , params){
				return fetch(url , params).then(response => console.log(response))
			 .then(
				 this.refreshGallery()) 
		 };	








		
			
			// saveData(item) {         
			// 		console.log("Saving item... " + item.name);
			// 		let iphone = {
			// 				"name": "Saved iPhone",
			// 				"price": 12458,
			// 				"popular": true,
			// 				"date": 1467440203
			// 		}
			// 		return new Promise(
			// 				function(resolve, reject) {            
			// 						resolve(iphone);          
			// 				}
			// 		);
			// }
			
			// updateData(counter) {
			// 		console.log("Updating item... " + counter);
			// 		let samsung = {
			// 				"name": "Saved Samsung",
			// 				"price": 12458,
			// 				"popular": true,
			// 				"date": 1467440203
			// 		}
			// 		return Promise.resolve(samsung);
			// }
	
	}
	
	window.app = window.app || {};
	window.app.GalleryModel = GalleryModel;
	
}())
