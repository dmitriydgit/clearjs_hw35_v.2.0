
export default	class GalleryView {
		constructor (){
			this.DOMElements = {
				resultBlock:document.querySelector('#result'),
				sortBlock:document.querySelector("#type-selector"),
				counter:document.querySelector('#counter'),
				backCounter:document.querySelector('#back-counter'),
				modal:document.querySelector("#myModal"),
				addImgBtn: document.querySelector("#add-img"),
				formForAdding: document.querySelector("#form-add-new"),
				newName: document.querySelector("#new-name"),
				newUrl: document.querySelector("#new-url"),
				newDescription: document.querySelector("#new-descr"),
				newDate: document.querySelector("#new-date"),
				newStatus: document.querySelector("#new-params-status"),
				newProgress: document.querySelector("#new-params-progress"),
				addNewImgBtn: document.querySelector("#add-new-img"),
				editBtn: document.querySelector("#edit-img"),
				galleryCards : document.querySelectorAll(".gallery-card"),
				enterBtn : document.querySelectorAll("#enterBtn")
			
			};
			this.readyDataForGallery = [];
			this.visibleData = [];
			this.counter = 0;
			this.cardsLimit = 20;
			this.imageCounter = 0;
			this.sortMethod = 0;
		};
		
		init(data){
			this.initListeners(); 
			this.refreshGallery(data);
			console.log(data)
		};

		initListeners (){
			this.DOMElements.addImgBtn.addEventListener("click", this.showFormForAdding.bind(this));
			this.DOMElements.sortBlock.addEventListener("change", this.sortGallery.bind(this));
		};
		
		refreshGallery(data){
			this.prepareData(data);
			this.biuldWholeGallery();
			this.checkLimit(); 
			
			console.log("readyDataForGallery" , this.readyDataForGallery)
			console.log("visibleData", this.visibleData)
		};
		
		prepareData (data) {
			this.readyDataForGallery = data.map((item, index) => {                 
				return {
									url: this.urlFomat(item.url),
									name: this.nameFormat(item.name),
									description: this.descriptionFormat(item.description),
									date: this.dateFormat(item.date),
									itemID: item.id
									}
			});
			this.visibleData = [];
			this.visibleData.push.apply(this.visibleData,	this.readyDataForGallery);
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
					this.sortMethod = "0";
					break;
				case "1":
						this.visibleData.sort((a, b) => {
							if(a.name < b.name) return -1;
							if(a.name > b.name) return 1;
							return 0;
					});
						this.sortMethod = "1";
						break;
				case "2":
						this.visibleData.sort((a, b) => {
							if(a.name < b.name) return 1;
							if(a.name > b.name) return -1;
							return 0;
					});
						this.sortMethod = "2";
					break;
				case "3":
						this.visibleData.sort((a, b) => {
							if(a.date < b.date) return 1;
							if(a.date > b.date) return -1;
							return 0;
					});
						this.sortMethod = "3";
						break;
				case "4":
						this.visibleData.sort((a, b) => {
							if(a.date < b.date) return -1;
							if(a.date > b.date) return 1;
							return 0;
					});
					this.sortMethod = "4";
					break;
				}
				this.reBuildGalleryAfterSort(this.visibleData);
			};
				
			reBuildGalleryAfterSort (visibleData){  
				this.DOMElements.resultBlock.innerHTML = "";
				for (let i = 0; i < visibleData.length; i++) {    
						this.DOMElements.resultBlock.innerHTML += this.createGalleryItem(visibleData[i], i+1); 
				}
				this.imageCounter = visibleData.length;
				this.DOMElements.counter.innerHTML = this.imageCounter;
				this.DOMElements.backCounter.innerHTML = this.readyDataForGallery.length - this.imageCounter;
				
			};
			createGalleryItem (item, index) {
				return 	`<div class="col-md-4 gallery-card" id = ${item.itemID}>
						<div class="card mb-4 box-shadow gallery-item" id = "${item.id}">
								<img src="${item.url}" alt="${item.name}" class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
								<div class="card-body">
										<div class="card-text">${index}: ${item.name}</div>
										<div class="text-muted top-padding">${item.description}</div>
										<div class="text-muted">${item.date}</div>
										<div class="btn-group">
											<button type="button" class="btn btn-outline-secondary">View</button>
											<button type="button" class="btn btn-outline-secondary edit">Edit</button>
										</div>
										<div  name = "delete-img" class = "btn btn-danger"  title = "Удалить данное изображение"> Удалить </div>
								</div>
								
						</div>
					</div>`;
			};

			showFormForAdding(event){
				if(!this.checkLimit()){
				return false;
			}
			if(event.target.classList.contains("edit") || event.target.id == "add-img"){
				this.clearFormForAdd();
				this.showHide({"show" : [this.DOMElements.formForAdding]});
				this.showHide({"hide" : [this.DOMElements.editBtn]});
			}
		};

		fillFormForEdit(data){
			let response = data;
			this.DOMElements.newName.value = response.name;
			this.DOMElements.newUrl.value = response.url;
			this.DOMElements.newDescription.value = response.description;
		};
		
		hideFormForAdding(){
			this.showHide({"hide" : [this.DOMElements.formForAdding]})
		}
		
		toggleAddEditBtn(){
			this.showHide({"show" : [this.DOMElements.formForAdding]});
			this.showHide({"hide" : [this.DOMElements.addNewImgBtn]});
		}
		
		

		createItemForAdd(){
			let item = {
				"url" : this.urlFomat(this.DOMElements.newUrl.value),
				"name": this.nameFormat(this.DOMElements.newName.value),
				"params": {
						"status": true,
						"progress": 1
				},
				"description": this.descriptionFormat(this.DOMElements.newDescription.value),
				"date": moment()
			}
			return item;
		}
		
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
		checkLimit (){
			let element = this.DOMElements.addImgBtn;
				if (this.imageCounter < this.cardsLimit) {
					this.removeButtonDisabled(element);
					return true;
				}
				if (this.imageCounter >= this.cardsLimit) {
						this.setButtonDisabled(element);
						return false;
				}
		};
		clearFormForAdd(){
			this.DOMElements.newName.value = "";
			this.DOMElements.newUrl.value = "";
			this.DOMElements.newDescription.value = "";
		};
		clearGallery (){
				this.visibleData = [];
				this.deletedData = [];
				this.imageCounter  = 0;
		};
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

		setButtonDisabled(element){
			element.setAttribute( "disabled", "true");
			element.classList.remove("button-blue");
			element.classList.add("button-grey");
			element.setAttribute("data-toggle", "modal");
		};

		removeButtonDisabled(element){
			element.removeAttribute( "disabled");
			element.classList.remove("button-grey");
			element.classList.add("button-blue");
			element.removeAttribute("data-toggle");
		};


	}
	
	
	
	




