function loadGallery(imageList, showMax) {
	let output = "";
	let total = Number(Object.keys(imageList).length);
	let count = 1;
	let showCount = 0;

	for (let key in imageList) {
		let value = imageList[key];
		let	path = value["path"];
		if (path == "") {
			total -= 1;
		}
	}

	for (let key in imageList) {
		let value = imageList[key];
		let name = value["name"],
			chinese_name = value["chinese"],
			path = value["path"],
			thumbnail = value["thumbnail"],
			category = value["category"];
		
		if (path != "") {
			if (showCount < showMax) {
				output += "<div class=\"item\"><img id=\"" + count + " / " + total + "\" data-key=\"" + key  + "\" alt=\"" + name + "\" src=\"" + thumbnail + "\"><div class=\"item_details\">" + name + "     " + chinese_name + "</div></div>";
				showCount += 1;
			} else {
				output += "<div class=\"item hidden\"><img id=\"" + count + " / " + total + "\" data-key=\"" + key  + "\" alt=\"" + name + "\" src=\"" + thumbnail + "\"><div class=\"item_details\">" + name + "     " + chinese_name + "</div></div>";
			}
			count += 1;
		}
	}
	document.getElementById("produce-gallery").innerHTML = output;
}

function showMoreImages(imageList, showNumber) {
	var list = document.getElementsByClassName("item hidden");
	var showNumber = Math.min(showNumber, list.length);

	for (let i = 0; i < showNumber; i++) {
		list[0].classList.remove("hidden");
	}

	if (list.length == 0) {
		document.getElementById("more-produce-button").style.display = "none";
		document.getElementById("fewer-produce-button").style.display = "inline-block";
	}
}

function getImageInfo(count, total) {
	let imgID = count + " / " + total;
	let key = document.getElementById(imgID).getAttribute("data-key");
	let value = PRODUCE_IMAGES[key];
	let full_name = value["name"] + " " + value["chinese"];

	let info = {
		id: imgID,
		key: key,
		name: value["name"],
		chinese_name: value["chinese"],
		full_name: full_name,
		path: value["path"],
		thumbnail: value["thumbnail"],
		category: value["category"]
	};

	return info;
}

function previousImage() {
	let img = document.getElementsByClassName("modal-img")[0];
	let count = document.getElementsByClassName("modal-count")[0];
	let caption = document.getElementsByClassName("modal-footer")[0]
	let [current, total] = count.innerHTML.split(" / ");
	let previous = current - 1;

	if (current == 1) {
		previous = total;
	}

	let prevCount = previous + " / " + total;
	let prevImg = getImageInfo(previous, total);

	img.src = prevImg.path;
	count.innerHTML = prevCount;
	caption.innerHTML = prevImg.full_name;
	img.onload = function() {
		updateImageSize();
	}
}

function nextImage() {
	let output = document.getElementsByClassName("modal-body")[0];
	let img = document.getElementsByClassName("modal-img")[0];
	let count = document.getElementsByClassName("modal-count")[0];
	let caption = document.getElementsByClassName("modal-footer")[0];
	let [current, total] = count.innerHTML.split(" / ");
	let next = parseInt(current) + 1;

	if (current == total) {
		next = 1;
	}

	let nextCount = next + " / " + total;
	let nextImg = getImageInfo(next, total);

	let newImg = new Image();
	newImg.src = nextImg.path;
	newImg.className = "modal-img";
	newImg.setAttribute("data-key", nextImg.key);

	output.replaceChild(newImg, img);

	count.innerHTML = nextCount;
	caption.innerHTML = nextImg.full_name;
	newImg.onload = function() {
		updateImageSize();
	}
}

function updateImageSize() {
	let imageContainer = document.getElementsByClassName("modal-body")[0];
	let image = document.getElementsByClassName("modal-img")[0];

	let windowW = window.innerWidth*0.9;
	let windowH = window.innerHeight*0.9;

	let imageR = image.naturalWidth/image.naturalHeight;
	let windowR = windowW/windowH;

	if (windowR >= imageR) {
		image.height = windowH;
		image.width = windowH*imageR;
	} else {
		image.width = windowW;
		image.height = windowW/imageR;
	}
}

function closeModal() {
	document.getElementById("photo_modal").style.display = "none";
}

$(document).ready(function() {
	var modal = document.getElementById("photo_modal");

	$(".item").click(function(){
		let count = this.children[0].id;
		let [current, total] = count.split(" / ");
		let img = getImageInfo(current, total);

		let newImg = new Image();
		newImg.src = img.path;
		newImg.className = "modal-img"; 
		newImg.setAttribute("data-key", img.key);

		document.getElementsByClassName("modal-body")[0].innerHTML = "";
		document.getElementsByClassName("modal-body")[0].appendChild(newImg);

		$(".modal-count").html(img.id);
		$(".modal-footer").html(img.full_name);
		modal.style.display = "block";
		newImg.onload = function() {
			updateImageSize();
		}
	});

	$(".item").mouseover(function(){
		let name = this.children[1];
		name.style.opacity = "1";
	});

	$(".item").mouseout(function(){
		let name = this.children[1];
		name.style.opacity = "0";
	});

	$(".modal-body").click(function(){
		closeModal();
	});

	$(window).resize(function() {
		if ($(".modal").is(":visible")) {
			updateImageSize();
		}
	});
});
