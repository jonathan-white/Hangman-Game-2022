game_object.items = [
	{ "name": "metroid", "image": "metroid.png" },
	{ "name": "samus", "image": "samus.png" },
	{ "name": "mother brain", "image": "MotherBrain_drool.gif" },
	{ "name": "ridley", "image": "ridley.jpg" },
	{ "name": "chozo", "image": "chozo.jpg" },
	{ "name": "metroid prime", "image": "Metroidprime4.jpg" },
	{ "name": "kraid", "image": "kraid_16_bit.gif" },
	{ "name": "imago", "image": "mzm_imago_artwork_edited.png" }
];

game_object.title = "Metroid";
game_object.subtitle = "Can you guess the Metroid character?";
game_object.item_type = "Character";

game_object.gen_rand_sound = function(){};

game_object.win_sound = new Audio('assets/audio/SamusShip_6.wav');

// Hide the image from the previous theme
game_object.toggle_image("hide");

game_object.update_text("transition");
game_object.game_start();


game_object.update_image = function(result){
	var selected_image;

	if (result === "win"){
		game_object.toggle_image("show");
		selected_image = game_object.current_item.image;
		game_object.image.setAttribute("alt", game_object.current_item.name);
		console.log("Display: " + game_object.current_item.name);

		if (game_object.current_item.name === "kraid") {
			game_object.image.classList.add("kraid");
		} else {
			game_object.image.classList.remove("kraid");
		}



	}else if(result === "loss"){
		var pics = [
			"cm.gif",
			"cm-delete-cookies-funny-images.jpg",
			"cm-fruit.jpg",
			"cm-nocookiesforyou.jpg",
			"cm-quotes.jpg",
			"cm-vs-keebler.gif",
			"cookie-monster.gif"
		];
		selected_image = pics[Math.floor(Math.random()*pics.length)];

		// game_object.toggle_image("hide");
		game_object.toggle_image("show");
		game_object.image.setAttribute("alt", "You lost!");		
	}
	game_object.image.setAttribute("src", "assets/images/"+ selected_image);
};

game_object.metroid_launcher = function(){
	var metroid = document.createElement("div");
	metroid.className = 'metroid delay-' + Math.floor(Math.random()*10) + ' pos-' + Math.floor(Math.random()*3);

	game_object.pop_sound = new Audio('assets/audio/Seedling_4.wav');
	// Detect mouse clicks
	metroid.addEventListener('mousedown', function(e){
		game_object.pop_sound.play();
		// Pop the metroid and display '+100' score
		game_object.increaseScore(100);
		this.classList.add("score");

		// Destroy score
		setTimeout(function() {
			metroid.remove();
		}, 1000);
	});

	// Detect touch (mobile)
	metroid.addEventListener('touchstart', function(e){
		e.preventDefault();
		var touch = e.touches;
		game_object.pop_sound.play();
		// Pop the metroid and display '+100' score
		game_object.increaseScore(100);
		this.classList.add("score");

		// Destroy score
		setTimeout(function() {
			metroid.remove();
		}, 1000);
	});


	document.body.appendChild(metroid);
};


//Override the check_press method 
game_object.check_keypress = function(){
	// // if guess count is > 20% of the number of letters in the chosen word, close curtains (Movies)
	// var overflow_keys = Math.floor(game_object.current_item.name.length * .20);
	// if (game_object.letters_guessed >= overflow_keys) {
	// 	game_object.trailer_stop();
	// 	game_object.close_curtains();
	// }

	// If player guesses incorrectly, add to guessed letters and reduce remaining guesses
	var typed_key = event.key.toLowerCase();
	if (!game_object.guessed_letters.includes(typed_key)){
		game_object.letters_guessed++;
		game_object.remaining_guesses--;
		game_object.guessed_letters.push(typed_key);
		document.getElementById('guessed').textContent += typed_key + " ";
	}
	
	// if the player guesses correctly...
	if (game_object.current_item.name.indexOf(typed_key) > -1) {

		//Display the score and add 10 to the score for every correct guess
		var metroid = document.createElement("div");
		metroid.classList.add("score");
		game_object.increaseScore(10);

		// find the index of the letter and reveal the letter 
		for (var i=0; i < game_object.current_item.name.length; i++){
			if (!game_object.correct_letters.includes(i) && game_object.current_item.name[i] == typed_key) {
				game_object.correct_letters.push(i); 
				game_object.correct_guesses++;
				var letter_pos = document.getElementById('letter-' + i);
				letter_pos.textContent = typed_key;
				letter_pos.classList.add("flash");
			}
		}

		// if the number of correct guesses matches the number of letters in the word
		// set the victory condition to true
		if (game_object.correct_letters.length === game_object.current_item.name.length){
			game_object.victory = true;
		}
	}

	// Display the number of remaining guesses
	game_object.update_text("guesses remaining");

	// Check if player has won or lost
	game_object.check_outcome();
},

game_object.metroid_launcher();

game_object.bgvideo = document.getElementById('bg-video');

game_object.video_start = function(){
	game_object.bgvideo.play();	
};
game_object.video_pause = function(){};

game_object.video_start();

game_object.score = 0;
game_object.increaseScore = function(amount){
	game_object.score += amount;
	var player_score = document.getElementsByClassName("scoreholder")[0];
	player_score.style.display = 'inline-block';
	player_score.textContent = "Score: " + game_object.score;
};

game_object.trailer_stop();