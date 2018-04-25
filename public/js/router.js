//import Observer from './gallery/observer.js';

	import Utils from './utils.js';
	
	import GalleryController from './gallery/gallery.controller.js';
	import GalleryModel from './gallery/gallery.model.js';
	import GalleryView from './gallery/gallery.view.js';

	import LoginController from './login/login.controller.js';
	import LoginModel from './login/login.model.js';
	import LoginView from './login/login.view.js';

	import InfoController from './info/info.controller.js';
	import InfoModel from './info/info.model.js';
	import InfoView from './info/info.view.js';


	let main = document.querySelector("#main-view");
	let gallery = document.querySelector("#gallery-view");
	let info = document.querySelector("#info-view");
	let showMainBtn = document.querySelector("#showMainBtn");
	let showGalleryBtn = document.querySelector("#showGalleryBtn");
	let showInfoBtn = document.querySelector("#showUserDataBtn");
	
	
	let activatedRoutes = {};
	let controllers = {};
	let routeConfig = {
		"" : {
			show : () => {
					showView(main);
					hideViews([gallery, info]);
					changeBtnAppearance(showMainBtn, showGalleryBtn, showInfoBtn);
			},
			init : () => {
					let urlUser = "http://localhost:3000/user";
					let urlLogin = "http://localhost:3000/login";
					let loginModel = new LoginModel(urlLogin , urlUser);
					let loginView = new LoginView;
					let loginController = new LoginController(loginModel, loginView);
					loginController.init();
			}
		},

		"gallery": {
					show: () => {
						showView(gallery);
						hideViews([main, info]);
						changeBtnAppearance(showGalleryBtn, showMainBtn, showInfoBtn);
					},
					init: () => {
						
							let url = "http://localhost:3000/cars";
							//let observer = new window.app.Observer;
							let galleryModel = new GalleryModel(url);
							let galleryView = new GalleryView;
							let galleryController = new GalleryController(galleryModel, galleryView);
							galleryController.init();
					}
			},

			"info": {
					show: () => {
						showView(info);
						hideViews([main, gallery]);
						changeBtnAppearance(showInfoBtn, showGalleryBtn, showMainBtn);
					},
					init: () => {
							let infoModel = new InfoModel;
							let infoView = new InfoView;
							let infoController = new InfoController(infoModel, infoView);
							infoController.init();
					}
			},
	};

	function showView(showEl){
		showEl.classList.remove("hide");
		showEl.classList.add("show");

	}
	function hideViews(viewEls){
		viewEls.forEach(element => {
			element.classList.remove("show")
			element.classList.add("hide");
		});
	}
	function changeBtnAppearance(activeBtn, passiveBtn1, passiveBtn2){
		activeBtn.classList.add("btn", "btn-outline-secondary");
		passiveBtn1.classList.remove("btn", "btn-outline-secondary");
		passiveBtn2.classList.remove("btn", "btn-outline-secondary");
	}

	function navigateTo(routeName) {
		window.location.hash= "#" + routeName;
	}

	function isLoggedIn() {
			let credentials = JSON.parse(localStorage.getItem('credentials'));
			return !!credentials;
	}


	function activateRoute(routeName){
    if (activatedRoutes[routeName]) {
        activatedRoutes[routeName]();
    } else {
        let route = routeConfig[routeName];
        if (route) {
            route.init();
            route.show();
            activatedRoutes[routeName] = route.show;
        }
    } 
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if(routeName && !isLoggedIn()) {
        navigateTo(""); 
    } else {
        activateRoute(routeName);
    }
    
}
