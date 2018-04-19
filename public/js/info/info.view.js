export default class InfoView {
	constructor() {
		this.DOMElements = {
			login : document.querySelector("#person-email"),
			password : document.querySelector("#person-password"),
			togglePasswordBtn : document.querySelector("#togglePasswordBtn")

		}
		this.showPassStatus = 0;

	}
	buildView(userData){
		console.log("userData is loaded into view")
		this.fillUserInfo(userData);
		this.initListeners();
	};
	fillUserInfo(userData){
		this.DOMElements.login.value = userData.email;
		this.DOMElements.password.value = userData.password;
	}
	
	initListeners(){
		this.DOMElements.togglePasswordBtn.addEventListener("click" , this.togglePasswordOutput.bind(this));
	}
	togglePasswordOutput (event){
		if(event.target.tagName == "BUTTON"){
			if(this.showPassStatus == 0){
				this.showHidePass(this.DOMElements.password , "text");
				this.DOMElements.togglePasswordBtn.innerText = "Скрыть пароль";
				this.showPassStatus = 1;
			} else {
				this.showHidePass(this.DOMElements.password , "password");
				this.DOMElements.togglePasswordBtn.innerText = "Показать пароль";
				this.showPassStatus = 0;
			}
		}
	}
	showHidePass(elem, type){                                          
		elem.setAttribute('type', type);
	};
}