document.getElementById('transfer-100').addEventListener('click', function() {
      let existingScore = parseInt(localStorage.getItem('score')) || 0;
      let newScore = existingScore + 100;
      localStorage.setItem('score', newScore);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 100); // 15000ms = 15 seconds
    });

    document.getElementById('transfer-200').addEventListener('click', function() {
      let existingScore = parseInt(localStorage.getItem('score')) || 0;
      let newScore = existingScore + 200;
      localStorage.setItem('score', newScore);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 17500); // 15000ms = 15 seconds
    });
       
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
	
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="Photoroom-٢٠٢٤١٢٢٥_٠١٣٤١٠.png"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "IMG_20250109_180651_850.jpg",
			id: 1,
		},
		{
			name: "css3",
			img: "IMG_20250109_175417_813.jpg",
			id: 2
		},
		{
			name: "html5",
			img: "IMG_20250109_175531_750.jpg",
			id: 3
		},
		{
			name: "jquery",
			img: "IMG_20250109_175758_607.jpg",
			id: 4
		}, 
		{
			name: "javascript",
			img: "IMG_20250109_175832_729.jpg",
			id: 5
		},
		{
			name: "node",
			img: "IMG_20250109_175920_278.jpg",
			id: 6
		},
		{
			name: "photoshop",
			img: "IMG_20250109_180115_381.jpg",
			id: 7
		},
		{
			name: "python",
			img: "IMG_20250109_180424_491.jpg",
			id: 8
		},
		{
			name: "rails",
			img: "IMG_20250109_180430_942.jpg",
			id: 9
		},
		{
			name: "sass",
			img: "IMG_20250109_231610_482.jpg",
			id: 10
		},
		{
			name: "sublime",
			img: "IMG_20250109_231549_590.jpg",
			id: 11
		},
		{
			name: "wordpress",
			img: "IMG_20250109_231519_780.jpg",
			id: 12
		},
	];
    
	Memory.init(cards);


})();
