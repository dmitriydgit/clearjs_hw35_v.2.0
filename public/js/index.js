(function() {
 
	
	// let url = 'https://gist.githubusercontent.com/dmitriydgit/36b44650a6a01c27ade48e52631a99ce/raw/b8b492237ff9146a59025d76cb284664e3d68da7/cars.json';
	// 	const doms = {
	// 			email : document.querySelector("#inputEmail"),
	// 			password : document.querySelector("#inputPassword"),
	// 			checkBoxRemememberMe : document.querySelector("#inputRemember"),
	// 			submitBtn : document.querySelector("#submitBtn"),
	// 			showUserDataBtn : document.querySelector("#showUserDataBtn"),
	// 			showGalleryBtn : document.querySelector("#showGalleryBtn"),
	// 			personPage : document.querySelector("#person"),
	// 			form : document.querySelector("#myForm"),
	// 			gallery : document.querySelector("#gallery"),
	// 			personNavbar : document.querySelector("#personNavbar"),
	// 			backBtn : document.querySelector("#reload"),
	// 			togglePasswordBtn : document.querySelector("#eye"),
	// 			personNameField : document.querySelector("#person-email"),
	// 			personPasswordField : document.querySelector("#person-password"),
	// 			resultBlock : document.querySelector('#result'),
	// 			alertMsg : document.querySelector("#alert-massage1"), 
	// 			notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
	// 			notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
	// 			wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
	// 			wrongPassMsg : document.querySelector("#wrongPassMsg"),
	// 			// gallery doms	
	// 			resultBlock:document.querySelector('#result'),
	// 			sortBlock:document.querySelector("#type-selector"),
	// 			counter:document.querySelector('#counter'),
	// 			backCounter:document.querySelector('#back-counter'),
	// 			modal:document.querySelector("#myModal"),
	// 			addImgBtn: document.querySelector("#add-img"),
	// 			formForAdding: document.querySelector("#form-add-new"),
	// 			newName: document.querySelector("#new-name"),
	// 			newUrl: document.querySelector("#new-url"),
	// 			newDescription: document.querySelector("#new-descr"),
	// 			newDate: document.querySelector("#new-date"),
	// 			newStatus: document.querySelector("#new-params-status"),
	// 			newProgress: document.querySelector("#new-params-progress"),
	// 			addNewImgBtn: document.querySelector("#add-new-img"),
	// 			editBtn: document.querySelector("#edit-img"),
	// 			galleryCards : document.querySelectorAll(".gallery-card"),
	// 			// validator doms
	// 			alertMsg : document.querySelector("#alert-massage1"), 
	// 			notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
	// 			notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
	// 			wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
	// 			wrongPassMsg : document.querySelector("#wrongPassMsg"),
			
	// 	}
	// 	const userInfo = {
	// 		email:"ddd@gmail.com", 
	// 		password:"12345678",
	// 		sortMethod: "0"
	// 	} 	
    
  //   let observer = new window.app.Observer;
  //   let model = new window.app.Model(url, userInfo);
  //   let view = new window.app.View(doms , userInfo);
  //   let controller = new window.app.Controller(model, view, observer, utils)
	// 	controller.init();
		
	let url = 'https://gist.githubusercontent.com/dmitriydgit/36b44650a6a01c27ade48e52631a99ce/raw/b8b492237ff9146a59025d76cb284664e3d68da7/cars.json';
	const domsForLoginform = {
    email : document.querySelector("#inputEmail"),
    password : document.querySelector("#inputPassword"),
    checkBoxRemememberMe : document.querySelector("#inputRemember"),
    submitBtn : document.querySelector("#submitBtn"),
    showUserDataBtn : document.querySelector("#showUserDataBtn"),
    showGalleryBtn : document.querySelector("#showGalleryBtn"),
    backBtn : document.querySelector("#reload"),
    personNavbar : document.querySelector("#personNavbar"),
    togglePasswordBtn : document.querySelector("#eye"),
    personNameField : document.querySelector("#person-email"),
    personPasswordField : document.querySelector("#person-password"),
    form : document.querySelector("#myForm"),
    personPage : document.querySelector("#person"), 
    gallery : document.querySelector("#gallery"),
		resultBlock : document.querySelector('#result'),
		//alertMsg : document.querySelector("#alert-massage1"), 
		//notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
		//notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
		//wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
		//wrongPassMsg : document.querySelector("#wrongPassMsg"),
		alertMsg : document.querySelector("#alert-message"), 
		notFilledEmailMsg : document.querySelector("#notFilledEmailMsg"),
		notFilledPassMsg : document.querySelector("#notFilledPassMsg"),
		wrongEmailMsg : document.querySelector("#wrongEmailMsg"),
		wrongPassMsg : document.querySelector("#wrongPassMsg")
	};

	const domsForGallery = {	
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
	}

	const userInfo = {
		login : "ddd@gmail.com", 
		password : "12345678",
		sortMethod : "0"
	}

	let observer = new window.app.Observer;
	let utils = new window.app.Utils;

	let galleryModel = new window.app.GalleryModel(url);
	let galleryView = new window.app.GalleryView(domsForGallery , userInfo, utils);
	let galleryController = new window.app.GalleryController(galleryModel, galleryView, 			observer,  utils, userInfo);


	//let loginForm = new window.app.LoginForm;
	let validationModel = new window.app.ValidationModel(url, userInfo);
	let validationView = new window.app.ValidationView(domsForLoginform , userInfo);
	//let validator = new window.app.Validator(validationView);
	let validationController = new window.app.ValidationController(validationModel, validationView, observer,  utils, userInfo, galleryController);
	validationController.init();


// let loginForm = new LoginForm(validatorModule , galleryModule , domsForLoginform , userInfo, utils);
// loginForm.initComponent();








}());

//пишу контроллер галереи. вытянуть данные из 33 задания организовать работу с кнопками и бекендом