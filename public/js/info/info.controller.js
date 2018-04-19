export default class InfoController { 
	constructor(InfoModel, InfoView) {
		this.infoModel = InfoModel;
		this.infoView = InfoView;
	}       

	init(){
		console.log('infoView is inited')
		let userData = this.infoModel.getUserData();
		this.infoView.buildView(userData);
	}

}