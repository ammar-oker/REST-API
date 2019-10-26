// AJAX Function
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
const url = "https://sam-tur.com/wp-json/wp/v2/categories?per_page=50";

xhr.onreadystatechange = () => {
	if(xhr.readyState === XMLHttpRequest.DONE){
		handleRequest(xhr.response);
	}
}

// Handle Request
const handleRequest = (res) => {
	var parentCategries = res.filter(arr => arr.parent === 0);
	console.log(parentCategries)
	// Create HTML elements
    var toAdd = document.createDocumentFragment();
    for (var i = 0; i < parentCategries.length; i++) {
        var newDiv = document.createElement('li');
        newDiv.id = 'category' + i;
        newDiv.className = 'categories my-4';
        toAdd.appendChild(newDiv);
        // newDiv.innerHTML = `<a href="#" id="cat${i}" class=" text-light"></a>`;
    }
    document.getElementById('categories-wraper').appendChild(toAdd);

    // Assign Values To HTML Elements
    for (var i = 0; i < parentCategries.length; i++) {
    	document.getElementById(`category${i}`).innerHTML = `<h5><a class="text-light" href="./posts.html?id=${parentCategries[i].id}&name=${parentCategries[i].name}">${parentCategries[i].name}</a></h5><ul id="subcatUl${i}"></ul>`;
    }

    for (var i = 0; i < res.length ; i++) {
    	var parentElements = res.filter(arr => arr.parent === parentCategries[i].id);
    	var addSubcats = document.createDocumentFragment();
    	for (var j = 0; j < parentElements.length; j++) {
    			var newDiv = document.createElement('li');
    			newDiv.id = `subcat${i}${j}`;
    			newDiv.className = 'categories';
    			addSubcats.appendChild(newDiv);
    			// newDiv.innerHTML = 
    		}
    	document.getElementById(`subcatUl${i}`).appendChild(addSubcats);

    	for (var k = 0; k < parentElements.length; k++) {
    		document.getElementById(`subcat${i}${k}`).innerHTML = `<a class="text-light" href="./posts.html?id=${parentElements[k].id}&name=${parentElements[k].name}">${parentElements[k].name}</a>`;
    	}
    }


}

xhr.open('GET', url);
xhr.send();
