var active_paths = {
	canada: {name: "Canada", produce: "Leafy veggies"},
	mexico: {name: "Mexico", produce: "Mangosteen, Thai banana, Jackfruit"},
	costa_rica: {name: "Costa Rica", produce: "Culantro"},
	puerto_rico: {name: "Puerto Rico", produce: "Green mango"},
	dominican_republic: {name: "Dominican Republic", produce: "Hot Thai pepper"},
	honduras: {name: "Honduras", produce: "Asian vegetables, Indian okra, Rambutan"},
	guatemala: {name: "Guatemala", produce: "Rambutan"},
	florida: {name: "Florida", produce: "Leafy veggies"}
};

var disabled_paths = [
	"united_states",
	"nicaragua",
	"Separator",
	"panama",
	"haiti",
	"cuba_1",
	"el_savador",
	"belize"
];

fetch("map.html")
.then(response => {
	return response.text();
})
.then(data => {
	document.getElementById("map-wrapper").innerHTML += data;
	for (var path in active_paths) {
		document.getElementById(path).classList.add("active");
	}

	for (var p in disabled_paths) {
		document.getElementById(disabled_paths[p]).classList.add("disabled");
	}

	$("path").hover(function() {
		var x = active_paths[this.id];
		var title = "<div class=\"map-title\">" + x.name + "</div>";
		var caption = "<div class=\"map-caption\">" + x.produce + "</div>";
		document.getElementById("info-box").innerHTML = title + caption;
	});
});