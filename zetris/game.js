"use strict"

const randomIndex = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}

const Coordinate = class {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

const blocks = [ //block notation: width, height, t/f for each from top left to bottom right horizontally TODO: load this from json
	//base pieces hardcoded for now
	//rules, centered rounded to left when place, flat side down
	//placement math: width / block width to floor is x, top most row is first row in column array so it doesnt matter too much how to calculate that
	[4, 1, true, true, true, true],
	[2, 2, true, true, true, true],
	[2, 3, true, false, true, false, true, true],
	[2, 3, false, true, false, true, true, true],
	[3, 2, false, true, true, true, true, false],
	[3, 2, true, true, false, false, true, true],
	[3, 2, false, true, false, true, true, true],
];

const main = () => {
	let canvas = document.querySelector("#gameTarget");
	let ctx = canvas.getContext("2d");
	const bWidth = 10
	const bHeight = 21
	const menu = () => {
	
	}
	const startGame = () => {
		const pause = () => {

		}
		const newBlock = () => {
			const newBlock = randomIndex[blocks];
			const width = newBlock[0];
			const height = newBlock[1];
			for (let block in newBlock) {
				if (block > 1) {
					if(newBlock[block]) {
						columns[Math.floor(bWidth / width + block - 2)][Math.floor((block - 2) / height)]
					}
				}
			}
		}
		const freezeBlocks = () => {
			newBlock();
		}
		const rotate = () => {

		}
		const gameTick = () => {

		}
		const endGame = () => {

		}

		let columns = new Array(10).fill(new Array(21).fill(0, 0, 20), 0, 9)
		let movingBlocks = []
	}
	startGame() //until menu is made
}