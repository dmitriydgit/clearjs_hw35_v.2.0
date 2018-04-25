
export default	class LoginView {
		constructor (){
			this.DOMElements = {
				submitBtn : document.querySelector("#submitBtn"),
				enterBtn : document.querySelector("#enterBtn"),
				exitBtn : document.querySelector("#exitBtn"),
				email : document.querySelector("#inputEmail"),
				password : document.querySelector("#inputPassword"),
				checkBoxRemememberMe : document.querySelector("#inputRemember"),
				showUserDataBtn : document.querySelector("#showUserDataBtn"),
				showGalleryBtn : document.querySelector("#showGalleryBtn"),
				alertMsg : document.querySelector("#alert-message"), 
				notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
				notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
				wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
				wrongPassMsg : document.querySelector("#wrongPassMsg")
			}
		};
		
		getLogAndPass(){
			let credentials = {
				"login" : this.DOMElements.email.value,
				"password" : this.DOMElements.password.value
			}
			return credentials;
		};
		
		showErrorMsg(msgCode){
			switch(msgCode){
				case '1':
				this.showHide({"show" : [this.DOMElements.alertMsg]});
				break;
			
				case '2':
				this.showHide({"show" : [this.DOMElements.notFilledEmailMsg]})
				break;
				
				case '3':
				this.showHide({"show" : [this.DOMElements.notFilledPassMsg]})
				break;

				case '4':
				this.showHide({"show" : [this.DOMElements.wrongEmailMsg]})
				break;

				case '5':
				this.showHide({"show" : [this.DOMElements.wrongPassMsg]})
				break;
			}
		}

		hideAlertMsgs(){
			this.showHide({"hide" : [this.DOMElements.alertMsg,
				this.DOMElements.notFilledEmailMsg, 
				this.DOMElements.notFilledPassMsg,
				this.DOMElements.wrongEmailMsg,
				this.DOMElements.wrongPassMsg]});
		};
		
		// buildView() {  // данные для галереи
		// 	console.log("View is ready");
			
		// 	this.hideLoginForm();
		// 	this.showPersonNavbar();
		// 	this.showGallery();
		// 	this.fillInputsOnUserPage(this.DOMElements.email.value , this.DOMElements.password.value);
		// 	this.showGalleryBlock();
		// 	this.initListeners();
		// };	
		
		// initListeners () {
		// 	this.DOMElements.backBtn.addEventListener("click", this.goBack.bind(this));	
		// 	this.DOMElements.togglePasswordBtn.addEventListener("click", this.togglePasswordOutput.bind(this));
		// 	this.DOMElements.showGalleryBtn.addEventListener("click", this.showGalleryBlock.bind(this));	
		// 	this.DOMElements.showUserDataBtn.addEventListener("click", this.showUserDataBlock.bind(this));	
		// };

		// fillInputsOnUserPage (inp , pass){
		// 	this.DOMElements.personNameField.value = inp;    
		// 	this.DOMElements.personPasswordField.value = pass;
		// };

		showAlertMsg(){
			this.showHide({"show" : [this.DOMElements.alertMsg]})
		}
		showNotFilledEmailMsg(){
			this.showHide({"show" : [this.DOMElements.notFilledEmailMsg]})
		}
		showNotFilledPasswordMsg(){
			this.showHide({"show" : [this.DOMElements.notFilledPassMsg]})
		}
		showBadLoginMsg(){
			this.showHide({"show" : [this.DOMElements.wrongEmailMsg]})
		};

		showBadPasswordMsg(){
			this.showHide({"show" : [this.DOMElements.wrongPassMsg]})
		};

		// hideLoginForm(){
		// 	this.showHide({"hide" : [this.DOMElements.form]});
		// }
		// showGallery(){
		// 	this.showHide({"show" : [this.DOMElements.gallery]});
		// }
		// showPersonNavbar(){
		// 	this.showHide({"show" : [this.DOMElements.personNavbar]})
		// }
		// hideEnterBtn(){
		// 	this.showHide({"hide" : [this.DOMElements.enterBtn]});
		// }
		showButtons(){
			this.showHide({"show" :  
				[this.DOMElements.showUserDataBtn,
					this.DOMElements.showGalleryBtn,
					this.DOMElements.exitBtn]
			})
		}

		hideExitBtn(){
			this.showHide({"hide" : [this.DOMElements.exitBtn]});
		}
		hideButtons(){
			this.showHide({"hide" :  [this.DOMElements.showUserDataBtn,
				this.DOMElements.showGalleryBtn,
				this.DOMElements.exitBtn]})
			
		}

		showHide(object){    
			for(var key in object) { 
					var key = key;
					var value = object[key]; 
					value.forEach(DOMElem => {
									DOMElem.classList.remove("show" , "hide");
									DOMElem.classList.add(key);
					})
			}
		};
		showHidePass(elem, type){                                          
			elem.setAttribute('type', type);
		};
		hidePersonPage (){
			this.showHide({"hide" : [this.DOMElements.personPage,
				this.DOMElements.gallery, 
				this.DOMElements.personNavbar] 
			});
			this.showHide({"show" :  [this.DOMElements.form]});
		};
		showUserDataBlock(){
			this.showHide({"show" : [this.DOMElements.personPage]});
			this.showHide({"hide" :  [this.DOMElements.gallery]});
			this.DOMElements.showUserDataBtn.classList.add("btn", "btn-outline-secondary");
			this.DOMElements.showGalleryBtn.classList.remove("btn", "btn-outline-secondary");
		}
		showGalleryBlock (){
			this.showHide({"hide" : [this.DOMElements.personPage]});
			this.showHide({"show" :  [this.DOMElements.gallery]});
			this.DOMElements.showGalleryBtn.classList.add("btn", "btn-outline-secondary");
			this.DOMElements.showUserDataBtn.classList.remove("btn", "btn-outline-secondary");
		};
		togglePasswordOutput (event){
			if(this.showPassStatus === 0){
				this.showPassStatus = 1;
				this.showHidePass(this.DOMElements.personPasswordField , "text");
				this.DOMElements.togglePasswordBtn.innerText = "Скрыть пароль";
			} else {
				this.showPassStatus = 0;
				this.showHidePass(this.DOMElements.personPasswordField , "password");
				this.DOMElements.togglePasswordBtn.innerText = "Показать пароль";
			}
		};
		// showHidePass(elem, type){                                          
			// 	elem.setAttribute('type', type);
			// };
			
			goBack () {
				this.hidePersonPage();
				this.clearGallery(); 
				this.fillStartPageUserData(); 
				//localStorage.isUserLoggedIn = "false";
				//localStorage.isGalleryInited = "true";
				this.userInfo.sortMethod = "0";
				//this.utils.setInfo(this.user1);
			};
			
			fillStartPageUserData (){
				//this.user1 = this.utils.getInfo();
				if (this.DOMElements.checkBoxRemememberMe.checked == true){
						this.DOMElements.email.value = this.userInfo.login;    
						this.DOMElements.password.value = this.userInfo.password;
				} else {
						this.DOMElements.email.value = "";
						this.DOMElements.password.value = "";
				}
			};
			










		prepareData (data) {
			this.readyDataForGallery = data;
			this.DOMElements.sortBlock.value = this.DOMElements.sortMethod ? this.DOMElements.sortMethod : "0";
			this.readyDataForGallery = data.map((item, index) => {                 
				return {
									url: item.url,
									name: item.name,
									description: item.description,
									date: item.date,
									itemID: item.id
									}
			});
			this.visibleData = [];
			this.visibleData.push.apply(this.visibleData,	this.readyDataForGallery);
	};

		reBuildGalleryAfterSort (visibleData){  
			this.DOMElements.resultBlock.innerHTML = "";
			for (let i = 0; i < visibleData.length; i++) {    
					this.DOMElements.resultBlock.innerHTML += this.createGalleryItem(visibleData[i], i+1); 
			}
			this.imageCounter = visibleData.length;
			this.DOMElements.counter.innerHTML = this.imageCounter;
			this.DOMElements.backCounter.innerHTML = this.readyDataForGallery.length - this.imageCounter;
			let user = this.getInfo();
			this.DOMElements.sortBlock.value = user.sortMethod;
		};

		createGalleryItem (item, index) {
			return `<div class="col-md-4 gallery-card" id = ${item.itemID}>
									<div class="card mb-4 box-shadow gallery-item" id = "${item.id}">
											<img src="${this.urlFomat(item.url)}" alt="${this.nameFormat(item.name)}" class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
											<div class="card-body">
													<div class="card-text">${index}: ${this.nameFormat(item.name)}</div>
													<div class="text-muted top-padding">${this.descriptionFormat(item.description)}</div>
													<div class="text-muted">${this.dateFormat(item.date)}</div>
													<div class="btn-group">
														<button type="button" class="btn btn-outline-secondary">View</button>
														<button type="button" class="btn btn-outline-secondary edit">Edit</button>
													</div>
													<div  name = "delete-img" class = "btn btn-danger delete-card"  title = "Удалить данное изображение"> Удалить </div>
											</div>
											
									</div>
							</div>`;
		};
		nameFormat (name){
			return  name ? name[0].toUpperCase() + name.substring(1).toLowerCase() : "Lohn Doh";
		};
		urlFomat  (url){
				return  url.indexOf("http://") === -1 ? `http://${url}` :  url; 
		};
		descriptionFormat(descr){
				return (descr.length > 15 ) ? descr.substring(0 , 15) + "..." : descr;
		};
		dateFormat (date){
				let format = "YYYY/MM/DD HH:mm";
				return  (!date.isNaN) ? moment(date).format(format) : console.log("Error, data is incorrect") ;
		};


		biuldWholeGallery(){
			this.sortGallery ();
};

sortGallery (){
	switch (this.DOMElements.sortBlock.value) {
			case "0":
					this.visibleData.sort((a, b) => {
						if(a.name < b.name) return -1;
						if(a.name > b.name) return 1;
						return 0;
				});
				this.user1.sortMethod = "0";
				break;
			case "1":
					this.visibleData.sort((a, b) => {
						if(a.name < b.name) return -1;
						if(a.name > b.name) return 1;
						return 0;
				});
				this.user1.sortMethod = "1";
					break;
			case "2":
					this.visibleData.sort((a, b) => {
						if(a.name < b.name) return 1;
						if(a.name > b.name) return -1;
						return 0;
				});
				this.user1.sortMethod = "2";
				break;
			case "3":
					this.visibleData.sort((a, b) => {
						if(a.date < b.date) return 1;
						if(a.date > b.date) return -1;
						return 0;
				});
				this.user1.sortMethod = "3";
					break;
			case "4":
					this.visibleData.sort((a, b) => {
						if(a.date < b.date) return -1;
						if(a.date > b.date) return 1;
						return 0;
				});
				this.user1.sortMethod = "4";
					break;
	}
	this.setInfo(this.user1);
	this.reBuildGalleryAfterSort(this.visibleData);
};



		clearGallery (){
			this.visibleData = [];
			this.deletedData = [];
			this.imageCounter  = 0;
		};
		
		deleteImage(event){
			if(event.target.classList.contains("delete-card")){
				let cardId = event.target.closest(".gallery-card").id;
				let index = this.visibleData.findIndex((item , index) => {
						if (item.itemID == cardId){
							 return index;
						 }
				})	
				this.visibleData.splice(index , 1);
				this.reBuildGalleryAfterSort(this.visibleData);

			}
		};

	}




	// View.prototype = {

	//     init : function (items) {
	//         this.items = items;
	//         this.buildView();
	//         this.ready = true;
	//     },

	//     buildView : function () {
	//         console.log("View is ready");
	//         console.log(this.items);
	//     },

	//     getItemToSave : function(){
	//         let item = this.items[0];
	//         item.name = "iPhone";
	//         return item;
	//     },

	//     setSavedData : function (data) {
	//         console.log("View item is successfully saved!");
	//         console.table(data);
	//     },

	//     setUpdatedData : function (data) {
	//         console.log("View item is successfully updated!");
	//         console.table(data);
	//     },

	//     isReady : function (){
	//         return this.ready;
	//     }
	// }

	
// (function() {

// 	function View () {        
// 			this.DOMElements = {
// 					saveBtn     : document.querySelector("#saveBtn"),
// 					refreshBtn  : document.querySelector("#refreshBtn")
// 			};

// 			this.ready = false;
// 			this.counter = 0;
// 	}
	
// 	View.prototype = {
			
// 			init : function (items) {
// 					this.items = items;
// 					this.buildView();
// 					this.ready = true;
// 			},
			
// 			buildView : function () {
// 					console.log("View is ready");
// 					console.log(this.items);
// 			},

// 			getItemToSave : function(){
// 					let item = this.items[0];
// 					item.name = "iPhone";
// 					return item;
// 			},

// 			setSavedData : function (data) {
// 					console.log("View item is successfully saved!");
// 					console.table(data);
// 			},

// 			setUpdatedData : function (data) {
// 					console.log("View item is successfully updated!");
// 					console.table(data);
// 			},

// 			isReady : function (){
// 					return this.ready;
// 			}
// 	}
	
// 	window.app = window.app || {};
// 	window.app.View = View;

// }());
