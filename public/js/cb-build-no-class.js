/* build attribut no class */

/**
 * create class note  class for tooltip,toogle show and hide element berdasarkan class 
 */
let notedClass = document.getElementsByClassName('note-class');

try {
	for (let index = 0; index < notedClass.length; index++) {
		let innClass = notedClass[index].getAttribute("note-in");
		let showClass = notedClass[index].getAttribute("note-show") == null?"block":notedClass[index].getAttribute("note-show");

		notedClass[index].onclick = function(){
			let nClass = document.getElementsByClassName(innClass);
			let disp = nClass[index].style.display
				
			if(disp == '' || disp == 'none'){
				nClass[index].style.display = showClass
			}else if(disp == showClass){
				nClass[index].style.display = 'none'
			}
		}
	}
} catch (error) {
	console.log(error)
}


/*
* create class note for tooltip,toogle show and hide element berdasarkan id
*/
let noted = document.getElementsByClassName('note');
try {
	for (let index = 0; index < noted.length; index++) {
		let out = noted[index].getAttribute("note-out");

		let inn = noted[index].getAttribute("note-in");
		let show = noted[index].getAttribute("note-show") == null?"block":noted[index].getAttribute("note-show");

		noted[index].onclick = function() {

			// set value for note data
			try {
				let o;
				if(getStyle(inn,"display") == "" || getStyle(inn,"display") == "none"){
					o ={
						display:show
					}
				}else if(getStyle(inn,"display") == show){
					o ={
						display:"none"
					}
				}

				addCssWithId(inn,o);	
			} catch (ex) {
				console.log(ex);
			}
		};
	}
} catch (e) {
	console.log(e)
}

// create nav dynamic ()
let nav = document.getElementsByClassName('nav');
try {
	nav[0].children[0].onclick = function() {
		for (let index = 1; index < nav[0].children.length; index++) {
			if(nav[0].children[index].style.display == "" || nav[0].children[index].style.display == "none"){
				nav[0].children[index].style.display = "block";
				nav[0].style.height = "auto"
			}else{
				nav[0].children[index].style.display = "none"
				nav[0].style.height = "50px"
			}
		}
	}	
} catch (e) {
	console.log(e)
}

// sub nav
let subnav = document.getElementsByClassName('sub-nav')
for (let index = 0; index < subnav.length; index++) {
	let p = subnav[index].getAttribute("position") == undefined || subnav[index].getAttribute("position") == null?"left":"right"

	subnav[index].style[p] = "0"
}


// create nav-side dynamic
let nav_side = document.getElementsByClassName('nav-side');
let nav_fixed = document.getElementsByClassName('nav-fixed');

try {
	// check nav fixed
	if(nav_fixed.length != 0){
		nav_side[0].style.top = "50px"
	}else{
		nav_side[0].style.top = "0"
	}

	nav_side[0].children[0].onclick = function() {
		// selection data children(anak) from nav-side class
		if(nav_side[0].style.width == "70%"){
			nav_side[0].style.width = "0%"
			nav_side[0].children[0].style.marginRight = "-5%"
			nav_side[0].children[0].style.opacity = "1"
		}else{
			nav_side[0].style.width = "70%"
			nav_side[0].children[0].style.marginRight = "0%"
			nav_side[0].children[0].style.opacity = "0.5"
		}
		
	}
} catch (e) {
	console.log(e)
}


// box list
let box_list = document.getElementsByClassName('box-list');
try {
	for (let index = 0; index < box_list.length; index++) {
		
		let auto = box_list[index].getAttribute('auto') == null?'no':box_list[index].getAttribute('auto');
		let show = box_list[index].getAttribute('show') == null?3:box_list[index].getAttribute('show');

		let sum = box_list[index].children.length;
		let clone = new Clone('box-list','div');

		if(sum > show){
			sum = sum % show;

			clone.createWithClass(sum,index);
		}else if(sum < show){
			sum = show - sum;

			clone.createWithClass(sum,index);
		}

		// selection data children(anak) from box list class
		for (let i = 0; i < box_list[index].children.length; i++) {
			let showing = (100/show);
			
			// create width child box lisy
			box_list[index].children[i].style.width = showing-1+"%";
		}
	}	
} catch (e) {
	console.log(e)
}

// boundary
let greater = document.getElementsByClassName('greater');
let boundary = document.getElementsByClassName('boundary');
try {
	
	for (let index = 0; index < boundary.length; index++){		
		let button = document.createElement("button");
		button.setAttribute("class","pos-fixed top no-bd max-height max-width");
		button.style.backgroundColor = "rgb(39, 39, 39,0.5)"

		greater[index].appendChild(button);

		button.onclick = function(){
			greater[index].style.display = "none";
			removeChildren(boundary[index])
		}
	}	
} catch (e) {
	console.log(e)
}


// paging



// tab
let tab = document.getElementsByClassName('tab');
try {
	// tab
	for (let index = 0; index < tab.length; index++) {	
		let subTab = ['tab-list','data-list','foot-list'];
		
		// sub element tab
		for (let list = 0; list < tab[index].children.length; list++) {

			// seleksi berdasarkan anak dari class tab dengan pola susunan subTab
			if(tab[index].children[list].className == subTab[list]){
				
				// var tab-list
				let subTabList = tab[index].children[0];

				// var data-list
				let subDataList = tab[index].children[1];

				// set awal


				// list dari anak class tab-list
				for (let tabList = 0; tabList < subTabList.childElementCount; tabList++) {
					// klik anak tab-list
					let notClick = true;
					let subDetail = 0;
					let countActiv = 0;

					if(notClick){
						if(subTabList.children[tabList].className == "active"){
							countActiv++;

							// periksa apabila terdapat lebih dari 1 class active
							if(countActiv > 1){

							}else{

							}

							subDataList.children[tabList].style.display = "block"
							subDataList.children[tabList].setAttribute('active','on');

							// klik 
							for (subDetail = 0; subDetail < subDataList.childElementCount; subDetail++){
								if(subDetail != tabList){	
									subDataList.children[subDetail].style.display = "none"
									//subDataList.children[subDetail].removeAttribute('active');
								}
							}	
						}
					}

					subTabList.children[tabList].onclick = function(){
						notClick = false;

						subTabList.children[tabList].setAttribute("class","active");
						subDataList.children[tabList].style.display = "block"
						subDataList.children[tabList].setAttribute('active','on');

						// klik 
						for (subDetail = 0; subDetail < subTabList.childElementCount; subDetail++){
							if(subDetail != tabList){
								subTabList.children[subDetail].removeAttribute('class');		
								subDataList.children[subDetail].style.display = "none"
								subDataList.children[subDetail].removeAttribute('active');
							}
						}
					}	
				}
			}else{

			}	
		}
	}	
} catch (e) {
	console.log(e)
}


// // tab
let tabColumn = document.getElementsByClassName('tab-column');

try {
	// tab
	for (let index = 0; index < tabColumn.length; index++) {	
		let subTab = ['tab-list','data-list','foot-list'];
		
		// sub element tab
		for (let list = 0; list < tabColumn[index].children.length; list++) {

			// seleksi berdasarkan anak dari class tab dengan pola susunan subTab
			if(tabColumn[index].children[list].className == subTab[list]){
				
				// var tab-list
				let subTabList = tabColumn[index].children[0];

				// var data-list
				let subDataList = tabColumn[index].children[1];

				// set awal


				// list dari anak class tab-list
				for (let tabList = 0; tabList < subTabList.childElementCount; tabList++) {
					// klik anak tab-list
					let notClick = true;
					let subDetail = 0;
					let countActiv = 0;

					if(notClick){
						if(subTabList.children[tabList].className == "active"){
							countActiv++;

							// periksa apabila terdapat lebih dari 1 class active
							if(countActiv > 1){

							}else{

							}

							subDataList.children[tabList].style.display = "block"
							subDataList.children[tabList].setAttribute('active','on');

							// klik 
							for (subDetail = 0; subDetail < subDataList.childElementCount; subDetail++){
								if(subDetail != tabList){	
									subDataList.children[subDetail].style.display = "none"
									//subDataList.children[subDetail].removeAttribute('active');
								}
							}	
						}
					}

					subTabList.children[tabList].onclick = function(){
						notClick = false;

						subTabList.children[tabList].setAttribute("class","active");
						subDataList.children[tabList].style.display = "block"
						subDataList.children[tabList].setAttribute('active','on');

						// klik 
						for (subDetail = 0; subDetail < subTabList.childElementCount; subDetail++){
							if(subDetail != tabList){
								subTabList.children[subDetail].removeAttribute('class');		
								subDataList.children[subDetail].style.display = "none"
								subDataList.children[subDetail].removeAttribute('active');
							}
						}
					}	
				}
			}else{

			}	
		}
	}	
} catch (e) {
	console.log(e)
}


// hide
let hide = document.getElementsByClassName('hide-property');
for (let index = 0; index < hide.length; index++) {
	try {
		hide[index].children[0].querySelector('button').onclick = function(){
			console.log(hide[index].children[1].style.display)
			if(hide[index].children[1].style.display == "" || hide[index].children[1].style.display == 'none'){
				hide[index].children[1].style.display = "block"
			}else if(hide[index].children[1].style.display == "block"){
				hide[index].children[1].style.display = "none"
			}
		}	
	} catch (ex) {
		console.error(ex)
	}
}

// slider


// bg-img
let img = document.getElementsByClassName('bg-img')
try {
	for (let index = 0; index < img.length; index++) {
		let url = img[index].getAttribute('url') == null?'':img[index].getAttribute('url');
		//let url = img[index].getAttribute('url') == null?'':img[index].getAttribute('url');

		img[index].style['background'] = "url("+url+") no-repeat center"
		img[index].style['background-size'] = "cover"
		
	}	
} catch (error) {
	console.log("gambar gagal");
}


// img rotate
let imgRotate = document.getElementsByClassName('img-rotate')
try {
	for (let index = 0; index < imgRotate.length; index++) {
		let rot = imgRotate[index].querySelectorAll(".sub")
		
		for (let j = 0; j < rot.length; j++) {
			
			let active = rot[j].getAttribute('active')
			
			console.log(active);

			if(active == null)
				rot[j].style.display = "none"
		}
	}	
} catch (error) {
	console.log("gambar gagal");
}
