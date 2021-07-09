
class StyleCode{
	

	constructor(style = "HTML"){
		this.htmlCollect = [
			"<div>","</div>",
			"<span>","</div>",

			"<h1>",
			"<h2>",
			"<h3>",
			"<h4>",
			"<h5>",
			"<h6>",
		]
	}
}



class DSSElectre{

	/** 
	 * criteria = {'a':{bobot:3},'b':{bobot:3},'c'{bobot:3}}
	  */
	constructor(criteria = {'a':{bobot:3},'b':{bobot:3},'c':{bobot:3}}){
		this.criteria = criteria

		this.nilaiAlternatif = []
		this.alternatif = []


		this.jumlahCriteria = Object.keys(this.criteria).length
	}

	/**
	 * 
	 * @param {*} alternatif 
	 * valalternatif = [
	 * 	[valcri1,valcri2,valcriN]
	 * ]
	 */
	setAlternatif(alternatif,valAlternatif){
		// out alternatif
		for (let index = 0; index < valAlternatif.length; index++) {

			// check nilai alternatif
			if(valAlternatif[index].length == this.jumlahCriteria){
				this.nilaiAlternatif.push(valAlternatif[index])
			}else{
	
			}
		}


		// check name
		if(valAlternatif.length == alternatif.length){
			this.alternatif = alternatif
		}
	}

	getAlternatif(){
		return this.alternatif
	}

	getValAlternatif(){
		return this.nilaiAlternatif
	}

	normalisasi(){
		let pangkat2 = []
		let pangkat2Str = []

		// out alternatif pangkat 2
		for (let row = 0; row < this.nilaiAlternatif.length; row++) {
			let pangRow = [],pangStrRow = []
			for (let col = 0; col < this.nilaiAlternatif[row].length; col++) {
				pangRow.push(Math.pow(this.nilaiAlternatif[row][col],2))
				pangStrRow.push(this.nilaiAlternatif[row][col]+"^"+2)
			}

			pangkat2.push(pangRow)
			pangkat2Str.push(pangStrRow)
		}

		// jumlah
		let jumMat = new Matrik(pangkat2)

		// akar
		let akar = [],akarStr = []
		for (let index = 0; index < jumMat.sum({col:1}).number.length; index++) {
			akar.push(Math.sqrt(jumMat.sum({col:1}).number[index]))
			akarStr.push(jumMat.sum({col:1}).number[index]+" akar 2")
		}

		// normalisasi
		let normalisasi = [],normalisasiStr = []
		for (let row = 0; row < this.nilaiAlternatif.length; row++) {
			let normaRow = [],normaStrRow = []
			for (let col = 0; col < this.nilaiAlternatif[row].length; col++) {
				normaRow.push(this.nilaiAlternatif[row][col] / akar[col])
				normaStrRow.push(this.nilaiAlternatif[row][col]+" / "+akar[col])
			}

			normalisasi.push(normaRow)
			normalisasiStr.push(normaStrRow)
		}

		return{
			pangkat:{
				number:pangkat2,
				string:pangkat2Str
			},

			akar:{
				number:akar,
				string:akarStr
			},

			jumlah:{
				number:jumMat.sum({col:1}).number,
				string:jumMat.sum({col:1}).string
			},

			normalisasi:{
				number:normalisasi,
				string:normalisasiStr
			},
		}
	}

	pembobotan(){
		let normalisasi = this.normalisasi().normalisasi.number

		let cri = Object.keys(this.criteria);
		let criBobot = []
		for (let index = 0; index < cri.length; index++) {
			criBobot.push(this.criteria[cri[index]].bobot);
		}

		// pembobotan
		let pembobotan = [],pembobotanStr = []
		for (let row = 0; row < normalisasi.length; row++) {
			let pembobotanRow = [],pembobotanStrRow = []
			for (let col = 0; col < normalisasi[row].length; col++) {
				pembobotanRow.push(normalisasi[row][col] * criBobot[col])
				pembobotanStrRow.push(normalisasi[row][col]+" X "+criBobot[col])
			}

			pembobotan.push(pembobotanRow)
			pembobotanStr.push(pembobotanStrRow)
		}

		return {
			string:pembobotanStr,
			number:pembobotan
		}
	}

	pertemuan(){
		let alt = this.nilaiAlternatif;
		let pertemuanNumber = []

		// out cri pertama
		for (let index1 = 0; index1 < alt.length; index1++) {
			
			// out cri kedua
			for (let index2 = 0; index2 < alt.length; index2++) {
				
				// index tidak sama
				if(index1 != index2){
					pertemuanNumber.push((index1+1) +"^"+ (index2+1))
				}
			}
		}

		return pertemuanNumber;
	}

	consordance(){
		let lengthTemuRow = this.pertemuan().length
		let matrikHimpConsor = [],matrikHimpConsorStr = []
		let lengthCol = 0

		// himpunan
		if(this.pembobotan().number.length != 0 || this.pembobotan().number.length != 1){
			lengthCol = this.pembobotan().number[0].length
			
			matrikHimpConsor = matrikNull(lengthTemuRow,lengthCol)
			matrikHimpConsorStr = matrikNull(lengthTemuRow,lengthCol)

			// out pertemuan
			for (let index = 0; index < lengthTemuRow; index++) {
				let position = catString("^",this.pertemuan()[index])

				// out col
				for (let col = 0; col < this.pembobotan().number[0].length; col++) {
					let hasil = this.pembobotan().number[parseInt(position[0] - 1)][col] >= this.pembobotan().number[parseInt(position[1] - 1)][col]?this.nilaiAlternatif[parseInt(position[0] - 1)][col]:0;
					
					matrikHimpConsor[index][col] = hasil
					matrikHimpConsorStr[index][col] = this.pembobotan().number[parseInt(position[0] - 1)][col]+">="+this.pembobotan().number[parseInt(position[1] - 1)][col]+" = "+hasil
				}
			}
		}

		// jumlah
		let matrikJum = new Matrik(matrikHimpConsor)

		// consor
		let matrikConsor = matrikNull(this.nilaiAlternatif.length,this.nilaiAlternatif.length - 1);

		let count = 0;
		for (let row = 0; row < this.nilaiAlternatif.length; row++){
			for (let col = 0; col < this.nilaiAlternatif.length - 1; col++) {
				matrikConsor[row][col] = matrikJum.sum({row:1}).number[count]
				count++
			}
		}

		// jumlah consor row
		let matrikConsorJum = new Matrik(matrikConsor)

		// hasil jumlah consor
		let hasiljumlahconsor = matrikConsorJum.sum({row:1}).number.reduce(function(sum,number){
			return sum + number
		},0);

		let hasiljumlahconsorstr = matrikConsorJum.sum({row:1}).number.reduce(function(sum,number){
			return sum+"+"+number
		});


		return {
			himpunan_1:{
				string:matrikHimpConsorStr,
				number:matrikHimpConsor
			},

			/** jumlah pertemuan */
			jumlah_2:{
				string:matrikJum.sum({row:1}).string,
				number:matrikJum.sum({row:1}).number
			},

			consor_3:{
				array: matrikConsor
			},

			jumlahConsor_4:{
				string:matrikConsorJum.sum({row:1}).string,
				number:matrikConsorJum.sum({row:1}).number
			},

			hasilJumlahConsor_5:{
				string:hasiljumlahconsorstr,
				number:hasiljumlahconsor
			}

		}
	}

	disordance(){
		let lengthTemuRow = this.pertemuan().length
		let matrikHimpDisor = [],matrikHimpDisorStr = []
		let matrikHimBobot = [], matrikHimBobotStr = [], matrikMaxDisorBobot = []
		let lengthCol = 0

		// himpunan
		if(this.pembobotan().number.length != 0 || this.pembobotan().number.length != 1){
			lengthCol = this.pembobotan().number[0].length
			
			matrikHimpDisor = matrikNull(lengthTemuRow,lengthCol)
			matrikHimpDisorStr = matrikNull(lengthTemuRow,lengthCol)

			matrikHimBobot = matrikNull(lengthTemuRow,lengthCol)
			matrikHimBobotStr = matrikNull(lengthTemuRow,lengthCol)

			// out pertemuan
			for (let index = 0; index < lengthTemuRow; index++) {
				let position = catString("^",this.pertemuan()[index])

				// out col
				for (let col = 0; col < this.pembobotan().number[0].length; col++) {
					let hasil = this.pembobotan().number[parseInt(position[0] - 1)][col] < this.pembobotan().number[parseInt(position[1] - 1)][col]?this.nilaiAlternatif[parseInt(position[0] - 1)][col]:0;
					let hasilBobot = Math.abs(this.pembobotan().number[parseInt(position[0] - 1)][col] - this.pembobotan().number[parseInt(position[1] - 1)][col])

					// himpunan corsor
					matrikHimpDisor[index][col] = hasil
					matrikHimpDisorStr[index][col] = this.pembobotan().number[parseInt(position[0] - 1)][col]+"<"+this.pembobotan().number[parseInt(position[1] - 1)][col]+" = "+hasil

					// himpunan corsor bobot
					matrikHimBobot[index][col] = hasilBobot
					matrikHimBobotStr[index][col] = this.pembobotan().number[parseInt(position[0] - 1)][col]+"-"+this.pembobotan().number[parseInt(position[1] - 1)][col]+" = "+hasilBobot

				}
			}
			
			// himpunan corsor bobot
			matrikMaxDisorBobot = new Matrik(matrikHimBobot)
		}

		// matrik dengan disordance tidak 0
		let matrikBobotDisor = matrikNull(lengthTemuRow,lengthCol);
		let matrikBobotDisorStr = matrikNull(lengthTemuRow,lengthCol);

		// out himpunan
		for (let row = 0; row < matrikHimpDisor.length; row++) {
			
			for (let col = 0; col < matrikHimpDisor[row].length; col++) {
				// himpunan disor tidak 0
				if(matrikHimpDisor[row][col] != 0){
					matrikBobotDisor[row][col] = matrikHimBobot[row][col]
					matrikBobotDisorStr[row][col] = matrikHimBobotStr[row][col]
				}else{
					matrikBobotDisor[row][col] = 0
					matrikBobotDisorStr[row][col] = "not"
				}
			}
		}

		let matrikMaxBobotDisor = new Matrik(matrikBobotDisor)

		// jumlah
		let jumlahDisor = [],jumlahDisorStr = []
		for (let index = 0; index < matrikMaxDisorBobot.max({row:1}).number.length; index++) {
			jumlahDisor.push(matrikMaxBobotDisor.max({row:1}).number[index] / matrikMaxDisorBobot.max({row:1}).number[index])
			jumlahDisorStr.push(matrikMaxBobotDisor.max({row:1}).number[index]+"/"+ matrikMaxDisorBobot.max({row:1}).number[index])
		}

		// disor
		let matrikDisor = matrikNull(this.nilaiAlternatif.length,this.nilaiAlternatif.length - 1);

		let count = 0;
		for (let row = 0; row < this.nilaiAlternatif.length; row++){
			for (let col = 0; col < this.nilaiAlternatif.length - 1; col++) {
				matrikDisor[row][col] = jumlahDisor[count]
				count++
			}
		}

		// jumlah disor row
		let matrikDisorJum = new Matrik(matrikDisor)

		// hasil jumlah consor
		let hasiljumlahdisor = matrikDisorJum.sum({row:1}).number.reduce(function(sum,number){
			return sum + number
		},0);

		let hasiljumlahdisorstr = matrikDisorJum.sum({row:1}).number.reduce(function(sum,number){
			return sum+"+"+number
		});


		return {
			himpunan_1:{
				string:matrikHimpDisorStr,
				number:matrikHimpDisor
			},

			himpunanBobot_2:{
				string:matrikHimBobotStr,
				number:matrikHimBobot,
				max: matrikMaxDisorBobot.max({row:1}).number
			},

			himpunanBobotDisor_3:{
				string:matrikBobotDisorStr,
				number:matrikBobotDisor,
				max:matrikMaxBobotDisor.max({row:1}).number
			},

			/** jumlah pertemuan */
			jumlah_4:{
				number:jumlahDisor,
				string:jumlahDisorStr,
			},

			
			disor_5:{
				array: matrikDisor
			},
			
			jumlahDisor_6:{
				string:matrikDisorJum.sum({row:1}).string,
				number:matrikDisorJum.sum({row:1}).number
			},

			hasilJumlahDisor_7:{
				string:hasiljumlahdisorstr,
				number:hasiljumlahdisor
			}
		}
	}

	eliminasiPerangkingan(){

		/* kurangkan consor dan disor */
		let matrikJumlah = matrikNull(this.consordance().consor_3.array.length,2)
		let matrikJumlahStr = matrikNull(this.consordance().consor_3.array.length,2)

		// out matrik jumlah
		for (let row = 0; row < this.consordance().consor_3.array.length; row++) {
			
			for (let col = 0; col < 2; col++) {
				matrikJumlah[row][col] = this.consordance().consor_3.array[row][col] - this.disordance().disor_5.array[row][col]
				matrikJumlahStr[row][col] = this.consordance().consor_3.array[row][col]+" - "+this.disordance().disor_5.array[row][col]
			}
		}

		// hitung per altenatif(less)
		let matrikRanking = new Matrik(matrikJumlah)

		// join alt dan less
		let matrikAlternatif = new Matrik([this.alternatif])
		
		matrikAlternatif = pushArray(matrikAlternatif.transpose(),matrikRanking.sum({row:1}).number,{col:1})
		return{
			jumlah_1:{
				number:matrikJumlah,
				string:matrikJumlahStr
			},

			lessrank_2:{
				number:matrikRanking.sum({row:1}).number,
				string:matrikRanking.sum({row:1}).string
			},

			rank_alternatif_3:{
				array: matrikAlternatif
			}
		}
	}

}


// class tab
function Tab(parent){
	this.parent = document.getElementById(parent);
	this.firstTab = "pad-5px fw-medium ff-arial"
	this.header = document.createElement('div')
	this.header.className = "ds-flex"

	this.body = document.createElement('div')

	this.list = {
		header:[],
		body:[],
		footer:[]
	}

	/**
	 * set all tab list
	 * @param {*} list 
	 */
	this.setTabList = function(list){
		this.list.header = list
	}

	/**
	 * set all data list
	 * @param {*} list 
	 */
	this.setDataList = function(data){
		this.list.body = data
	}

	/**
	 * 
	 * @param {*} list 
	 */
	this.setFootList = function(list,status='none'){
		this.list.footer = list
	}

	/**
	 * add list to tablist
	 * @param {*} list 
	 */
	this.addTabList = function(list){
		let div = document.createElement('div')
		div.innerHTML = list
		div.className = this.firstTab

		/** */
		div.onmouseover = () =>{
			div.style.cursor = 'pointer'
		}

		this.header.appendChild(div)

		// push list header
		this.list.header.push(list)
	}

	/**
	 * add list to data-list
	 * @param {*} list 
	 */
	this.addDataList = function(data){
		let div = document.createElement('div')
		div.append(data)
		div.className = "pad-5px ds-none"

		this.body.appendChild(div)

		// push list body
		this.list.body.push(data)
	}

	/**
	 * 
	 * @param {*} action -> action => (same,custom) penyesuaian tablist dengan data list
	 * @param {*} display -> display => [[tab-list],[data list]]
	 * 
	 */
	this.createTab = function(){
		/**
		 * set up tab
		 */
		// header

		for (let index = 0; index < this.list.header.length; index++) {
			let headerList = document.createElement('div')
			
			headerList.innerHTML = this.list.header[index]
			headerList.className = this.firstTab

			/** */
			headerList.onmouseover = () =>{
				headerList.style.cursor = 'pointer'
			}

			this.header.appendChild(headerList)
		}

		// body
		for (let index = 0; index < this.list.body.length; index++) {
			let bodyList = document.createElement('div')
			
			bodyList.append(this.list.body[index])
			bodyList.className = "pad-5px ds-none"

			this.body.appendChild(bodyList)
		}

		// footer
		document.createElement('div')

		this.parent.appendChild(this.header)
		this.parent.appendChild(this.body)

	}

	/**
	 * 
	 * @param {*} action -> action => (same,custom) penyesuaian tablist dengan data list
	 * @param {*} display -> display => [[tab-list],[data list]]
	 * 
	 */
	this.actionTab = function(action,first = 0,value = []){

		let tabb = this.parent.getAttribute('tab-list') != undefined? this.parent.getAttribute('tab-list'):""
		/**
		 *  set tablist
		 * 
		 * action = same(header == body)
		 */
		
		if(action == 'same'){
			// if value same
			if(this.list.header.length == this.list.body.length){
				/**
				* tab-list active
				*/
				this.header.children[first].setAttribute('active','on')
				this.header.children[first].className = this.firstTab+" "+tabb
				this.body.children[first].className = "pad-5px ds-block"

				// out list header
				for (let index = 0; index < this.list.header.length; index++) {	
					this.header.children[index].onclick = () => {
						this.header.children[index].setAttribute('active','on')
						this.header.children[index].className = this.firstTab+" "+tabb
						this.body.children[index].className = "pad-5px ds-block"
						
						// set off
						for (let i = 0; i < this.list.header.length; i++)
							if (i != index){
								this.header.children[i].setAttribute('active','off')
								this.header.children[i].className = this.firstTab
								this.body.children[i].className = "pad-5px ds-none"
							}
					}
				}
			}else{
				console.log("masuk");
			}
		}else{
			
		}
	}
}


/* build attribut with class */
function ImageCB(){
	this.url;

	this.setImg = function (params) {
		
	}
}

class AHP{

	constructor(kriteriaArray){
		this.kriteria = kriteriaArray

		this.skalaPerbandingan = [1,2,3,4,5,6,7,8,9]

		this.pertemuan = []

		this.alternatif = []

		this.indexRandom = [0,0,0.58,0.90,1.12,1.24,1.32,1.41,1.45,1.49,1.51,1.48,1.56,1.59]
	}

	setAlternatif(alternatif){
		this.alternatif = alternatif
	}

	/**
	 * 
	 * @param {*} pertemuan -> 
	 * ['pertemuankriteria1','pertemuankriteria2','value(1-9)','arah pertemuan(<(kiri) dan >(kanan))']
	 * [
	 * 	['c1','c2',9,'<'],
	 * 	['c2','c2',1,'<']
	 * ]
	 */
	setPertemuan(pertemuan){
		let m = new Matrik(pertemuan)

		if(m.getDimensi().last == 4){
			this.pertemuan = pertemuan
		}/*else if(m.getDimensi().last == 5){
			this.pertemuan = pertemuan
		}*/else{
			console.log("panjang column tidak sesuai")
		}
	}

	
	matrikPerbandingan(type = 'kriteria'){
		// create matrik
		let matrikP = type == 'kriteria'?matrikNull(this.kriteria.length,this.kriteria.length):matrikNull(this.alternatif.length,this.alternatif.length)

		// add kolom matrik
		for (let index = 0; index < this.pertemuan.length; index++){
			var k1 = parseInt(this.pertemuan[index][0].charAt(this.pertemuan[index][0].length - 1))
			var k2 = parseInt(this.pertemuan[index][1].charAt(this.pertemuan[index][0].length - 1))

			var val = parseFloat(this.pertemuan[index][2])

			var posisi = this.pertemuan[index][3]
			

			matrikP[k1-1][k2-1] = posisi == '<'?val:1/val
			matrikP[k2-1][k1-1] = posisi == '<'?1/val:val
		}

		return matrikP
	}
	
	sintesis(){
		// set var
		let dataeigen = this.matrikPerbandingan()

		let matriksum = new Matrik(dataeigen)
		
		let eigen = matriksum.sumDivide({col:1}).number

		eigen = new Matrik(eigen)

		// jumlah
		let jumlah = new Matrik(eigen.transpose())
		jumlah = jumlah.sum({row:0}).number
		
		// rata2
		let rata2 = []
		for (let index = 0; index < jumlah.length; index++) {
			rata2.push(parseFloat(jumlah[index]/this.kriteria.length))
		}

		return {
			dataeigen:eigen.transpose(),
			jumlah:jumlah,
			rata:rata2
		}
	}

	lambda(){
		let rata2 = this.sintesis().rata
		let jumlah = new Matrik(this.matrikPerbandingan())
		jumlah = jumlah.sum({row:0}).number.reverse()

		let hasil = 0
		let hasilString = ''
		if (rata2.length == jumlah.length) {
			for (let index = 0; index < jumlah.length; index++) {
				hasil += (jumlah[index] * rata2[index])
				hasilString += "("+jumlah[index]+"*"+rata2[index]+")"
			}	
		}

		return {
			number:hasil,
			string:hasilString
		}
	}

	consistIndex(){
		return (this.lambda().number - this.kriteria.length)/(this.kriteria.length - 1)
	}

	consistRasio(){
		return this.consistIndex() / this.indexRandom[this.kriteria.length]
	}

}

class MCDM{

	/**
	 * 
	 * @param {tujuan dari spk} title 
	 * @param {besaran bobot untuk mendeskripsikan kriteria} bobot {
            prilaku:{
                bobot:4,
				type:"cost",
                rating:{
                    kurang:6,
                    baik:7,
                    istimewa:8
                }
            },
            gaji:{
                bobot:3,
				type:"benefit",
                rating:{
                    kurang3:6,
                    k3sampai4:7,
                    lebih4:8
                }
            },
            tanggungan:{
                bobot:3,
				type:"benefit",
                rating:{
                    tidakada:6,
                    k1orang:7,
                    lebih4:8
                }
            }
        } 
	 * @param {*} attribut 
	 */
	constructor(title,component,typeDM = 'saw'){

		this.decisionFix = ["saw","wp","topsis"]
		this.typeDecision = typeDM


		this.countBobot = {}
		this.normalisasi = {}
		this.title = title
		this.component = component

		this.typeFix = ["benefit","cost"]
		this.type = []

		let bobotObj = {}
		let bobotArray = []

		// set bobot
		Object.keys(component).forEach(element => {
			Object.assign(bobotObj,{[element]:{bobot:component[element].bobot,type:component[element].type,rating:component[element].rating}})
			bobotArray.push(component[element].bobot)
		})

		// set type
		Object.keys(component).forEach(element => {
			this.type.push(component[element].type)
		})

		this.bobot = {
			array:bobotArray,
			obj:bobotObj
		}

		this.attribut = {

		}
	}

	getTitle(){
		return this.title
	}

	getType(){
		return this.type
	}

	getBobot(){
		return this.bobot
	}

	setAttribut(...attribut){

		this.attribut = attribut

		let bobot = Object.keys(this.bobot.obj);
		
		// row
		let countRow = 0;
		attribut.forEach(row => {
			let countCol = 0
			let attTypeCol = []

			// periksa panjang dari attribut dan jumlah bobot sama
			if(row.length == this.bobot.array.length){
				row.forEach(col => {
					// set value dan type apakah sudah sesuai dengan rating
					
					countCol++
				});
			}
			countRow++
		});

	}

	getAttribut(){
		return this.attribut;
	}

	/**
	 * membantu normalisasi
	 * 
	 * @param {*} numb 
	 * @param {*} value 
	 * @returns 
	 */
	 benefit(numb,value){
		let numbArray = []
		let nol = 0;
		let turn = 0;
		for (let index = 0; index < value.toString().length; index++) {
			
			if(value.toString()[index] == "0"){
				numbArray[turn] = numbArray[turn].toString() + value.toString().charAt(index)
			}else{
				numbArray[nol] = value.toString().charAt(index)
				turn = nol
				nol++
			}
		}

		let max = Math.max.apply(Math,numbArray);

		return {
			string:numb+"/"+max,
			number:numb / max,
		}
	}

	

	/**
	 * membantu normalisasi
	 * @param {*} numb 
	 * @param {*} value 
	 * @returns 
	 */
	cost(numb,value){
		let numbArray = []
		let nol = 0;
		let turn = 0;

		for (let index = 0; index < value.toString().length; index++) {
			
			if(value.toString()[index] == "0"){
				numbArray[turn] = numbArray[turn].toString() + value.toString().charAt(index)
			}else{
				numbArray[nol] = value.toString().charAt(index)
				turn = nol
				nol++
			}
		}

		let min = Math.min.apply(null,numbArray);

		return {
			string:min+"/"+numb,
			number:min / numb,
		}
	}

	/**
	 * metode saw
	 * count atribut berdasarkan type => benefit dan cost
	 * benefit : numb / max(atribut row)
	 * cost : min(atribut row)/numb
	 */
	normalisasiMatrik(){
		this.normalisasi = {};
		

		if(this.typeDecision){

		}

		let numbNormal=[]
		let strNormal=[]

		if(this.attribut.length == 1){
			for (let row = 0; row < this.attribut[0].length; row++) {
				let normalisasiCol = []
				let normalisasiColString = []
				let value = this.attribut[0][row].toString();
	
				for (let col = 0; col < this.attribut[0][row].length; col++) {
					// periksa jenis tiap bobot
					if(contain(this.typeFix,this.type[col])){
						let t = "this."+this.type[col];
						let a = eval(t+"("+this.attribut[0][row][col]+","+value.replaceAll(',','')+")")
	
						normalisasiCol[col] = a.number
						normalisasiColString[col] = a.string
					}
				}
	
				numbNormal.push(normalisasiCol)
				strNormal.push(normalisasiColString)
			}
		}

		Object.assign(this.normalisasi,{
			number:numbNormal,
			string:strNormal
		})

		return this.normalisasi
	}


	/**
	 * metode saw
	 */
	countBobotMatrik(){
		let bobot = [],bobotStr = []

		// show data normalisasi dan hitung dengan bobot
		for (let row = 0; row < this.normalisasi.number.length; row++) {
			let bobotRow = []
			let bobotString = []
			for (let col = 0; col < this.normalisasi.number[row].length; col++) {
				bobotRow[col] = this.normalisasi.number[row][col] * this.bobot.array[col]
				bobotString[col] = this.normalisasi.number[row][col] +" X "+ this.bobot.array[col]
			}

			bobot.push(bobotRow)
			bobotStr.push(bobotString)
		}

		Object.assign(this.countBobot,{
			number:bobot,
			string:bobotStr
		})

		return this.countBobot
	}

	/**
	 * 
	 * @returns 
	 */
	ranking(){
		let rank = []
		for (let row = 0; row < this.countBobot.number.length; row++) {
			let sumRow = 0
			for (let col = 0; col < this.countBobot.number[row].length; col++) {
				sumRow += this.countBobot.number[row][col]

			}

			rank.push([sumRow]);
			
		}

		return rank;
	}


	/**
	 * metode wp
	 * hitung bobot w (langkah pertama)
	 */
	weightBobot(){
		let str = [],numb = [];
		
		let sumRow = 0
		for (let row = 0; row < this.bobot.array.length; row++) {
			sumRow += parseInt(this.bobot.array[row])
		}

		for (let row = 0; row < this.bobot.array.length; row++) {
			let penghitung = 0;
			if(this.bobot.obj[Object.keys(this.bobot.obj)[row]].type == 'benefit'){
				penghitung = 1
			}else if(this.bobot.obj[Object.keys(this.bobot.obj)[row]].type == 'cost'){
				penghitung = -1
			}

			numb.push([(parseInt(this.bobot.array[row])/sumRow)*penghitung])
			str.push(["("+this.bobot.array[row]+"/"+sumRow+")x"+penghitung])
		}

		return {
			number:numb,
			string:str
		}
	}

	sweightAlternatif(){
		let s = {}

		let str = [],numb = [];

		let weightbobot = this.weightBobot()

		// menghitung pangkat per alternatif
		for (let row = 0; row < this.attribut[0].length; row++) {
			let numbRow = []
			let strRow = []
			for (let col = 0; col < this.attribut[0][row].length; col++) {				
				numbRow[col] = Math.pow(this.attribut[0][row][col],weightbobot.number[col])
				strRow[col] = this.attribut[0][row][col]+"^"+weightbobot.number[col]
				
			}
			
			numb[row] = numbRow
			str[row] = strRow
		}

		Object.assign(s,{number:numb,string:str})

		let hasilKali = []
		let stringKali = []
		// mengalikan tiap baris dari hasil pangkat
		for (let row = 0; row < numb.length; row++) {
			let hasilKaliRow = 1
			let stringKaliRow = ""
			for (let col = 0; col < numb[row].length; col++) {				
				hasilKaliRow *= numb[row][col]
				stringKaliRow += "("+numb[row][col]+")"
			}

			hasilKali.push([hasilKaliRow])
			stringKali.push([stringKaliRow])
		}

		Object.assign(s,{numberHasil:hasilKali,stringHasil:stringKali})

		return s
	}

	/**
	 * menghitung v
	 */
	vweightLast(){
		let sweight = this.sweightAlternatif()

		let str = [],numb = [];

		// jumlah semua hasil sweight
		let hasilsWeight = 0
		for (let row = 0; row < sweight.numberHasil.length; row++) {
			hasilsWeight += parseFloat(sweight.numberHasil[row])
		}

		// hitung vweight berdasarkan sweight[i]/hasilsweight
		for (let row = 0; row < sweight.numberHasil.length; row++) {
			numb.push([parseFloat(sweight.numberHasil[row]) / hasilsWeight]) 

			str.push([sweight.numberHasil[row]+"/"+hasilsWeight]) 
		}

		return{
			number:numb,
			string:str
		}
	}
}

/* sample spk
data = {
	prilaku:{
		bobot:4,
		type:"benefit",
		rating:{
			kurang:6,
			baik:7,
			istimewa:8
		}
	},
	gaji:{
		bobot:3,
		type:"benefit",
		rating:{
			kurang3:6,
			_3sampai4:7,
			lebih4:8
		}
	},
	tanggungan:{
		bobot:3,
		type:"cost",
		rating:{
			tidakada:6,
			_1orang:7,
			lebih4:8
		}
	}
}

saw.setAttribut(
	[data.prilaku.rating.baik,data.gaji.rating.kurang3,data.tanggungan.rating.tidakada],
	[data.prilaku.rating.kurang,data.gaji.rating._3sampai4,data.tanggungan.rating._1orang],
	[data.prilaku.rating.istimewa,data.gaji.rating._3sampai4,data.tanggungan.rating.lebih4],
	[data.prilaku.rating.istimewa,data.gaji.rating._3sampai4,data.tanggungan.rating.lebih4]
)

//console.log(saw.getType())
//console.log(saw.getBobot());
//console.log(saw.getAttribut());

//console.log(saw.countBobot(saw.normalisasi()))

//console.log(saw.countBobot(saw.normalisasi()).numb) */

/* build documentation */
class Documentation{

	constructor(id){
		this.id = id
		this.doc = document.getElementById(id)
		this.url = ''
		this.nameInstance = ''
		this.place = ''
		this.dataHeader = ''

		this.assigment = {}
		/**
		 * key0:value0,
		 * key1:value1,
		 * keyn:valuen
		 */

		this.header = []
		this.data = {}
	}

	createDocument(){
		// head
		try {
			// create head
			let head = document.createElement('div')
			head.setAttribute('class','ds-flex')
			head.setAttribute('id','head-'+this.id)
			this.doc.appendChild(head)

			let headLogo = document.createElement('div')
			headLogo.setAttribute('class','col-25pc txt-center')
			head.appendChild(headLogo)

			let logo = document.createElement('img')
			logo.setAttribute('class','img')
			logo.setAttribute('alt','none')
			logo.setAttribute('src',this.url)
			headLogo.appendChild(logo)
			
			let textHeader = document.createElement('div')
			textHeader.setAttribute('class','txt-center col-70pc')
			head.appendChild(textHeader)

			// create txt header
			let instance = document.createElement('h2')
			instance.innerHTML = this.nameInstance
			instance.innerText = this.nameInstance
			textHeader.appendChild(instance)

			let place = document.createElement('p')
			place.innerHTML = this.place
			place.innerText = this.place
			textHeader.appendChild(place)
			
			let dataHeader = document.createElement('h4')
			dataHeader.innerHTML = this.dataHeader
			dataHeader.innerText = this.dataHeader
			textHeader.appendChild(dataHeader)

			// set pencetak
			let k = Object.keys(this.assigment)

			let divTxt = document.createElement('div')
			divTxt.setAttribute('class','ds-flex')
			

			for (let i = 0; i < k.length; i++) {
				let subDivtxt = document.createElement('span')
				let txt = document.createElement('p')
				txt.innerHTML = k[i]+" "+this.assigment[k[i]]
				subDivtxt.appendChild(txt)

				divTxt.appendChild(subDivtxt)
			}
			this.doc.appendChild(divTxt)


			// table
			let tableDiv = document.createElement('div')
			tableDiv.setAttribute('class','table-responsive mg-top-20px')

			let table = document.createElement('table')
			table.setAttribute('class','table tables')
			table.setAttribute('id','table-'+this.id)
			tableDiv.appendChild(table)

			this.doc.appendChild(tableDiv)

			let datatable = new TableSet('table-'+this.id)
			datatable.header(this.header,this.data)	
		} catch (error) {
			console.log(error)
		}
	}

	createTableToDocument(id){
		// head
		try {
			// create head
			let head = document.createElement('div')
			head.setAttribute('class','ds-flex')
			head.setAttribute('id','head-'+this.id)
			this.doc.appendChild(head)

			let headLogo = document.createElement('div')
			headLogo.setAttribute('class','col-25pc txt-center')
			head.appendChild(headLogo)

			let logo = document.createElement('img')
			logo.setAttribute('class','img')
			logo.setAttribute('alt','none')
			logo.setAttribute('src',this.url)
			headLogo.appendChild(logo)
			
			let textHeader = document.createElement('div')
			textHeader.setAttribute('class','txt-center col-70pc')
			head.appendChild(textHeader)

			// create txt header
			let instance = document.createElement('h2')
			instance.innerHTML = this.nameInstance
			instance.innerText = this.nameInstance
			textHeader.appendChild(instance)

			let place = document.createElement('p')
			place.innerHTML = this.place
			place.innerText = this.place
			textHeader.appendChild(place)
			
			let dataHeader = document.createElement('h4')
			dataHeader.innerHTML = this.dataHeader
			dataHeader.innerText = this.dataHeader
			textHeader.appendChild(dataHeader)

			// set pencetak
			let k = Object.keys(this.assigment)

			let divTxt = document.createElement('div')
			divTxt.setAttribute('class','ds-flex')
			

			for (let i = 0; i < k.length; i++) {
				let subDivtxt = document.createElement('span')
				let txt = document.createElement('p')
				txt.innerHTML = k[i]+" "+this.assigment[k[i]]
				subDivtxt.appendChild(txt)

				divTxt.appendChild(subDivtxt)
			}

			this.doc.appendChild(divTxt)

			// table
			let tableDiv = document.createElement('div')
			tableDiv.setAttribute('class','table-responsive mg-top-20px')

			let table = document.getElementById(id)
			let cln = table.cloneNode(true)

			tableDiv.appendChild(cln)

			this.doc.appendChild(tableDiv)
			
		} catch (error) {
			console.log(error)
		}
	}

	setURLLogo(url){
		this.url = url
	}

	setNameInstance(name){
		this.nameInstance = name
	}

	setPlaceInstance(place){
		this.place = place
	}

	setDataHeader(dataHeader){
		this.dataHeader = dataHeader
	}

	setAssigment(obj){
		Object.assign(this.assigment,obj)
	}

	setTableData(header,data){
		this.header = header
		this.data = data	
	}
}

/* build date with class */
class DateCB{
	dayOfWeekString = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
	monthOfYearString = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

	/**
	 * 
	 * @param {*} date = type string example: 1996-12-12, 1996-11-10 etc
	 */
	constructor(year,month = 0,day = 0){
		this.year = year;
		this.month = month;
		this.day = day;
		this.date = new Date(year,month,day);
	}

	getMonthString(){
		let monthString = "";
		for(let m in this.monthOfYearString){
			if(m == this.date.getMonth()){
				monthString = this.monthOfYearString[m]
			}
		}

		return monthString;
	}

	setDayString(year,month,day){
		this.date = new Date(year,month,day);
	}

	getDayString(){
		let dayString = "";
		for(let m in this.dayOfWeekString){
			if(m == this.date.getDay()){
				dayString = this.dayOfWeekString[m]
			}
		}
		
		return dayString;
	}

	/**
	 * get semua hari di persatu bulan,
	 * 
	 */
	getAllDayOfMonth(){
		let newDate = new Date(this.year,this.month + 1,0);
		
		let lastDay = newDate.getDate();
		let dayArray = [];

		for (let index = 0; index < lastDay; index++) {
			this.date = new Date(this.year,this.month,index + 1);


			dayArray[index] = this.getDayString();
		}

		return dayArray;
	}

	/**
	 * get semua hari di persatu tahun,
	 * 
	 */
	getAllDayOfYear(){
		let monthObject = {};
		let monthArray = [];
		let dayArray = [];
		for (let indexMonth = 0; indexMonth < this.monthOfYearString.length; indexMonth++) {
			let newDate = new Date(this.year,indexMonth + 1,0);
		
			let lastDay = newDate.getDate();
			dayArray = [];

			for (let index = 0; index < lastDay; index++) {
				this.date = new Date(this.year,indexMonth,index + 1);

				dayArray[index] = this.getDayString();
			}	
			monthArray.push(dayArray);
			Object.assign(monthObject,{[this.monthOfYearString[indexMonth]]:dayArray})
		}

		return {
			array:monthArray,
			object:monthObject
		}
	}
}

function CalenderCB(id,date = {}){
	this.id = document.getElementById(id)
	this.date = date;

	/**
	 * 
	 * @param {*} start = start date, object{ year:1999,month: 9,day:7}
	 * @param {*} finish = end date, object{ year:1999,month: 9,day:7} default :unlimited
	 */
	this.setIntervalDate = function(start,finish = "unlimited"){
		this.date = new DateCB(start.year,start.month,start.day)
	}
	
	this.yearCalender = function(){
		// create header
		let divYear = document.createElement("div");
		divYear.setAttribute("class","txt-center");
		divYear.innerHTML = "<h3>"+this.date.year+"</h3>"

		this.id.append(divYear);

		// create month
		let divMonth = document.createElement("div");
		divMonth.setAttribute("class","box-list txt-center");
		divMonth.setAttribute("show","3");

		this.id.append(divMonth);
		// subMonth
		for(i=0;i < this.date.getAllDayOfYear().array.length;i++){
			let divSub = document.createElement("div");
			divSub.setAttribute("class","bd-shadow");
			divSub.innerHTML = "<h4>"+this.date.monthOfYearString[i]+"</h4>"

			divMonth.append(divSub);

			// subsubMont
			let divTanggal = document.createElement("div");
			divTanggal.setAttribute("class","box-list txt-center");
			divTanggal.setAttribute("show","7");

			divSub.append(divTanggal)

			// create tanggal per bulan
			for (let j = 0; j < this.date.getAllDayOfYear().array[i].length; j++) {
				let divSubTanggal = document.createElement("div");
				divSubTanggal.setAttribute("class","bd-shadow");
				divSubTanggal.setAttribute("id",this.date.monthOfYearString[i]+(j+1));
				divSubTanggal.innerHTML = "<p class='c-black txt-deco-none fs-12px f-bold'>"+(j+1)+"</p>"+"<sub class=fs-9px>"+this.date.getAllDayOfYear().array[i][j]+"</sub>"

				divTanggal.append(divSubTanggal);
				
			}
		}

		// set div button
		let divButton = document.createElement("div");
		divButton.setAttribute("class","ds-flex jc-space-between")
		let button = document.createElement("button");
		button.setAttribute("class","btn-sm btn-green");
		button.setAttribute("type","button");
		button.innerHTML = "Sebelumnya";
		divButton.append(button);

		button = document.createElement("button");
		button.setAttribute("class","btn-sm btn-green");
		button.setAttribute("type","button");
		button.innerHTML = "Selanjutnya";
		divButton.append(button);

		this.id.append(divButton);		
	}

	this.monthCalender = function(){
		
		// subMont
		let divMonth = document.createElement('div')
		divMonth.setAttribute("class","txt-center");
		divMonth.innerHTML = "<h3>"+this.date.getMonthString()+" "+this.date.year+"</h3>"
		this.id.append(divMonth)

		let divTanggal = document.createElement("div");
		divTanggal.setAttribute("class","box-list txt-center");
		divTanggal.setAttribute("show","7");

		this.id.append(divTanggal)

		// create tanggal per bulan
		for (let j = 0; j < this.date.getAllDayOfMonth().length; j++) {
			let divSubTanggal = document.createElement("div");
			divSubTanggal.setAttribute("class","bd-shadow");
			divSubTanggal.setAttribute("id",this.date.getAllDayOfMonth()[j]);
			divSubTanggal.innerHTML = "<p class='c-black txt-deco-none fs-12px f-bold'>"+(j+1)+"</p>"+"<sub class=fs-9px>"+this.date.getAllDayOfMonth()[j]+"</sub>"

			divTanggal.append(divSubTanggal);	
		}

		// set div button
		let divButton = document.createElement("div");
		divButton.setAttribute("class","ds-flex jc-space-between")

		let buttonSebelumnya = document.createElement("button");
		buttonSebelumnya.setAttribute("class","btn-sm btn-green");
		buttonSebelumnya.setAttribute("type","button");
		buttonSebelumnya.innerHTML = "Sebelumnya";

		buttonSebelumnya.onclick = function(){
			console.log(divMonth)
		}

		divButton.append(buttonSebelumnya);

		let buttonSelanjutnya = document.createElement("button");
		buttonSelanjutnya.setAttribute("class","btn-sm btn-green");
		buttonSelanjutnya.setAttribute("type","button");
		buttonSelanjutnya.innerHTML = "Selanjutnya";

		buttonSelanjutnya.onclick = function(){
			
		}

		divButton.append(buttonSelanjutnya);

		this.id.append(divButton);		
	}

	
	/**
	 * menandai tanggal tertentu
	 * @param {*} date -> {day:9,month:2:year:1996}
	 * @param {*} color 
	 */
	this.choiceDate = function(date,color){
		// abaikan saja tahunnya(karena hanya mengambil data bulannya dan tanggalnya saja)
		
		try {
			let da = new DateCB(date.year,date.month,date.day)

			let bulan = da.monthOfYearString[date.month - 1]
			let tanggal = date.day

			let dateButton = document.getElementById(bulan.toString()+tanggal.toString());

			dateButton.setAttribute('class',dateButton.getAttribute('class')+" "+color)	
		} catch (error) {
			console.log(error)
		}

	}

}

/*
	create table

*/
function TableSet(parent){
	this.id = document.getElementById(parent);
	
	/*
	* column = ['nama','ttl','title'= ['non akademik','akademik'],'Jenis Kelamin']
	* body = {data, max, page }
	*/
	this.header = function(column,body = null,no = true,paging = {show:false,url:{},style:{"background-color":"blue","color":"white"}}){
		let value;
		let component = [];
		let head = document.createElement('thead');
		let tr = document.createElement("tr");

		if(no){
			let col = document.createElement('th');
			col.innerHTML = "No";

			component.push(col);
			tr.appendChild(col);
		}

		let rowTrue = 0;

		let i = 0;

		// set first column
		while(i <  column.length){
			col = document.createElement("th");
			
			// check 
			if(catString(':',column[i]).length > 1){
				col.innerHTML = catString(':',column[i])[0];
				col.setAttribute("r","none");
				col.setAttribute("val",catString(':',column[i])[1]);
				rowTrue++;
			}else{
				col.innerHTML = column[i];
			}
			

			tr.appendChild(col);
			component.push(col);

			head.appendChild(tr);

			i++;
		}

		// rowspan
		if(rowTrue){
			tr = document.createElement('tr')
			com = component.length - rowTrue;
			for(j=0;j < component.length;j++){
				// jumlah kolom
				if(component[j].getAttribute("r") != "none"){
					component[j].setAttribute("rowspan","2");
				}else{
					subkolom = catString('+',component[j].getAttribute("val"));
					component[j].setAttribute("colspan",subkolom.length);

					for(s in subkolom){
						col = document.createElement("th");
					
						col.innerHTML = subkolom[s];

						tr.appendChild(col);
						head.appendChild(tr);
					}
				}
			}
		}

		// body
		try {
			this.id.appendChild(head);

			if(typeof body == 'object'){
				total = this.body(body['data'],body['max'],body['page'],body.text_null,no);

				value = {
					header:component,
					total_row:total['total_row'],
					body:total['body']
				}

				if(value['total_row'] == 0 || isNaN(value['total_row'])){
					value['body'][0].setAttribute('colspan',value['header'].length + 1);
				}
			}else{
				value = {
					header:component,
					total_row:0
				}

				if(value['total_row'] == 0 || value['total_row'] == Number.NaN){
					value['body'][0].setAttribute('colspan',value['header'].length + 1);
				}else{
					console.log(Number.NaN);
				}
			}

			// set paging
			if(paging['show'] == true){
				let createPaging = document.createElement('div');
				createPaging.setAttribute('class','paging');

				for (let index = 0; index < value.total_row; index++) {
					let span = document.createElement('span');

					span.innerHTML = index+1;

					// style
					for (let indexSpan = 0; indexSpan < Object.keys(paging.style).length; indexSpan++) {
						span.style[Object.keys(paging.style)[indexSpan]] = paging.style[Object.keys(paging.style)[indexSpan]]
						span.style.cursor = "pointer"
					} 

					// selected paging style
					if(index+1 == body.page){
						span.style.backgroundColor = "green"
					}

					span.onclick = function(){
						onLocation('')
					}

					createPaging.appendChild(span);
				}
				
				this.id.parentElement.appendChild(createPaging);
			}			
		} catch (ex) {
			console.error(ex)
		}


		return value;
	}

	/**
	 * data = [[1,2,3,4],[5,6,7,8]]
	 * max = max value per page
	 * page = page halaman
	 * 
	 * return value = {
			body:component,
			total_row:totalPage,
			total_data:total,
			text_null:"data not found"
		}
	 */
	this.body = function(data,max = 'no',page=1,text="Data not found",no=true){
		let value;

		// init save component td
		let component = [];
		let bod = document.createElement('tbody');
		let total = data.length;
		max = (max == 'no' || max == 0)?total:max;

		let totalPage = Math.ceil(total / max);

		let firstValue = (page - 1)  * max;
		let lastValue = (firstValue + max) > data.length?data.length:(firstValue + max);

		// check value total
		if(total == 0){
			let td = document.createElement('td');
			td.innerHTML = text;

			component.push(td);

			bod.appendChild(td);
		}else{
			for (let row = firstValue; row < lastValue; row++) {
				let tr = document.createElement('tr');
	
				bod.appendChild(tr);

				if(no){
					let no = document.createElement('td');
					no.innerHTML = row+1;
		
					tr.appendChild(no);
				}
				for (let col = 0; col < data[row].length; col++) {
					let td = document.createElement('td');
					td.innerHTML = data[row][col];
	
					tr.appendChild(td);

					component.push(tr);
				}
			}
		}	

		this.id.appendChild(bod);

		value = {
			body:component,
			total_row:totalPage,
			total_data:total,
			text_null:text
		}

		return value;
	}
}

/* create component input */
function Input(parent){
	this.id = document.getElementById(parent);
	this.form = document.createElement('form');

	/*
	set input type from form

	* type {
		nama:["input.label","type:text.class:control-sm.placeholder:Masukan Data"]
		tanggal_lahir:["input.label","type:date.class:control-sm"]
		alamat:["textarea.label","class:control-sm.placeholder:Masukan Alamat"]
		jenis_kelamin:["select.label","class:control-sm","p:perempuan.l:laki-laki"]
		hobi:["input.label","class:choice",['berenang:berenang','olahraga:Olahraga']]
		jabatan:["radio.label","class:choice",['manager:Manager','admin:Admin']]
	}
	*/
	
	this.typeInput = function(type,update = Array()){
		// var
		let components = {};

		// atribut
		let component;

		// set type and create element
		for (key in type){
			let attribut = catString('.',type[key][1]);
			let le = catString('.',type[key][0]);
			let label;
			let comp;
			
			let specition;

			// check length type key > 2
			if(type[key].length > 2){

				let boundary;
				comp = [];

				if(le.length > 1){
					label = document.createElement("label");
					label.innerHTML = le[1];

					comp.push(label);
				}
				
				// check type input select
				if(le[0] == 'select'){
					// menambahkan label

					boundary = document.createElement(le[0]);
					boundary.setAttribute("name",key);

					// create option from select
					for(c in type[key][2]){
						component = document.createElement("option");
						component.setAttribute("value",c);
						component.innerHTML = type[key][2][c];
	
						boundary.appendChild(component);
					}

					// set attribut
					for(att in attribut){
						specition = catString(':',attribut[att]);
						boundary.setAttribute(specition[0],specition[1]);
					}

				// check type input anythink
				}else{

					for(c in type[key][2]){
						boundary = document.createElement('span');
						let dos = document.createElement('label');

						// membuat element berdasarkan type input
						component = document.createElement(le[0]);

						component.setAttribute("name",key+'[]');
						component.setAttribute("value",c);

						// set attribut
						for(att in attribut){
							dos.innerHTML = type[key][2][c];

							specition = catString(':',attribut[att]);
							
							component.text = type[key][2][c];
							component.setAttribute(specition[0],specition[1]);

						}
						
						boundary.appendChild(component);
						boundary.appendChild(dos);
					}
				}

				comp.push(boundary);
				Object.assign(components,{[key]:comp});
			}else{
				comp = [];
				if(le.length > 1){
					label = document.createElement("label");
					label.innerHTML = le[1];

					comp.push(label);
				}

				component = document.createElement(le[0]);
				component.setAttribute("name",key);

				// set attribut
				for(att in attribut){
					specition = catString(':',attribut[att]);
					component.setAttribute(specition[0],specition[1]);
				}

				comp.push(component);
				Object.assign(components,{[key]:comp});
			}
		}

		return components;
	}

	/*
	create input with another element as close
	* type = function typeInput as set input
	* action = location form input
	* method = post or get
	* element = a close inputs. sample:
		div:class= form-group
	* ...option = another attribute. sample: 
		name:value
	*/
	this.create = function(element,action,method,type,...option){
		this.id.appendChild(this.form);
		this.form.setAttribute('action',action);
		this.form.setAttribute('method',method);
		
		option.forEach(element => {
			this.form.setAttribute(catString(':',element)[0],catString(':',element)[1]);
		});

		if(element == ""){
			for (key in type) {
				this.form.appendChild(type[key]);
			}
		}else{
			for (key in type) {
				let el = catString(":",element);

				let tag = document.createElement(el[0]);
				let classes = catString("=",el[1]);

				tag.setAttribute(classes[0],classes[1]);

				for(key1 in type[key]){
					tag.appendChild(type[key][key1])
				}
				
				this.form.appendChild(tag);
			}
		}
	}

	/*
	update input with another element as close
	* action = location form input
	* method = post or get
	* optionType = update inputs. sample:
	*/
	this.update = function(action,method,...optionType){
		this.form.setAttribute('action',action);
		this.form.setAttribute('method',method);

		optionType.forEach(element => {
			
		});
	}
}


// class html komponen 
// function position elementCustom() and element(stack,push)
function Component(elements,parent) {
	this.parent = document.getElementById(parent);

	this.element = function(type) {
		let el = [];
		for (let index = 0; index < elements.length; index++) {
			el.push(document.createElement(elements[index]));
		}

		if(type === 'stack'){
			for (let index = 0; index < el.length; index++) {
				if (index < el.length - 1) {
					el[index].appendChild(el[index + 1]);				
				}
			}

			this.parent.appendChild(el[0]);
		}else if(type === 'push'){
			for (let index = 0; index < el.length; index++) {
				this.parent.appendChild(el[index]);
			}
		}

		return el;
	};

	// custom
	this.elementCustom = function(kurva,kurvaPoint) {
		let el = [];
		for (let index = 0; index < elements.length; index++) {
			el.push(document.createElement(elements[index]));
		}

		// set kurva
		let turn = 0;
		let count = 1;
		
		for (let index = 1; index < el.length; index++) {

			if(contain(kurva,index)){
				el[kurvaPoint[count - 1]].appendChild(el[kurva[count - 1]]);

				turn = index;
				count++;
			}else{
				el[turn - 1].appendChild(el[index]);
			}
		}

		this.parent.appendChild(el[0]);

		return el;
	};

	/**
	 * 
	 * @param {*} param0 
	 */
	this.elementCustomv2 = function(kurvaParent,kurvaChild){
		let el = [];
		for (let index = 0; index < elements.length; index++) {
			el.push(document.createElement(elements[index]));
		}

		if(kurvaParent.length == kurvaChild.length){
			
			for (let index = 0; index < kurvaParent.length; index++) {

				if(contain(kurvaChild,index)){
					el[kurvaParent[index]].appendChild(el[kurvaChild[index]]);

					//this.parent.appendChild()
				}else{

				}
			}
		}else{
			console.log("array length not same");
		}
	}

	this.setAttributes = function(atts,element){
        for (att in atts) {
			element.setAttribute(att,atts[att]);
		}
	}

	this.clone = function(add,needleElement){
		for (let index = 0; index < add; index++) {
			let elementClone = document.createElement(elements[needleElement]);

			this.parent.appendChild(elementClone);
		}
	}
	
}

function Clone(type,element){
	this.id = document.getElementById(type);
	this.class = document.getElementsByClassName(type);

	/**
	 * 
	 * @param {*} add banyak clone
	 * @param {*} att 
	 */
	this.createWithId = function (add,att){
		let e;
		for (let index = 0; index < add; index++) {
			e = document.createElement(element);

			for (att in atts) {
				element.setAttribute(att,atts[att]);
			}
			
			this.id.appendChild(e);
		}
	}

	this.createWithClass = function (add,needle){
		let e;
		for (let index = 0; index < add; index++) {
			e = document.createElement(element);
			
			this.class[needle].appendChild(e);
		}
	}

}

/* sample
let body = new Component(['table','thead','tbody'],'body');
body.element('push'); or body.element('stack');

body.elementCustom([pointstart],[pointindux])

body.setAttributes('')

*/

/*
let cn = can.getContext('2d')
cn.fillStyle = "#FF0000"
cn.fillRect(5,6,10,10)

let css = btn.classList
let selector = document.querySelectorAll("."+css[0])
*/



/**
 * icon dengan canvas
 */
class DrawingCanvas{

	constructor(){

	}
}


let canvas = document.getElementsByClassName("icc-white")
let canvasBlack = document.getElementsByClassName("icc-black")

// canvas white
for (let index = 0; index < canvas.length; index++) {
	// create canvas
	let can = document.createElement('canvas')

	let width = canvas[index].clientWidth == 0 ? 20: canvas[index].clientWidth;
	let height = canvas[index].clientHeight == 0 ? 20: canvas[index].clientHeight;

	can.setAttribute('height',height)
	can.setAttribute('width',width)
	
	let cn = can.getContext('2d')
	console.log(cn)

	cn.fillStyle = "#00FFFF"
	cn.arc(5,5,10,10,3,6,true)

	canvas[index].appendChild(can)
}

// canvas black
for (let index = 0; index < canvasBlack.length; index++) {
	// create canvas
	let can = document.createElement('canvas')

	let width = canvasBlack[index].clientWidth == 0 ? 20: canvasBlack[index].clientWidth;
	let height = canvasBlack[index].clientHeight == 0 ? 20: canvasBlack[index].clientHeight;

	can.setAttribute('height',height)
	can.setAttribute('width',width)
	
	let cn = can.getContext('2d')

	cn.fillStyle = "#000000"
	cn.fillRect(5,6,10,10)

	cn.fillStyle = "#00FFFF"
	cn.arc(5,5,10,10,3,6,true)

	canvasBlack[index].appendChild(can)
}


function WordPad(id,id_target) {
	this.objComp = {
		Text:{
			array:['bold','italic','underline','heading','sup','sub'],
			text:['<b>B</b>','<i>I</i>','<u>U</u>','<h1>H<sub>1</sub></h1>','X<sup class="c-blue">2</sup>','X<sub class="c-blue">2</sub>'],
			click:[
				// bold
				function(target){
					target.innerHTML = "<b></b>"
				},
				// italic
				function(target){
					target.innerHTML = "<i></i>"
				}
				,
				// underline
				function(target){
					target.innerHTML = "<u></u>"
				},
				// h
				function(target){
					target.innerHTML = "<h1></h1>"
				},
				// sup
				function(target){
					target.innerHTML = "<sup></sup>"
				},
				// sub
				function(target){
					target.innerHTML = "<sub></sub>"
				}]
		},

		Paragraf:{
			array:['tambahParagraf',"rataKanan","rataTengah","rataKiri","rataKananKiri"],
			text:['+',"<b>-</b>--<br><b>-</b>--","-<b>-</b>-<br>-<b>-</b>-","--<b>-</b><br>--<b>-</b>","<b>-</b>-<b>-</b><br><b>-</b>-<b>-</b>"],
			click:[
				// +
				function(target){
					target.innerHTML = "<b></b>"
				},
				// kanan
				function(target){
					target.innerHTML = "<i></i>"
				}
				,
				// tengah
				function(target){
					target.innerHTML = "<u></u>"
				},
				// kiri
				function(target){
					target.innerHTML = "<h1></h1>"
				},
				// kanan kiri
				function(target){
					target.innerHTML = "<sup></sup>"
				}]
		},

		Gambar:{
			array:['tambahGambar',"fullGambar","HalfGambar","QuartGambar","CustomGambar"],
			text:['+',"F<sub>2</sub>","H<sub>2</sub>","Q<sub>2</sub>","C<sub>2</sub>"],
			click:[
				// +
				function(target){
					target.innerHTML = "<img src=''>"
				},
				// full
				function(target){
					target.innerHTML = "<i></i>"
				}
				,
				// half
				function(target){
					target.innerHTML = "<u></u>"
				},
				// Quart
				function(target){
					target.innerHTML = "<h1></h1>"
				},
				// Cust
				function(target){
					target.innerHTML = "<h1></h1>"
				}]
		},

		Spasi:{
			array:['margin-top','margin-left','margin-bottom','margin-right','margin-custom'],
			text:['M-<sub>top</sub>','M-<sub>left</sub>','M-<sub>bot</sub>','M-<sub>right</sub>','M-<sub>cust</sub>'],
			click:[
				// top
				function(target){
					target.innerHTML = "<img src=''>"
				},
				// left
				function(target){
					target.innerHTML = "<i></i>"
				}
				,
				// bottom
				function(target){
					target.innerHTML = "<u></u>"
				},
				// right
				function(target){
					target.innerHTML = "<h1></h1>"
				},
				// Cust
				function(target){
					target.innerHTML = "<h1></h1>"
				}]
		}
	}
	this.component = ['Text','Paragraf',"Gambar","Spasi"]

	this.id = document.getElementById(id)

	this.createWordpad = function(){
		this.id.setAttribute('class','box-list mg-top-10px txt-center bd-1px')

		// create berdasarkan komponent
		for (let index = 0; index < this.component.length; index++) {
			let div = document.createElement('div')
			
			div.innerHTML = "<h4 class='bd-thin'>"+this.component[index]+"</h4>"

			let subDiv  = document.createElement('div')
			subDiv.setAttribute('class','box-list height-5em')
			subDiv.setAttribute("id",this.component[index])

			div.appendChild(subDiv)

			this.id.appendChild(div)
		}
	}

	this.createButton = function(){
		let target = document.getElementById(id_target)
		// out komponent
		for (let index = 0; index < Object.keys(this.objComp).length; index++) {
			let key = Object.keys(this.objComp)[index]
			let value = this.objComp[key]
			let div = this.id.querySelector("#"+key)

			// out value text or array
			for (let ival = 0; ival < value.text.length; ival++){
				let subdiv = document.createElement('div')

				let btn = document.createElement('button')
				btn.setAttribute("type","button")
				btn.setAttribute("class","max-width max-height no-bd bg-whitesmoke")
				btn.innerHTML = value.text[ival]

				btn.onclick = function(){
					value.click[ival](target)
				}

				subdiv.appendChild(btn)

				div.appendChild(subdiv)
			}

		}
	}
}

