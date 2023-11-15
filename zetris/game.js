"use strict"

//note the large amount of stuff like column = Number(column); this is because for ... in loops return it as a string i cannot take this anymore

const randomIndex = (array) => {
	return array[Math.floor(Math.random() * array.length)];
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

//to make my life a little easier when rotating
class Coordinate {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	rotate(rotations, dir) {
		let tempX = this.x;
		this.x = this.y;
		this.y = tempX;
		switch (Math.abs(quad % 2)) { //what quad its in and what direction true is clockwise so counterclockwise will be coded first
			case 1:
				if (dir) {
					this.y *=1
					return quad - 1;
				} else {
					this.x *= -1;
					return quad + 1;
				}
			case 0:
				if (dir) {
					this.x *= 1
					return quad - 1;
				} else {
					this.y *= -1;
					return quad + 1;
				}
		}
	}
}


const main = () => {
	let canvas = document.querySelector("#gameTarget");
	let ctx = canvas.getContext("2d");
	const bWidth = 10
	const bHeight = 21
	let quad = 1;
	let width = 0;
	let height = 0;


	ctx.fillStyle = "green"

	const menu = () => {
	
	}
	const startGame = () => {
		//setup columns
		let columns = new Array(bWidth).fill(false,0,bWidth);
		for (let column in columns) {
			column = Number(column);
			columns[column] = new Array(bHeight).fill(false,0,bHeight)
		}
		let movingBlocks = new Array(bWidth).fill(false,0,bWidth);
		for (let column in movingBlocks) {
			column = Number(column);
			movingBlocks[column] = new Array(bHeight).fill(false,0,bHeight)
		}

		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//TODO: make this only part of the screen but for now the whole thing can be used
			for (let column in columns) {
				column = Number(column);
				for (let row in columns[column]) {
					row = Number(row);
					if (columns[column][row]) {
						ctx.fillRect(column * 20, row * 20, 20, 20);
					}
				}
			}
		}

		const pause = () => {

		}
		const newBlock = () => {
			const newBlock = randomIndex(blocks);
			width = newBlock[0];
			height = newBlock[1];
			for (let block in newBlock) {
				block = Number(block);
				if (block > 1) {
					if(newBlock[block]) {/*
					ALGORITHM???
					y: (block / width to floor
					*/
						let block2 = block - 2;
						let x = (bWidth / 2) - Math.ceil(width / 2) + (block2 % width)
						let y = Math.floor(block2 / width)
						columns[x][y] = newBlock[block]; //TODO: figure out algorithm to place these
						movingBlocks[x][y] = newBlock[block];
					}
				}
			}
		}
		const doLines = () => {
			//clearing lines and doing scores
		}
		const freezeBlocks = () => {
			movingBlocks = new Array(bWidth).fill(false,0,bWidth);
			for (let column in movingBlocks) {
				column = Number(column);
				movingBlocks[column] = new Array(bHeight).fill(false,0,bHeight)
			}
			doLines();
			newBlock();
		}
		const rotate = (dir) => {
			//counter clockwise: (quadrant 1-4)
			//(+, +), (-, +), (-, -), (+, -)
			//follows x,y,x,y pattern of negatives
			//clockwise is the same but reverse

			//true = clockwise
			//false = counter-clockwise
			if (dir) {
				//returns are not to be used its just so i can break the function as a whole
				//this ones gonna take a lot more work
				/*
				HOW TO ROTATE???
				so if its an odd rotation then invert the y, if its an even rotation invert the x
				----
				. new moving blocks is cropped moving blocks
					. to crop find leftmost piece and get the other side with width, then find bottommost piece and get the other side with height
				. find middle of new moving blocks, rounded to left (down i guess) and top (down probably) no rounding necessary if its these
				. swap y and x around the new axes
				. swap width and height
				*/
				let leftMost = bWidth;
				let topMost = 0;
				//get edges of blocks
				for (let column in movingBlocks) {
					column = Number(column);
					for (let cell in movingBlocks[column]) {
						cell = Number(cell);
						if (movingBlocks[column][cell]) {
							if (column < leftMost) {leftMost = column}
							if (cell > topMost) {topMost = cell}
						}
					}
				}
				//get cropped array
				let movingBlocks2 = []
				for (let i = 0; i < width; i++) {
					movingBlocks2[i] = [];
					for (let j = 0; j < height; j++) {
						movingBlocks2[i][j] = movingBlocks[leftMost + j][topMost + i];
					}
				}


				//find center then
				//convert cropped array to coord objects
				let centerX = Math.ceil(movingBlocks2.length / 2);
				let centerY = Math.ceil(movingBlocks2[0].length / 2);
				let coords = []
				for (let column in movingBlocks2) {
					column = Number(column);

					for (let cell in movingBlocks2[column]) {
						cell = Number(cell);

						coords.push(new Coordinate(column - centerX, cell - centerY))
					}
				}

				//rotate each coord

				for (let coord of coords) {
					coord.rotate(true, quad)
				}

				//turn coord objects back into array


				//check collisions


				//cement in columns and moving objects (this includes clearing moving objects first ya moron)

				quad -= 1;

				const tempwidth = width;
				width = height;
				height = tempwidth;
				render();
				return true;
			} else {
				
			}

			render();
		}
		const collisionDetector = (dir) => {
			//0 = down
			//1 = left
			//2 = right
			//uhhh make switch
			switch (dir) {
				case 0:
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord below is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (block >= bHeight - 1){
									return true;
								}
								if (!movingBlocks[column][block + 1]) {
									if (columns[column][block + 1]) {
										return true;
									}
								}
							}
						}
					}
					return false;
				case 1:
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord to right is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (column <= 0) {
									return true;
								}
								if (!movingBlocks[column - 1][block]) {
									if (columns[column - 1][block]) {
										return true;
									}
								}
							}
						}
					}
					return false;
				case 2:
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord to left is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (column >= bWidth - 1) {
									return true;
								}
								if (!movingBlocks[column + 1][block]) {
									if (columns[column + 1][block]) {
										return true;
									}
								}
							}
						}
					}
					return false;
			}
		}
		const gameTick = () => {
			if (!collisionDetector(0)) {
				//if not collide

				//move moving blocks into a temporary new array, but shifted 1 block down
				//remove moving blocks from real array
				//then new array onto real array
				//then put the temporary one into the moving blocks array and discord the temporary one

				let movingBlocks2 = new Array(bWidth).fill(false,0,bWidth);

				for (let column in movingBlocks2) {
					column = Number(column);
					movingBlocks2[column] = new Array(bHeight).fill(false,0,bHeight)
				}

				//this whole damn thing is because arrays work on references therefore have to be algorithmically cloned
				for (let column in movingBlocks) {
					column = Number(column);
					for (let row in movingBlocks[column]) {
						row = Number(row)
						if (movingBlocks[column][row]) {
							//moving blocks into new array
							movingBlocks2[column][row + 1] = movingBlocks[column][row];

							//remove moving blocks from columns
							columns[column][row] = false;
						}
					}
				}
				for (let column in movingBlocks2) {
					column = Number(column);
					for (let row in movingBlocks2[column]) {
						row = Number(row)

						//put new moving blocks onto columns
						if (movingBlocks2[column][row]) {
							columns[column][row] = movingBlocks2[column][row];
						}
					}
				}	
				//put new moving blocks into real moving blocks
				movingBlocks = movingBlocks2;
				render();
				return false;
			} else {
				movingBlocks = false;
				freezeBlocks();
				render();
				return true;
			}
		}
		const horizontalMove = (dir) => {
			//dir = true is right, false is left
			if (dir) {
				if (!collisionDetector(2)) {
					let movingBlocks2 = new Array(bWidth).fill(false,0,bWidth);

					for (let column in movingBlocks2) {
						column = Number(column);
						movingBlocks2[column] = new Array(bHeight).fill(false,0,bHeight)
					}

					//this whole damn thing is because arrays work on references therefore have to be algorithmically cloned
					for (let column in movingBlocks) {
						column = Number(column);
						for (let row in movingBlocks[column]) {
							row = Number(row)
							if (movingBlocks[column][row]) {
								//moving blocks into new array
								movingBlocks2[column + 1][row] = movingBlocks[column][row];

								//remove moving blocks from columns
								columns[column][row] = false;
							}
						}
					}
					for (let column in movingBlocks2) {
						column = Number(column);
						for (let row in movingBlocks2[column]) {
							row = Number(row)

							//put new moving blocks onto columns
							if (movingBlocks2[column][row]) {
								columns[column][row] = movingBlocks2[column][row];
							}
						}
					}
					movingBlocks = movingBlocks2;
					render();
				}
			} else {
				if (!collisionDetector(1)) {
					let movingBlocks2 = new Array(bWidth).fill(false,0,bWidth);

					for (let column in movingBlocks2) {
						column = Number(column);
						movingBlocks2[column] = new Array(bHeight).fill(false,0,bHeight)
					}

					//this whole damn thing is because arrays work on references therefore have to be algorithmically cloned
					for (let column in movingBlocks) {
						column = Number(column);
						for (let row in movingBlocks[column]) {
							row = Number(row)
							if (movingBlocks[column][row]) {
								//moving blocks into new array
								movingBlocks2[column - 1][row] = movingBlocks[column][row];

								//remove moving blocks from columns
								columns[column][row] = false;
							}
						}
					}
					for (let column in movingBlocks2) {
						column = Number(column);
						for (let row in movingBlocks2[column]) {
							row = Number(row)

							//put new moving blocks onto columns
							if (movingBlocks2[column][row]) {
								columns[column][row] = movingBlocks2[column][row];
							}
						}
					}
					movingBlocks = movingBlocks2;
					render();
				}
			}
		}
		const endGame = () => {

		}
		document.addEventListener("keydown", (e) => {
			switch (e.code) {
				case "KeyA": //a
				case "ArrowLeft": //left
				horizontalMove(false);
				break;

				case "KeyD": //d
				case "ArrowRight": //right
				horizontalMove(true);
				break;

				case "KeyS": //s
				case "ArrowDown": //down
				gameTick();
				break;

				case "Space": //space
				while (!gameTick()) {}
				break;

				case "KeyX": //x
				case "Period": //period
				rotate(true);
				break;

				case "KeyZ": //z
				case "Comma": //comma
				rotate(false);
				break;
			}
		})
		newBlock();
		render();
		let ticks = setInterval(gameTick, 1000)
	}
	startGame() //until menu is made
}
document.addEventListener("DOMContentLoaded", () => {
	main()
})
