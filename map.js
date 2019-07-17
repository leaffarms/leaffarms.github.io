var active_paths = {
	canada: {name: "Canada", produce: "Leafy veggies"},
	florida: {name: "Florida", produce: "Leafy veggies"},
	mexico: {name: "Mexico", produce: "Mangosteen, Thai banana, Jackfruit"},
	dominican_republic: {name: "Dominican Republic", produce: "Hot Thai pepper"},
	puerto_rico: {name: "Puerto Rico", produce: "Green mango"},
	guatemala: {name: "Guatemala", produce: "Rambutan"},
	honduras: {name: "Honduras", produce: "Asian vegetables, Indian okra, Rambutan"},
	costa_rica: {name: "Costa Rica", produce: "Culantro"},
};

var disabled_paths = [
	"united_states",
	"nicaragua",
	"panama",
	"haiti",
	"cuba",
	"el_savador",
	"belize"
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

		for (var path in active_paths) {
			document.getElementById(path).classList.add("active");
		}

		for (var p in disabled_paths) {
			document.getElementById(disabled_paths[p]).classList.add("disabled");
		}



	
	});
}

function titleCase(str) {
  str = str.toLowerCase().split("_");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(" ");
}

function loadMapKey() {
	var map_legend = "";
	for (var path in active_paths) {
		map_legend += "<a class=\"map-buttons\" id=\"" + path + "-button\">" + titleCase(path) + "</a><br>";
	}
	document.getElementById("map-key").innerHTML = map_legend;
}

function displayMapInfo(id, state) {
	$(".map-buttons").removeClass("current");
	$("path").removeClass("current");
	if (state == true) {
		var x = active_paths[id];
		var caption = "<div class=\"map-caption\">" + x.produce + "</div>";
		document.getElementById("info-box").innerHTML = caption;
		document.getElementById("info-box").style.display = "block";
		document.getElementById("default-info").style.display = "none";
		document.getElementById(id + "-button").classList.add("current");
		document.getElementById(id).classList.add("current");
		// document.getElementById(id + "-button").classList.add("current");
	} else {
		document.getElementById("default-info").style.display = "block";
		document.getElementById("info-box").style.display = "none";
		document.getElementById(id + "-button").style.backgroundColor = "transparent";
	}
}

// $("#map-key").on("mouseenter", "a", function() {
// 	displayMapInfo(this.id.split("-")[0], true);
// });

// $("#map-key").on("mouseleave", "a", function() {
// 	displayMapInfo(this.id.split("-")[0], false);
// });

$(document).ready(function() {
	$("#map-key").on("click", "a", function() {
		if (this.classList.contains("current") == true) {
			displayMapInfo(this.id.split("-")[0], false);
		} else {
			displayMapInfo(this.id.split("-")[0], true);
		}
	});

	$("path").hover(function() {
		if (hasCurrentMapSelection() == true) {
			displayMapInfo(this.id, false);
		} 
		if (hasCurrentMapSelection() == false) {
			displayMapInfo(this.id, true);
		}
	});
});

function hasCurrentMapSelection() {
	var buttons = document.getElementsByClassName("map-buttons");
	var state = false;
	for (var b = 0; b < buttons.length; b++) {
		if (buttons[b].classList.contains("current")) {
			state = true;
		}
	}
	return state;
}