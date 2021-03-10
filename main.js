/*
 * Conway's Game of Life
 * @author Josh Geden
 */

const app = new Vue ({
    data() {
        return {
            myBoard: [],
            height: 20,
            width: 50,
            updateTime: 500,
            active: '',
        };
    },

    beforeMount() {
        this.initializeBoard();
    },

    mounted() {
    
    },

    methods: {
        restart() {
            // reset variables
            this.stop();
            this.myBoard = [];
            this.updateTime = 500;
            

            this.initializeBoard();
        },

        start() {
            window.clearInterval(this.active);
            this.active = window.setInterval(() => {
                this.updateBoard()
            }, this.updateTime);
        },

        stop() {
            window.clearInterval(this.active);
        },

        initializeBoard() {
            // initialize board with all zeros
            for (let i = 0; i < 100; i++) {
                let row = []
                for (let j = 0; j < 100; j++) {
                    row.push(0);
                }
                this.myBoard.push(row);
            }
            // o x o
            // o o x
            // x x x
            this.$set(this.myBoard[3], 8+4, 1);
            this.$set(this.myBoard[3], 9+4, 1);
            this.$set(this.myBoard[3], 10+4, 1);
            this.$set(this.myBoard[2], 10+4, 1);
            this.$set(this.myBoard[1], 9+4, 1);

            this.$set(this.myBoard[3], 33+4, 1);
            this.$set(this.myBoard[3], 34+4, 1);
            this.$set(this.myBoard[3], 35+4, 1);
            this.$set(this.myBoard[2], 33+4, 1);
            this.$set(this.myBoard[1], 34+4, 1);
        },

        boardClick(x, y) {
            // console.log(`(${x}, ${y})`)
            if (this.myBoard[x][y] === 0) {
                this.$set(this.myBoard[x], y, 1);
            }
            else {
                this.$set(this.myBoard[x], y, 0);
            }
        },

        updateBoard() {
            let result = [];
            for (let i = 0; i < this.height; i++) {
                let row = []
                for (let j = 0; j < this.width; j++) {
                    row.push(this.myBoard[i][j]);
                }
                result.push(row);
            }
            
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    
                    let neighbors = this.countAliveNeighbors(i, j);
                    if (this.myBoard[i][j] === 1) {
                        if (neighbors < 2) {
                            result[i][j] = 0;
                        }
                        else if (neighbors === 2 || neighbors === 3) {
                        result[i][j] = 1;
                        }
                        else if (neighbors > 3) {
                            result[i][j] = 0;
                        }  
                    }
                    else {
                        if (neighbors === 3) {
                            result[i][j] = 1;
                        }
                        else {
                            result[i][j] = 0;
                        }
                    }    
                }
            }
            
            this.myBoard = result;
        },

        countAliveNeighbors(x, y) {
            let count = 0;
            
            if (x-1 >= 0 && y-1 >= 0 && this.myBoard[x-1][y-1] == 1) {
                count++;
            }
            if (x-1 >= 0 && this.myBoard[x-1][y] == 1) {
                count ++;
            }
            if (x-1 >= 0 && y+1 < this.myBoard[x-1].length && this.myBoard[x-1][y+1]==1) {
                count++;
            }
            if (y-1 >= 0 && this.myBoard[x][y-1] == 1) {
                count++;
            }
            if (y+1 < this.myBoard[x].length && this.myBoard[x][y+1] == 1) {
                count++;
            }
            if (x+1 < this.myBoard.length && y-1 >= 0 && this.myBoard[x+1][y-1] == 1) {
                count ++;
            }
            if (x+1 < this.myBoard.length && this.myBoard[x+1][y] == 1) {
                count++;
            }
            if (x+1 < this.myBoard.length && y+1 < this.myBoard[x+1].length && this.myBoard[x+1][y+1] == 1) {
                count++;
            }
            return count;   
        }
    },
});

app.$mount('#app');
