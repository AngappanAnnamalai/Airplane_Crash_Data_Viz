/// <reference path="./Intellisense/p5.global-mode.d.ts" />

var table
var wwidth = 1920*3
var hheight = 1080*3
var wwwidth = window.innerWidth
var hhheight = window.innerHeight
var myarray = []
var overLapping = false
var protection = 0
var length = 1
var color1
var popup = false
var value = 0.05 

function preload() {
    table = loadTable('./Data_V1.2.csv', 'csv', 'header')
}

function setup() {
    createCanvas(wwidth, hheight)
    background(25)

    for(let i = 0; i < table.getRowCount(); i++) {  
        console.log('CALCULATING FOR',table.get(i, 5), table.get(i, 0))
        calculate(table.get(i, 5), table.get(i, 0))

    }

    drawCircle()
}

function draw() {

}

function calculate(size, tempId) {
    console.log('CALCULATING STARTED SIZE', size)
    let range = [100, 140, 180, 220, 260, 300]

    if(size > 0 && size < 50) {
        size = range[0]
        color1 = '#61BB46'
    }
    else if(size >= 50 && size <100) {
        size = range[1]
        color1 = '#FDB827'
    }
    else if(size >= 100 && size <150) {
        size = range[2]
        color1 = '#F5821F'
    }else if(size >= 150 && size <200) {
        size = range[3]
        color1 = '#E03A3E'
    }
    else if(size >= 200 && size <250) {
        size = range[4]
        color1 = '#963D97'
    }
    else if(size >= 250) {
        size = range[5]
        color1 = '#009DDC'
    }
    else {
        size = 0
    }

    console.log('CALCULATING MID SIZE CHECK', size)
    
    while(myarray.length < 83) {
        console.log('CALCULATING MID 2 SIZE CHECK', size)
        var mycircle = {
            x: random(300, wwidth-300),
            y: random(300, hheight-300),
            r: size/1.25,
            mycolor: color1,
            id1: tempId
        }

        var overLapping = false
        console.log('CALCULATING ID CHECK', mycircle.id1)

        // protection = 0
        var overLapping = false
        for(var j = 0; j < myarray.length; j++) {
            var other = myarray[j];
            console.log('INSIDE LOOP FOR OVERLAP CHECK', overLapping)
            var d = dist(mycircle.x, mycircle.y, other.x, other.y);
            if(d < mycircle.r + other.r && myarray.length <= 83) {
                console.log('INSIDE CONDITIONAL LOOP FOR OVERLAP CHECK', overLapping)
                overLapping = true
                console.log('broken')
                break
            }
        }

        if(overLapping == false) {
            myarray.push(mycircle)
            console.log('circle - length', length, 'color', mycircle.mycolor, color1, mycircle.id1)
            break
        }

        // protection++

        // if(protection > 1) {
        //     break
        // }
    }
}

function drawCircle() {
    clear()
    popup = false
    createCanvas(wwidth, hheight)
    background(25)
    for(var k = 0; k < myarray.length; k++) {
        fill(myarray[k].mycolor)
        noStroke()
        ellipse(myarray[k].x, myarray[k].y, myarray[k].r, myarray[k].r)
        // console.log('drawing', k, myarray[k].id1)
    }
}

function mousePressed() {
    for(var i = 0; i < myarray.length; i++) {
        if(dist(myarray[i].x, myarray[i].y, mouseX, mouseY) < myarray[i].r && popup == false) {
            console.log('clicked', i, myarray[i].id1)
            displayCard(myarray[i].id1)
        }
        else if(dist(wwwidth-40, 40, mouseX, mouseY) < 20 && popup == true) {
            drawCircle()
            console.log('redrawing')
        }
    }
}

function displayCard(tempId1) {
    popup = true
    console.log('card info', table.getString(tempId1, 4))
    clear()
    createCanvas(wwwidth, hhheight)
    background(25)
    fill(255, 0, 0)
    textSize(35)
    textAlign(CENTER)
    text(table.getString(tempId1, 4), wwwidth/2, hhheight/2)
    textSize(20)
    text(table.getString(tempId1, 1), wwwidth/2, hhheight/2+60)
    text(table.getString(tempId1, 2), wwwidth/2, hhheight/2+90)
    ellipse(wwwidth-40, 40 , 40, 40)
}

function mouseWheel(e) {
    if(e.deltaY>0 && popup == false) {
        push()
        scale(1-value)
        translate(wwidth/20,hheight/20)
        drawCircle()
        pop()
    }
    else if(e.deltaY<0 && popup == false) {
        push()
        scale(1+value)
        translate(0,0)
        drawCircle()
        pop()
    }
}