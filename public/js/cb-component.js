/**
 * 
 * @param {*} id 
 * @param {*} child 
 */
function checkChildrenElement(id,child = []){
	let element = document.getElementById(id)
	
}

/**
 * pemeriksaan text didalam array
 * @param {*} array  =array
 * @param {*} obj = objek pembanding
 */
function contain(array,obj){
	for (let i = 0; i < array.length; i++) {
		if(array[i] == obj){
			return true
			break;
		}
	}
	return false;
}

/**
 * get data array 2D
 * 
 * @param {*} array 
 * @param {*} posisi -> { row:3,col:4 }, { row:3 },{ col:7 }
 */
function getDataArray(array,posisi){

	let data = posisi.col == undefined || posisi.row == undefined?
	[]:0;

	if(typeof data == "number"){
		console.log(array[posisi.row][posisi.col])
		data = array[posisi.row][posisi.col]
	}else{
		for (let row = 0; row < array.length; row++) {

			if(row == posisi.row && posisi.row != undefined){
				data.push(array[row]);
			}else{
				for (let col = 0; col < array[row].length; col++) {
					if(col == posisi.col){
						data.push(array[row][col])
					}
				}
			}
		}	
	}

	return data
}

/**
 * hapus data array 2D
 * @param {*} array  => data array yang akan dihapus(2D)
 * @param {*} col => 
 */
function removeColArray(array,col) {
	let array2d = []
	for (let index = 0; index < array.length; index++) {
		let before = []
		let after = []
		
		if(col > 0){
			before = array[index].slice(0,col)
		}

		if(col < array[index].length){
			after = array[index].slice(col + 1,array[index].length)
		}

		array[index] = before.concat(after)

		array2d.push(array[index])
	}

	return array2d
}

/**
 * penambahan 1baris array di array2D
 * 
 *  */ 
function array2D(array,inputArray) {
	if(array.length == inputArray.length){
		for (let index = 0; index < array.length; index++) {
			array[index][array.length] = inputArray[index]
		}
	}	
}

/**
 * add data array 2D
 * 
 * @param {*} array -> 
 * @param {*} push -> data added
 * @param {*} position -> { row:3,col:4 }, { row:3 },{ col:7 }
 * 
 * output 1D
 */
function pushArray(array,push,position) {
	let newArray = []

	var count = []

	// add new row
	if(position.col == undefined){
		for(let row = 0; row < array.length; row++){
			newArray[row] = array[row]

			if(position.row <= row){
				count.push(array[row])
				newArray.pop()
			}
		}

		newArray[position.row] = push

		newArray = newArray.concat(count)	
	// add new col
	}else if(position.row == undefined){

		// out row
		for(let row = 0; row < array.length; row++){
			newArray[row] = []
			var countCol = []

			// hitung jumlah position
			var posCount = 0

			// out col
			for (let col = 0; col < array[row].length; col++) {
				
				newArray[row][col - posCount] = array[row][col]

				if(position.col <= col){
					countCol.push(array[row][col])
					newArray[row].pop()
					posCount++
				}
			}

			count.push(countCol)

			// add newArray
			if(push.length >= array.length){
				newArray[row][position.col] = push[row]
			}else{
				newArray[row][position.col] = push[row % push.length]
			}
		}

	}else if(position.row != undefined && position.col != undefined){

		for(let row = position.row; row < array.length; row++){
			newArray[row] = array[row]

			if(position.row <= row){
				count.push(array[row])
				newArray.pop()
			}
		}

		newArray[position.row] = push

		newArray = newArray.concat(count)
	}

	// join 
	for (let row = 0; row < count.length; row++) {
			
		for (let col = 0; col < count[row].length; col++) {
			newArray[row].push(count[row][col])
		}
	}

	return newArray
}

/**
 * 
 * @param {*} array 
 * @param {*} replace 
 * @param {*} position 
 */
 function replaceArray(array,replace,position) {
	let newArray = []

	var count = []

	// add new row
	if(position.col == undefined){

		newArray[position.row] = replace

	// add new col
	}else if(position.row == undefined){

		// out row
		for(let row = 0; row < array.length; row++){
			newArray[row] = []
			var countCol = []

			// hitung jumlah position
			var posCount = 0

			// out col
			for (let col = 0; col < array[row].length; col++) {
				
				newArray[row][col - posCount] = array[row][col]

				if(position.col <= col){
					
					
					posCount++
				}
			}

			count.push(countCol)
		}

	}else if(position.row != undefined && position.col != undefined){

		for(let row = position.row; row < array.length; row++){
			newArray[row] = array[row]

			if(position.row <= row){
				count.push(array[row])
				newArray.pop()
			}
		}

		newArray[position.row] = replace

		newArray = newArray.concat(count)
	}

	return newArray
}


/**
 * create matrik null
 * 
 * @param {*} rowLength 
 * @param {*} colLength 
 * @returns 
 */
function matrikNull(rowLength,colLength){
	let a = []

	// row
	for (let row = 0; row < rowLength; row++) {
		let aRow = []
		// col
		for (let col = 0; col < colLength; col++) {
			aRow.push(0)
		}

		a.push(aRow)
	}

	return a
}

function Matrik(array) {
	
	this.reducer = (accu,current) =>{
		return accu+current;
	}

	this.reducerString = (accu,current) =>{
		return accu+current;
	}

	/**
	 * hitung nilai lalu dibagi dengan nilai tertentu
	 * @param {*} position 
	 * @param {*} separator 
	 */
	this.sumDivide = function(position,divide=0,separator=0){
		let t = this.sum(position).number

		let hasil = []
		

		// seleksi posisi
		if(position.col == undefined){
			for (let index = 0; index < array.length; index++) {
				hasil.push(getDataArray(array,{row:index}))
				
			}
		}else if(position.row == undefined){
			for (let index = 0; index < array[0].length; index++) {
				hasil.push(getDataArray(array,{col:index}))
			}			
		}

		// hitung
		let hasilDiv = []
		let hasilString = []
		for (let row = 0; row < hasil.length; row++) {
			let hasilSubDiv = [],hasilStringDiv = []
			for (let col = 0; col < hasil[row].length; col++) {
				hasilSubDiv.push(parseFloat(hasil[row][col]/t[row]))
				hasilStringDiv.push(hasil[row][col]+"/"+t[row])
			}
			
			hasilDiv.push(hasilSubDiv)
			hasilString.push(hasilStringDiv)
		}

		return {
			number:hasilDiv,
			string:hasilString
		}
	}

	/**
	 * menghitung nilai kolom atau baris
	 * @param {*} position {col:0} {row:0}
	 */
	this.sum = function (position,typeData = "string") {
		let hasil = []
		let hasilString = []

		// jika kolom tidak terdefinisi
		if(position.col == undefined){
			
			for (let index = 0; index < array.length; index++) {
				hasil.push(array[index].reduce(this.reducer,0));
				hasilString.push(catArray("+",array[index]));
			}
		
		// jika baris tidak terdefinisi
		}else if(position.row == undefined){
			
			for (let index = 0; index < array[0].length; index++){
				let dm = getDataArray(array,{col:index})
				hasil.push(dm.reduce(this.reducer,0));
				hasilString.push(catArray("+",dm));
			}
		}

		/*return hasil
		*/
		return {
			number:hasil,
			string:hasilString
		}

		
	}

	/**
	 * menghitung nilai kolom atau baris
	 * @param {*} position {col:0} {row:0}
	 */
	 this.max = function (position) {
		let hasil = []
		let hasilArray = []

		// jika kolom tidak terdefinisi
		if(position.col == undefined){
			// out index
			for (let index = 0; index < array.length; index++) {
				let max = 0
				// out col
				for (let col = 0; col < array[index].length; col++) {
					if(array[index][col] > max){
						max = array[index][col]
					}
				}
				
				hasil.push(max)
				hasilArray.push(array[index])
			}
		
		// jika baris tidak terdefinisi
		}else if(position.row == undefined){
			
			for (let index = 0; index < array[0].length; index++){
				
			}
		}

		/*return hasil
		*/
		return {
			number:hasil,
			array:hasilArray
		}

		
	}

	this.transpose = function() {
		let simetris = this.getDimensi()

		let arrayTranpose = matrikNull(simetris.last,simetris.row)

		if(simetris.simetris == "yes"){

			// row
			for (let row = 0; row < array.length; row++) {
				
				// col
				for (let col = 0; col < array[row].length; col++) {
					arrayTranpose[col][row] = array[row][col]
				}		
			}
		}

		return arrayTranpose
	}

	this.determinan = function(params) {
		
	}

	/* count = {
		col:0
		row:0
	}
	*/
	this.getDimensi = function(count = {row:0,last:0,simetris:"yes"}){

		let length = array.length;

		// first
		if(length == undefined){
			return count;
		}else{
			let lengthRow = array[count.row] == undefined?0:array[count.row].length

			if(count.row < length && lengthRow != 0){
				count.row++

				count.last = (count.last == 0)?lengthRow:count.last

				let smt = (count.last == lengthRow) && (count.simetris == "yes") ?"yes":"no"

				return this.getDimensi({row:count.row,last:lengthRow,simetris:smt})
			}else{
				return count;
			}
		}
	}

}

// end array

/**
 * pemeriksaan text didalam array
 * @param {*} separator  = pemisah antar string
 * @param {*} string = objeknya
 */
function catString(separator,string){
	let atts = string.split(separator);

	return atts;
}

/**
 * pemeriksaan text didalam array
 * @param {*} separator  = penggabung antar string
 * @param {*} array = objeknya
 */
 function catArray(separator,array){
	let atts = ''

	for (let index = 0; index < array.length; index++) {
		atts += array[index]
		if(index != array.length - 1){
			atts += separator
		}
	}

	return atts;
}

// class style css
function Styles(type){
	var elementId = document.getElementById(type);
	var elementClass = document.getElementsByClassName(type)
	var elementName = document.getElementsByName(type);

	this.cssWithId = function(objek){
		if(typeof objek == 'string'){
			var css = (elementId.getAttribute('style') == null)?"":element.getAttribute('style')+" ";
			elementId.setAttribute('style',css+objek);
		}else if(typeof objek == 'object'){
			if(elementId != null){
				for(o in objek){
					elementId.style[o] = objek[o];
				}
			}else{
				console.log("id not found");
			}	
		}
	}

	this.cssWithClass = function(objek,needle){
		if (elementClass != null) {
		
			for(o in objek){
				elementClass[needle].style[o] = objek[o];
			}
		} else {
			console.log("class not found");
		}	
	}

	this.cssWithName = function(objek,needle){
		if(elementName != null){		
			for(o in objek){
				document.getElementsByName(name)[needle].style[o] = objek[o];
			}
		}else{
			console.log("name not found");
		}
	}

	this.getStyle  = function() {
		return element.style[nameStyle];		
	}

}

function getStyle(id,nameStyle){
	var element = document.getElementById(id);

	return element.style[nameStyle];
}

/* penambahan css berdasarkan atribut id
// obj = property css dengan penulisan { nameProperty:"value" } 
*/
function addCssWithId(id,objek){
	var element = document.getElementById(id);
	if(typeof objek == 'string'){
		var css = (element.getAttribute('class') == null)?"":element.getAttribute('class')+" ";
		element.setAttribute('class',css+objek);
	}else if(typeof objek == 'object'){
		if(document.getElementById(id) != null){
			for(o in objek){
				document.getElementById(id).style[o] = objek[o];
			}
		}else{
			console.log("id not found");
		}	
	}
}


/* penambahan css berdasarkan atribut name
 	obj = property css dengan penulisan { nameProperty:"value" }
 	needle = urutan atribut name pada file dokumen 
*/
function addCssWithName(name,objek,needle){
	if(document.getElementsByName(name) != null){		
		for(o in objek){
			document.getElementsByName(name)[needle].style[o] = objek[o];
		}
	}else{
		console.log("name not found");
	}
}

/* penambahan css berdasarkan atribut class
// obj = property css dengan penulisan { nameProperty:"value" }
// needle = urutan atribut class pada file dokumen */
function addCssWithClass(className,objek,needle = 'all'){
	var element = document.getElementsByClassName(className);
	if(typeof objek == 'string'){
		var css = (element.getAttribute('class') == null)?"":element.getAttribute('class')+" ";
		element[needle].setAttribute('class',css+objek);
	}else if(typeof objek == 'object'){
		if (document.getElementsByClassName(className) != null) {
		
			for(o in objek){
				document.getElementsByClassName(className)[needle].style[o] = objek[o];
			}
		} else {
			console.log("class not found");
		}	
	}
}

/* build komponen no function and class */

// border
let separator = 10;

for (let index = 0; index < separator; index++) {
	let bordered = document.getElementsByClassName("bd-"+(index+1)+"px");
	let border_top= document.getElementsByClassName("bd-top-"+(index+1)+"px");
	let border_left= document.getElementsByClassName("bd-left-"+(index+1)+"px");
	let border_bottom= document.getElementsByClassName("bd-bottom-"+(index+1)+"px");
	let border_right= document.getElementsByClassName("bd-right-"+(index+1)+"px");

	let color = ''

	if(bordered.length != 0){
		for(b in bordered){
			if(bordered[b].style != undefined){
				color = bordered[b].getAttribute('color') == null?'gray': bordered[b].getAttribute('color')

				bordered[b].style.border = (index+1)+"px solid "+color
			}
		}
	}else if(border_top.length != 0){
		for(b in border_top){
			if(border_top[b].style != undefined){
				color = border_top[b].getAttribute('color') == null?'gray': border_top[b].getAttribute('color')

				border_top[b].style["border-top"] = (index+1)+"px solid "+color;
			}
		}
	}else if(border_left.length != 0){
		for(b in border_left){
			if(border_left[b].style != undefined){
				color = border_left[b].getAttribute('color') == null?'gray': border_left[b].getAttribute('color')

				border_left[b].style["border-left"] = (index+1)+"px solid "+color;
			}
		}
	}else if(border_bottom.length != 0){
		for(b in border_bottom){
			if(border_bottom[b].style != undefined){
				color = border_bottom[b].getAttribute('color') == null?'gray': border_bottom[b].getAttribute('color')

				border_bottom[b].style["border-bottom"] = (index+1)+"px solid "+color;
			}
		}
	}else if(border_right.length != 0){
		for(b in border_right){
			if(border_right[b].style != undefined){
				color = border_right[b].getAttribute('color') == null?'gray': border_right[b].getAttribute('color')

				border_right[b].style["border-right"] = (index+1)+"px solid "+color;
			}
		}
	}
}


/**
 * http request
 * @param {*} url 
 * @param {*} callback 
 */ 
function httpGet(url) {
	let xmll = new XMLHttpRequest();
	xmll.open('GET',url,false);

	xmll.send(null);

	return xmll.responseText;
}



/**
 * http request
 * 
 *  
 */ 
function httpGetAsync(url,callback){
	let xmll = new XMLHttpRequest();
	xmll.onreadystatechange = function(){
		if(xmll.readyState == 4 && xmll.status == 200)
			callback(xmll);
	}

	xmll.open('GET',url,true);
	xmll.send();
}

/**
 * http request
 * 
 *  
 */ 
 function httpPostAsync(url,callback){
	let xmll = new XMLHttpRequest();
	xmll.onreadystatechange = function(){
		if(xmll.readyState == 4 && xmll.status == 200)
			callback(xmll);
	}

	xmll.open('Post',url,true);
	xmll.send();
}

/** 
 * klik location
*/
function onLocation(location,target = ""){
	if(target == ""){
		window.location = location;
	}else{
		window.open(location,target);
	}
}


/**
 * print
 */
function printed(id){
	let element = document.getElementById(id)
	
	try {
		
		document.body.style.backgroundColor = "white"
		document.body.innerHTML = element.innerHTML

		window.print()
		window.location.reload()
	} catch (error) {
		
	}
}

/**
 * 
 */
function removeChildren(type){
	let removeChild = type.querySelectorAll('.remove-child')

	for (let indexremove = 0; indexremove < removeChild.length; indexremove++) {
		let child = removeChild[indexremove].children;

		let childLength = child.length
		
		for (let index2 = childLength - 1; index2 >= 0; index2--) {
			child[index2].remove()
		}
	}
}


/**
 * 
 */
function randomCode(code){
	
}