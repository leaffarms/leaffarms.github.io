const ACTIVE_PATHS = {
	canada: {
		name: "Canada", 
		produce: [
			"Sha li Hoa",
			"Dai Kon",
			"Shanghai Mieu",
			"Chinese Spinach",
			"Yu Choy",
			"Yu Choy Sum",
			"Tai Wan Bok Choy (Wawa Choy)",
		],
	},
	florida: {
		name: "Florida", 
		produce: [
			"Avocado",
			"Canton",
			"Chive",
			"Dai Kon",
			"Dai Kon with Leaf",
			"Fresh Peanuts",
			"Finger Hot",
			"Gongura (Sour Leaf)",
			"Thai Guava",
			"Baby Jack Fruit",
			"Jujube",
			"June Plum",
			"June Plum Leaf",
			"Korean Dai Kon",
			"Mustard Green (Gai Choy)",
			"Mint",
			"Moringa",
			"Paipew",
			"Pumpkin Leaf",
			"Penny Work",
			"Sugar Cane",
			"Sapote",
			"Shanghai Mieu",
			"Sugar Cane (Peeled)",
			"Snake Gourd",
			"Chinese Spinach",
			"Yu Choy",
			"Yu Choy Sum",
			"Vietnamese Mint",
			"Green Bean",
			"Tai Wan Bok Choy (Wawa Choy)",
		],
	},
	mexico: {
		name: "Mexico", 
		produce: [
			"Sha Li Hoa",
			"Jack Fruit",
			"Malanga Coco",
			"Mangosteen",
			"Ataulfo Mango (Marathon Mangoes)",
		],
	},
	dominican_republic: {
		name: "Dominican Republic",
		produce: [],
	},
	puerto_rico: {
		name: "Puerto Rico",
		produce: [],	
	},
	guatemala: {
		name: "Guatemala",
		produce: [],
	},
	honduras: {
		name: "Honduras", 
		produce: [
			"Fancy American Okra",
		],
	},
	costa_rica: {
		name: "Costa Rica",
		produce: [],		
	},
	panama: {
		name: "Panama",
		produce: [],
	},
};

const DISABLED_PATHS = [
	"united_states",
	"nicaragua",
	"haiti",
	"cuba",
	"el_savador",
	"belize",
	"Separator"
];

function loadMap() {
	fetch("map.html")
	.then(response => {
		if(response.ok) {
			return response.text();
		}
		throw new Error('Network response was not ok.');
	})
	.then(data => {
		document.getElementById("map-wrapper").innerHTML += data;

		for (let path in ACTIVE_PATHS) {
			document.getElementById(path).classList.add("active");
		}

		for (let p in DISABLED_PATHS) {
			document.getElementById(DISABLED_PATHS[p]).classList.add("disabled");
		}

		$("path").hover(function() {
			if (hasCurrentMapSelection() == true) {
				displayMapInfo(this.id, false);
			} 
			if (hasCurrentMapSelection() == false) {
				displayMapInfo(this.id, true);
			}
		});
	});
}

function titleCase(str) {
  str = str.toLowerCase().split("_");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(" ");
}

function loadMapKey() {
	let map_legend = "";
	for (let path in ACTIVE_PATHS) {
		map_legend += "<a class=\"map-buttons\" id=\"" + path + "-button\">" + titleCase(path) + "</a><br>";
	}
	document.getElementById("map-key").innerHTML = map_legend;
}

function displayMapInfo(id, state) {
	$(".map-buttons").removeClass("current");
	$("path").removeClass("current");
	if (state == true) {
		let x = ACTIVE_PATHS[id];
		let caption_items = [];
		for (let i = 0; i < x.produce.length; i++) {
			caption_items.push(x.produce[i]);
		}

		for (let i in PRODUCE_IMAGES) {
			if (PRODUCE_IMAGES[i]["source"].includes(x["name"])) {
				caption_items.push(PRODUCE_IMAGES[i]["name"]);
			}
		}

		let caption = "";
		if (caption_items.length < 25) {
			caption += "<ul>";
			for (let c = 0; c < caption_items.length; c++) {
				caption += "<li>" + caption_items[c] + "</li>";
			}
			caption += "</ul>";
		} else {
			caption += "<ul style='width: 50%; float: left; margin-right: 20px; font-size: smaller;'>";
			for (let c = 0; c < Math.round(caption_items.length/2); c++) {
				caption += "<li>" + caption_items[c] + "</li>";
			}
			caption += "</ul><ul style='width: 40%; float: left; font-size: smaller;'>";
			for (let c = Math.round(caption_items.length/2) + 1; c < caption_items.length; c++) {
				caption += "<li>" + caption_items[c] + "</li>";
			}
			caption += "</ul>";
		}

		document.getElementById("info-box").innerHTML = "<div class=\"map-caption\">" + caption + "</div>";
		document.getElementById("info-box").style.display = "block";
		document.getElementById("default-info").style.display = "none";
		document.getElementById(id + "-button").classList.add("current");
		document.getElementById(id).classList.add("current");
	} else {
		document.getElementById("default-info").style.display = "block";
		document.getElementById("info-box").style.display = "none";
		document.getElementById(id + "-button").style.backgroundColor = "transparent";
	}
}

$(document).ready(function() {
	$("#map-key").on("click", "a", function() {
		if (this.classList.contains("current") == true) {
			displayMapInfo(this.id.split("-")[0], false);
		} else {
			displayMapInfo(this.id.split("-")[0], true);
		}
	});
});


function hasCurrentMapSelection() {
	let buttons = document.getElementsByClassName("map-buttons");
	let state = false;
	for (let b = 0; b < buttons.length; b++) {
		if (buttons[b].classList.contains("current")) {
			state = true;
		}
	}
	return state;
}