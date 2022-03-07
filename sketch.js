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
var legCheck = true
// var animate = false
// var anim = 0
// var increase = true
// var decrease = false

function preload() {
    table = loadTable('./Data_V1.2.csv', 'csv', 'header')
    calibre = loadFont('./Calibre-Medium.ttf')
    arrowImg = loadImage('./Arrow_V1.0-01.png')
}

function setup() {
    textFont(calibre)

    legend()
    if(legCheck == false) {
        calciDraw()
    }
}

function legend() {
    createCanvas(wwwidth, hhheight)
    background(25)
    fill(255)
    textSize(45)
    textAlign(CENTER)
    text('Airplane Crash Data', wwwidth/2, hhheight/5)
    textSize(30)
    text('Use arrow keys to navigate', wwwidth/2.2, hhheight/2.7)
    text('Hover over the circles to learn more', wwwidth/2, hhheight/2)
    text('Click on a circle to get further details', wwwidth/2, hhheight/1.7)
    imageMode(CENTER)
    image(arrowImg, wwwidth/1.55, hhheight/2.9, 1080/10, 732/10)
    textSize(25)
    text('Go', wwwidth/2, hhheight-93)
    stroke(255)
    strokeWeight(2)
    noFill()
    ellipseMode(CENTER)
    ellipse(wwwidth/2, hhheight-100, 50, 50)
}

function calciDraw() {
    for(let i = 0; i < table.getRowCount(); i++) {  
        console.log('CALCULATING FOR',table.get(i, 5), table.get(i, 0))
        calculate(table.get(i, 5), table.get(i, 0))
    }
    drawCircle()
    window.scrollTo(wwidth/2, hheight/2)
    legCheck = false
}

function draw() {
    // if (animate == true) {
    //     clear()
    //     ellipseMode(CENTER)
    //     popup = false
    //     createCanvas(wwidth, hheight)
    //     background(25)
    //     for(var k = 0; k < myarray.length; k++) {
    //         fill(myarray[k].mycolor)
    //         noStroke()
    //         ellipse(myarray[k].x, myarray[k].y, myarray[k].r+random(0,2.5), myarray[k].r+random(0,4,1))
    //     }
    // }
}

function calculate(size, tempId) {
    console.log('CALCULATING STARTED SIZE', size)
    let range = [140, 170, 200, 230, 260, 300]

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
            r: size/1.2,
            mycolor: color1,
            id1: tempId
        }

        var overLapping = false
        console.log('CALCULATING ID CHECK', mycircle.id1)

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
    ellipseMode(CENTER)
    popup = false
    createCanvas(wwidth, hheight)
    background(25)
    for(var k = 0; k < myarray.length; k++) {
        fill(myarray[k].mycolor)
        noStroke()
        ellipse(myarray[k].x, myarray[k].y, myarray[k].r, myarray[k].r)
        // console.log('drawing', k, myarray[k].id1)
    }
    animate = true
}

function mousePressed() {
    for(var i = 0; i < myarray.length; i++) {
        if(dist(myarray[i].x, myarray[i].y, mouseX, mouseY) < myarray[i].r && popup == false && legCheck == false) {
            console.log('clicked', i, myarray[i].id1)
            displayCard(myarray[i].id1)
        }
        else if(dist(wwwidth-40, 40, mouseX, mouseY) < 20 && popup == true && legCheck == false) {
            drawCircle()
            console.log('redrawing')
        }
    }
    if(dist(wwwidth/2, hhheight-100, mouseX, mouseY) < 50 && legCheck == true) {
        calciDraw()
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
    window.scrollTo(0, 0)
}

// function mouseWheel(e) {
//     if(e.deltaY>0 && popup == false) {
//         push()
//         scale(1-value)
//         translate(wwidth/20,hheight/20)
//         drawCircle()
//         pop()
//     }
//     else if(e.deltaY<0 && popup == false) {
//         push()
//         scale(1+value)
//         translate(0,0)
//         drawCircle()
//         pop()
//     }
// }

function mouseMoved(e) {
    console.log(mouseX, mouseY)
    for(var i = 0; i < myarray.length; i++) {
        if(dist(myarray[i].x, myarray[i].y, mouseX, mouseY) < myarray[i].r/2 && popup == false) {
            drawCircle()
            fill(myarray[i].mycolor)
            ellipse(myarray[i].x, myarray[i].y, myarray[i].r*2, myarray[i].r*2)
            fill(255)
            textSize(20)
            textAlign(CENTER)
            text(table.get(i, 4), myarray[i].x - (myarray[i].r/1.4), myarray[i].y-myarray[i].r/6, myarray[i].r*1.5)
        }
    }
}
