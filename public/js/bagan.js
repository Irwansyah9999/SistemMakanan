
function bagan(id){
    try {
        let can = document.createElement('canvas')

        let width = document.getElementById(id).clientWidth
        let height = document.getElementById(id).clientHeight == 0? 300:height

        can.setAttribute('height',height)
        can.setAttribute('width',width)
        
        let cn = can.getContext('2d')

        let padding = 10

        // create boundary
        cn.strokeStyle = 'whitesmoke'
        cn.strokeRect(0,0,width,height)

        // create line
        cn.beginPath()
        cn.moveTo(0+padding,0+padding)
        cn.lineTo(0+padding,height+padding)
        cn.stroke()

        // append
        document.getElementById(id).appendChild(can)   
    } catch (error) {
        
    }
}

function Bagan(id,data){
    this.id = document.getElementById(id)
    this.boundary = {width:0,height:0,color:'whitesmoke'}
    this.padding = {left:0,bottom:0,right:0,top:0}

    this.setBoundary = function(width,height,color='whitesmoke'){
        this.boundary.width = width
        this.boundary.height = height
        this.boundary.color = color
    }

    this.setPadding = function(left,bottom,right = left,top=bottom){
        this.padding.left = left
        this.padding.bottom = bottom
        this.padding.right = right
        this.padding.top = top
    }

    this.createBatang = function(){
        let can = document.createElement('canvas')

        can.setAttribute('height',this.boundary.height)
        can.setAttribute('width',this.boundary.width)
        
        let cn = can.getContext('2d')

        // create boundary
        cn.strokeStyle = this.boundary.color
        cn.strokeRect(0,0,this.boundary.width,this.boundary.height)

        // 
        let padLeft = this.padding.left
        let padBottom = this.padding.bottom
        let padRight = this.padding.right
        let padTop = this.padding.top

        // create line 
        cn.beginPath()
        cn.moveTo(0+padding,0+padding)
        cn.lineTo(0+padding,height+padding)
        cn.stroke()

        // append
        document.getElementById(id).appendChild(can)
    }
}
