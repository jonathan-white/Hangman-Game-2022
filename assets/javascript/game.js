var game_object = {
	"themes": ["cookies","movies","metroid"],
	"image": document.getElementById("image"),
	"title": "",
	"subtitle": "",
	"item_type": "",
	"num_wins": 0,
	"current_item": "",
	"remaining_guesses": 12,
	"letters_guessed": 0,
	"correct_guesses": 0,
	"correct_letters": [],
	"guessed_letters": [],
	"items": null,
	"victory": false,
	"difficulty_levels": ["Easy","Normal","Hard"],
	"difficulty": "Normal",
	"win_sound": new Audio('assets/audio/Bite-Sound.mp3'),
	game_start: function (){
		game_object.letters_guessed = 0;
		game_object.correct_guesses = 0;
		game_object.victory = false;
		game_object.guessed_letters = [];
		game_object.correct_letters = [];

		// Select a random word from the list
		var random = Math.floor(Math.random()*game_object.items.length); 
		game_object.current_item = game_object.items[random];

		// Update the number of remaining guesses
		var extra_guesses;
		if (game_object.difficulty === "Normal") {
			extra_guesses = 6;
		}else if (game_object.difficulty === "Hard") {
			extra_guesses = 0;
		}else if (game_object.difficulty === "Easy") {
			extra_guesses = game_object.current_item.name.length * 2;
		}
		game_object.remaining_guesses = game_object.current_item.name.length + extra_guesses;
		game_object.update_text();

		// update #word-showing with the number of letters for the selected word
		$('#word-showing').empty();
		var letter_field;
		for (i=0; i < game_object.current_item.name.length; i++){
			letter_field = '<li id="letter-'+ i +'" class="output">_</li>';
			$('#word-showing').append(letter_field);
		}

		//If the chosen word contains a space, display the space
		if (game_object.current_item.name.includes(" ")){
			for (var i=0; i < game_object.current_item.name.length; i++){
				if (!game_object.correct_letters.includes(i) && game_object.current_item.name[i] == " ") {
					game_object.correct_letters.push(i); 
					document.getElementById('letter-' + i).textContent = " ";
				}
			}		
		}
	},
	check_keypress: function(){
		// if guess count is > 20% of the number of letters in the chosen word, close curtains (Movies)
		var overflow_keys = Math.floor(game_object.current_item.name.length * .20);
		if (game_object.letters_guessed >= overflow_keys) {
			game_object.trailer_stop();
			game_object.close_curtains();
		}

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
	check_outcome: function(){
		if (game_object.remaining_guesses === 0 && !game_object.victory) {
			// Player Loses
			game_object.update_text("loss");

			//remove/replace the displayed image
			game_object.update_image("loss");

			// Restart the game
			game_object.game_start();
		}else if (game_object.victory) {
			// Player Wins
			game_object.num_wins++;

			// Open curtains
			game_object.open_curtains();

			game_object.gen_rand_sound();
			game_object.win_sound.play();
			game_object.update_text("win");

			// Launch a metroid
			game_object.metroid_launcher();

			// Display the image
			game_object.update_image("win");

			if (game_object.title === "Movies") {
				// Play Trailer (hide image)
				game_object.trailer_start();	
			}
			
			// Restart the game
			game_object.game_start();
		}
	},
	update_image: function() {},
	update_text: function(theme){
		switch(theme){
			case "transition":
				document.getElementById('page-title').textContent = game_object.title;
				document.getElementById('page-subtitle').textContent = game_object.subtitle;
				document.getElementById('status-title').textContent = "";
				document.getElementById('status').textContent = "";
				break;
			case "win":
				document.getElementById('status-title').textContent = "Previous "+ game_object.item_type +":";
				document.getElementById('status').textContent = game_object.current_item.name;
				break;
			case "loss":
				document.getElementById('status-title').textContent = "";
				document.getElementById('status').textContent = "Better luck next time...";
				break;
			case "guesses remaining":
				document.getElementById('remaining-guesses').textContent = game_object.remaining_guesses;
				break;
			default: 
				document.getElementById('remaining-guesses').textContent = game_object.remaining_guesses;
				document.getElementById('page-subtitle').textContent = game_object.subtitle;
				document.getElementById('word-title').textContent = "Current " + game_object.item_type;
				// Update the win count
				if(game_object.num_wins === 1)
					document.getElementById('wins').textContent = game_object.num_wins +" Win";
				else
					document.getElementById('wins').textContent = game_object.num_wins +" Wins";
					document.getElementById('guessed').textContent = "";
		}
	},
	clear: function(theme){
		document.head.removeChild(document.getElementById(theme + "-css"));
		document.body.removeChild(document.getElementById(theme + "-js"));
	},
	changeTheme: function(el,theme_1,theme_2,theme_3){
		document.getElementById(el).addEventListener("click", function(e){
			if(!document.getElementById(theme_1 + "-css")){
				// Create script & link elements for target theme's external files
				var script = document.createElement("script");
				var css = document.createElement("link");

				script.setAttribute("src", "assets/javascript/"+ theme_1 +".js");
				script.id = theme_1 + "-js";

				css.id = theme_1 + "-css";
				css.setAttribute("rel", "stylesheet");
				css.setAttribute("href", "assets/css/"+ theme_1 +".css");

				// Link target theme's css & js files in head and body sections 
				document.head.appendChild(css);
				document.body.appendChild(script);

				// Remove css and js files associated with the deactivated themes
				if(!(document.getElementById(theme_2 + "-css") === null)){
					game_object.clear(theme_2);
				}

				if(!(document.getElementById(theme_3 + "-css") === null)){
					game_object.clear(theme_3);
				}
			}
		});	
	},
	addListeners: function(){
		var buttons_list = document.getElementsByClassName('theme-options')[0];
		var buttons = buttons_list.getElementsByTagName('li');

		var x = 1;
		var y = 2;
		for (i=0; i < buttons.length; i++){

			if (x === game_object.themes.length){
				x = 0;
			}

			if (y === game_object.themes.length){
				y = 0;
			}	

			game_object.changeTheme(buttons[i].id, game_object.themes[i], game_object.themes[x], game_object.themes[y]);
			x++;
			y++;
		}
	},
	initialize_game: function(){
		game_object.addListeners();

		$('.difficulty-options li').click(function(event) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			game_object.difficulty = $(this).data('level');
		});

		$('.theme-options li').click(function(event) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
		});
	},
	toggle_image: function(display){
		(display === "hide") ? game_object.image.style.display = "none" : game_object.image.style.display = "block";
	},
	metroid_launcher: function(){},
	gen_rand_sound: function(){},
	video_start: function(){},
	video_pause: function(){},
	open_curtains: function(){
		var curtains = document.getElementsByClassName("curtain");
		for (var i = 0; i < curtains.length; i++) {
			curtains[i].classList.add("open");
		}
	},
	close_curtains: function(){
		var curtains = document.getElementsByClassName("curtain");
		for (var i = 0; i < curtains.length; i++) {
			curtains[i].classList.remove("open");
		}
	},
	hide_score: function(){
		document.getElementsByClassName("scoreholder")[0].style.display = 'none';
	},
	trailer_start: function(){},
	trailer_stop: function(){}
};

document.onkeyup = function(event){
	game_object.check_keypress();
};
