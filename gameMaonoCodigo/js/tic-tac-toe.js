const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
        options: ['X', 'O'],
        turn_index: 0,

        change: function(){
            this.turn_index = this.turn_index === 0 ? 1 : 0;
        },

        getSimbol: function(){
            this.change();
            return this.options[this.turn_index];
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init: function(container){
        this.container_element = container;
        
    },

    make_play: function(position){
        if (this.gameover) return false;
        if (this.board[position] === ''){
            this.board[position] = this.symbols.getSimbol();
            this.draw();
            let WSIndex = this.check_winning_sequences(this.board[position]);
            if(WSIndex != -1 ){
                //winner 
                this.stylizewinner(this.winning_sequences[WSIndex]); 
                this.game_is_over();
            }

            return true;
        }
        else{
            return false;
        }

    },

    stylizewinner: function(winner_sequence) {
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
    },

    game_is_over: function(){
        this.gameover = true;
        console.log("GAME OVER");
    },

    start: function(){
        this.board.fill('');

        this.draw();
        this.gameover = false;
    },

    gameBroken: function(){
        return !this.board.includes('');
    },

    restart: function(){
        if(this.gameover || this.gameBroken()) this.start();
        else if(confirm("Are you sure you want to restart this game?")){
            this.start();
        }
    
    },

    check_winning_sequences: function(symbol){
        for( i in this.winning_sequences ){

            if( this.board[ this.winning_sequences[i][0] ] == symbol &&
                this.board[ this.winning_sequences[i][1] ] == symbol &&
                this.board[ this.winning_sequences[i][2] ] == symbol)
            {
                console.log("Sequencia vencedora: " + i);
                return i;
            }

        }

        return -1;
    },

    draw: function(){
        let content = '';

        for(i in this.board){
            content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
        }

        this.container_element.innerHTML = content;
    }

};