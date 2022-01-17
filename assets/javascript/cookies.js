game_object.items = [
	{ "name": "biscotti", "image": "biscotti.jpg" },			//# of Repeat letters: 2
	{ "name": "macaron", "image": "macaron.jpg" },				//# of Repeat letters: 1
	{ "name": "oatmeal", "image": "oatmeal.jpg" },				//# of Repeat letters: 1
	{ "name": "chocolate chip", "image": "chocolate chip.jpg" },//# of Repeat letters: 4
	{ "name": "fortune", "image": "fortune.jpg" },				//# of Repeat letters: 0
	{ "name": "oreo", "image": "oreo.jpg" },					//# of Repeat letters: 1
	{ "name": "peanut butter", "image": "peanut butter.jpg" },	//# of Repeat letters: 4
	{ "name": "snickerdoodle", "image": "snickerdoodle.jpg" },	//# of Repeat letters: 3
	{ "name": "cutout", "image": "cutout.jpg" },				//# of Repeat letters: 2
	{ "name": "sugar", "image": "sugar.jpg" },					//# of Repeat letters: 0
	{ "name": "peppermint", "image": "peppermint.jpg" }			//# of Repeat letters: 3
];

game_object.title = "Cookies";
game_object.subtitle = "Can you guess the type of cookie?";
game_object.item_type = "Cookie";

game_object.gen_rand_sound = function(){};

game_object.win_sound = new Audio('assets/audio/Bite-Sound.mp3');

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
		game_object.image.setAttribute("alt", "No cookies for you");		
	}
	game_object.image.setAttribute("src", "assets/images/"+ selected_image);
};

game_object.metroid_launcher = function(){};
game_object.video_start = function(){};

game_object.bgvideo = document.getElementById('bg-video');
game_object.video_start = function(){};
game_object.video_pause = function(){
	game_object.bgvideo.pause();	
};

game_object.video_pause();
game_object.hide_score();

game_object.trailer_stop();