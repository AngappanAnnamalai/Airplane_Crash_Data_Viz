/// <reference path="./Intellisense/p5.global-mode.d.ts" />

var table
var wwidth = window.innerWidth
var hheight = window.innerHeight


function preload() {
    table = loadTable('./Data_V1.0.csv', 'csv', 'header')
}

function setup() {
    console.log(table)
    console.log(table.get(0,1))

    createCanvas(wwidth, hheight)
}

function draw() {
    background(222)
    rectMode(CENTER)
    rect(wwidth/2, hheight/2, 100, 100)
}

