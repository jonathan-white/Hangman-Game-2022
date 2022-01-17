game_object.items = [
	{ 
		"name": "blacklight", 
		"image": "black_panther.jpg", 
		"trailer": "https://www.youtube.com/embed/PE04ESdgnHI?&autoplay=1&loop=1" 
	},
	{ 
		"name": "uncharted", 
		"image": "venom.jpg", 
		"trailer": "https://www.youtube.com/embed/4wCH1K-ckZw?&autoplay=1&start=7&loop=1" 
	},
	{ 
		"name": "doctor strange 2: in the multiverse of madness", 
		"image": "solo.jpg", 
		"trailer": "https://www.youtube.com/embed/Rt_UqUm38BI?&autoplay=1&loop=1" 
	},
	{ 
		"name": "morbius", 
		"image": "annihilation.jpg", 
		"trailer": "https://www.youtube.com/embed/oZ6iiRrz1SY?&autoplay=1&loop=1" 
	},
	{ 
		"name": "fantastic beasts 3: the secrets of dumbledore", 
		"image": "tomb_raider.jpg", 
		"trailer": "https://www.youtube.com/embed/Y9dr2zw-TXQ?&autoplay=1&loop=1" 
	},
	{ 
		"name": "sonic: the hedgehog 2", 
		"image": "infinity_war.jpg", 
		"trailer": "https://www.youtube.com/embed/G5kzUpWAusI?&autoplay=1&loop=1" 
	},
	{ 
		"name": "moonfall", 
		"image": "pacific_rim_uprising.jpg", 
		"trailer": "https://www.youtube.com/embed/ivIwdQBlS10?&autoplay=1&start=6&loop=1" 
	},
	{ 
		"name": "the batman", 
		"image": "rpo.jpg", 
		"trailer": "https://www.youtube.com/embed/mqqft2x_Aa4?&autoplay=1&loop=1" 
	},
	{ 
		"name": "top gun: maverick", 
		"image": "rampage.jpg", 
		"trailer": "https://www.youtube.com/embed/g4U4BQW9OEk?&autoplay=1&loop=1" 
	},
	{ 
		"name": "spider-man: across the spider-verse", 
		"image": "jurassic_world.jpg", 
		"trailer": "https://www.youtube.com/embed/BbXJ3_AQE_o?&autoplay=1&loop=1" 
	},
	{ 
		"name": "lightyear", 
		"image": "deadpool2.jpg", 
		"trailer": "https://www.youtube.com/embed/BwPL0Md_QFQ?&autoplay=1&loop=1" 
	},
	{ 
		"name": "black adam", 
		"image": "ant-man_wasp.jpg", 
		"trailer": "https://www.youtube.com/embed/pO46aNNcVnc?&autoplay=1&loop=1" 
	},
	{ 
		"name": "operation fortune: ruse de guerre", 
		"image": "wrinkle.jpg", 
		"trailer": "https://www.youtube.com/embed/N9aItGzZxsU?&autoplay=1&start=7&loop=1" 
	},
	{ 
		"name": "minions: the rise of gru", 
		"image": "red_sparrow.jpg", 
		"trailer": "https://www.youtube.com/embed/54yAKyNkK7w?&autoplay=1&loop=1" 
	},
	{ 
		"name": "death on the nile", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/dZRqB0JLizw?&autoplay=1&start=6&loop=1" 
	},
	{ 
		"name": "ambulance", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/7NU-STboFeI?&autoplay=1&start=6&loop=1" 
	},
	{ 
		"name": "scream 5", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/beToTslH17s?&autoplay=1&start=6&loop=1" 
	},
	{ 
		"name": "the lost city", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/nfKO9rYDmE8?&autoplay=1&start=8&loop=1" 
	},
	{ 
		"name": "the 355", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/SV0s2S9reT0?&autoplay=1&start=8&loop=1" 
	},
	{ 
		"name": "the flash", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/drQWopZDEEY?&autoplay=1&start=8&loop=1" 
	},
	{ 
		"name": "the northman", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/oMSdFM12hOw?&autoplay=1&start=8&loop=1" 
	},
	{ 
		"name": "marry me", 
		"image": "mi_fallout.jpg", 
		"trailer": "https://www.youtube.com/embed/Ebv9_rNb5Ig?&autoplay=1&start=8&loop=1" 
	}
];

game_object.title = "Movies";
game_object.subtitle = "2022 Blockbusters";
game_object.item_type = "Movie";

game_object.gen_rand_sound = function(){
	var applause = ["applause-1","applause-2","applause-3"];
	var rand_applause = applause[Math.floor(Math.random()*applause.length)];
	game_object.win_sound = new Audio('assets/audio/'+ rand_applause +'.mp3');
};

game_object.gen_rand_sound();

// Hide the image from the previous theme
game_object.toggle_image("hide");

game_object.update_text("transition");
game_object.game_start();

// game_object.update_image = function(result){};

game_object.metroid_launcher = function(){};

game_object.bgvideo = document.getElementById('bg-video');
game_object.video_start = function(){};
game_object.video_pause = function(){
	game_object.bgvideo.pause();	
};

game_object.video_pause();
game_object.close_curtains();
game_object.hide_score();


game_object.preview = document.getElementById('preview');
game_object.trailer_start = function() {
	game_object.toggle_image("hide");
	game_object.preview.setAttribute("src", game_object.current_item.trailer);
};

game_object.trailer_stop = function() {
	game_object.preview.setAttribute("src", "");
};