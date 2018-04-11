(function() {

	class Controller { 
			constructor(model, view, observer) {
					this.model = model;
					this.view = view;
					this.observer = observer;
			}        
			bindEvents() {
				//this.DOMElements.form.addEventListener("keypress", this.initValidation.bind(this));
				this.view.DOMElements.submitBtn.addEventListener("click", (event) => {
						event.preventDefault();
						let item = this.view.getDataForValidation();
						this.validate(item)
						.then(   // promise
							this.model.getData()
							.then(data => {this.view.buildView(data)
								this.view.fillInputsOnUserPage(item.login , item.password)
							 	this.view.showGalleryBlock()
							})
						)
						.catch(function(error){console.log(error)})   // не работает catch
						
				});	
			}

			bindSubscribers() {
					this.observer.subscribeEvent("update", (count) => {
							this.model.updateData(count).then((data) => {
									this.view.setUpdatedData(data);
							});    
					});     
			}  
			
			initView(data) {
					if(!this.view.isReady()) {
							this.view.init(data);   
					}
					//this.view.isReady() || this.view.init(data);
			}
			
			init() {
					this.model.getData().then((data) => {
							this.initView(data);
							this.bindSubscribers();
							this.bindEvents();
					});    
			}
			
	}

	class LoginForm {
		constructor (validatorModule , galleryModule , obj , userInfo, utils ) {	
			this.validator = validatorModule;
			this.gallery = galleryModule;
			this.utils = utils;
			this.DOMElements = obj; 	
			this.showPassStatus = 0;
			this.userInfo = userInfo;
			this.user1;
		};
	
		initComponent () { 
				this.utils.setInfo(this.userInfo); // новый
				localStorage.isGalleryInited = "false";
				this.checkIfUserLoggedIn();    
				this.initListeners();
				this.initTooltips();
		};
		checkIfUserLoggedIn (){
				this.user1 = this.utils.getInfo();
				if(localStorage.isUserLoggedIn == "true"){
						this.showPersonPage();
						this.fillInputsOnUserPage(this.user1.email , this.user1.password);
						this.gallery.clearGallery(); 
						this.gallery.init();
				}
		};
		showPersonPage () {
				this.utils.showHide1({"show" : [this.DOMElements.gallery , this.DOMElements.personNavbar,
					this.DOMElements.backBtn]});
				this.utils.showHide1({"hide" :  [this.DOMElements.form]});	
				this.DOMElements.showGalleryBtn.classList.add("btn", "btn-outline-secondary");
				this.DOMElements.showUserDataBtn.classList.remove("btn", "btn-outline-secondary");
		};
		hidePersonPage (){
				this.utils.showHide1({"hide" : [this.DOMElements.personPage,
					this.DOMElements.gallery, 
					this.DOMElements.personNavbar,
					this.DOMElements.backBtn] 
				});
				this.utils.showHide1({"show" :  [this.DOMElements.form]});
		};
		initListeners () {
				this.DOMElements.form.addEventListener("keypress", this.initValidation.bind(this));
				this.DOMElements.submitBtn.addEventListener("click", this.validate.bind(this));	
				this.DOMElements.backBtn.addEventListener("click", this.goBack.bind(this));	
				this.DOMElements.togglePasswordBtn.addEventListener("click", this.togglePasswordOutput.bind(this));
				this.DOMElements.showGalleryBtn.addEventListener("click", this.showGalleryBlock.bind(this));	
				this.DOMElements.showUserDataBtn.addEventListener("click", this.showUserDataBlock.bind(this));	
		};
		fillInputsOnUserPage (inp , pass){
				this.DOMElements.personNameField.value = inp;    
				this.DOMElements.personPasswordField.value = pass;
		};
		initValidation (event){
				if(event.keyCode == 13) {
						this.validate();
				}
		};
	
		validate () {
			this.utils.hideAlertMsgs({"hide" : [this.DOMElements.alertMsg,
				this.DOMElements.notFilledEmailMsg, 
				this.DOMElements.notFilledPassMsg,
				this.DOMElements.wrongEmailMsg,
				this.DOMElements.wrongPassMsg]});
			let url = 'http://localhost:3000/login';
			let userData = {
				"login":`${this.DOMElements.email.value}`,
				"password":`${this.DOMElements.password.value}`
			}
			let params = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userData)
			};
	
			let email = this.DOMElements.email.value;
			let password = this.DOMElements.password.value;
			let isFieldsChecked = this.validator.checkFields(email , password);
	
			fetch(url , params).then(response => response.json())
				.then(response => {
					console.log("response" , response);
					if(isFieldsChecked && response.status){   
						this.showPersonPage();
						this.fillInputsOnUserPage (email , password);
						this.gallery.init();
						localStorage.isUserLoggedIn = "true";
						this.utils.setInfo(this.user1);
					}  
			}) 
		};
		goBack () {
			this.hidePersonPage();
			this.gallery.clearGallery(); 
			this.fillStartPageUserData(); 
			localStorage.isUserLoggedIn = "false";
			localStorage.isGalleryInited = "true";
			this.user1.sortMethod = "0";
			this.utils.setInfo(this.user1);
		};
		
		fillStartPageUserData (){
			this.user1 = this.utils.getInfo();
			if (this.DOMElements.checkBoxRemememberMe.checked == true){
					this.DOMElements.email.value = this.user1.email;    
					this.DOMElements.password.value = this.user1.password;
			} else {
					this.DOMElements.email.value = "";
					this.DOMElements.password.value = "";
			}
		};
		togglePasswordOutput (event){
			if(this.showPassStatus === 0){
				this.showPassStatus = 1;
				this.utils.showHidePass(this.DOMElements.personPasswordField , "text");
				this.DOMElements.togglePasswordBtn.innerText = "Скрыть пароль";
			} else {
				this.showPassStatus = 0;
				this.utils.showHidePass(this.DOMElements.personPasswordField , "password");
				this.DOMElements.togglePasswordBtn.innerText = "Показать пароль";
			}
		};

		showGalleryBlock (){
					this.utils.showHide1({"hide" : [this.DOMElements.personPage]});
					this.utils.showHide1({"show" :  [this.DOMElements.gallery]});
					this.DOMElements.showGalleryBtn.classList.add("btn", "btn-outline-secondary");
					this.DOMElements.showUserDataBtn.classList.remove("btn", "btn-outline-secondary");
		};
		showUserDataBlock() {
				this.utils.showHide1({"show" : [this.DOMElements.personPage]});
				this.utils.showHide1({"hide" :  [this.DOMElements.gallery]});
				this.DOMElements.showUserDataBtn.classList.add("btn", "btn-outline-secondary");
				this.DOMElements.showGalleryBtn.classList.remove("btn", "btn-outline-secondary");
		};
		initTooltips (){
				$('[data-toggle="tooltip"]').tooltip(); 
		};
	};
	


	class Validator{
		constructor(obj , utils){
			this.DOMEls = obj;
			this.utils = utils;
			this.user1;
		};
    checkEmail (email) {                                                 
        let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return reg.test(email);
    };
    checkPassword(password){
        if(password.length >= 8){
            return true;
        }
    };
    checkFields (email, pass){
        if ( !email) {
            this.utils.showHide1({"show" : [this.DOMEls.notFilledEmailMsg]});
            return false;
        }
        if ( !pass) {
            this.utils.showHide1({"show" : [this.DOMEls.notFilledPassMsg]});
            return false;
        }
        if ( !this.checkEmail(email)) {
            this.utils.showHide1({"show" : [this.DOMEls.wrongEmailMsg]});
            return false;
        }
        if ( !this.checkPassword(pass)) {
            this.utils.showHide1({"show" : [this.DOMEls.wrongPassMsg]});
            return false;
        }
        return true;
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
   
}



	window.app = window.app || {};
	window.app.Controller = Controller;
	window.app.LoginForm = LoginForm;
	window.app.Validator = Validator;

}());
