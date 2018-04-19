
	
export default	class GalleryModel {
		constructor(url) {
				this.getUrl = url;
		}	

		getData() {
			return fetch(this.getUrl).then(responce => responce.json()) 
					.then(data => {
						//this.setDataToDB(data)
						return data;
					})
		}

		setDataToDB(data) {
			let url = "http://localhost:3000/cars";
			let elem = {
				"url": "desktopwallpapers.org.ua/mini/201507/40059.jpg",
				"name": "TOYOTA",
				"params": {
					"status": true,
					"progress": "20"
				},
				"description" : "Lorem ipsum dolor sit amet",
				"date" : 1322153200637
			}
			let params = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(elem)
				};
				fetch(url , params)
				.then(response => console.log(response))
		
			return
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

				return fetch(url , params).then(response => console.log(response))
		};


		getItem(itemId){
			let url = `http://localhost:3000/cars/${itemId}`;
			return fetch(url).then(response => response.json())
		}

		editGallery(url , params){
			return fetch(url , params).then(response => console.log(response))
			.then(
				this.refreshGallery()) 
			};	
				
	}







		
			
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
	
	
