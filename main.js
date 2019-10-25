

//************** Posts Request Function********************//
const postsRequset = () => {
    // AJAX function Post
    const postsRequsetObject = new XMLHttpRequest();
    postsRequsetObject.responseType = 'json';
    const postUrl = "https://sam-tur.com/wp-json/wp/v2/posts";

    postsRequsetObject.onreadystatechange = () => {
        if (postsRequsetObject.readyState === XMLHttpRequest.DONE) {

            postsRequestHandler(postsRequsetObject.response)
        }
    }

        postsRequsetObject.open('GET', postUrl);
    	postsRequsetObject.send();

    // Handle Posts Request
    function postsRequestHandler(res) {

        // Create HTML elements
        var toAdd = document.createDocumentFragment();
        for (var i = 0; i < res.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.id = 'card' + i;
            newDiv.className = 'card my-3';
            toAdd.appendChild(newDiv);
            newDiv.innerHTML = `<img id='img${+i}' class='img' src='#'><h4 id='title${+i}' 
    	class='title'>Title</h4><p id='description${+i}' class='description'>shortDiscription</p><a 
    	id='link${+i}' href='#' class='link'>معرفة المزيد</a>`
        }
        document.getElementById('cards-wraper').appendChild(toAdd);

        // Assign JSON values to HTML elements
        for (var j = 0; j < res.length; j++) {
            document.getElementById("title" + j).innerHTML = res[j].title.rendered;
            document.getElementById("description" + j).innerHTML = res[j].excerpt.rendered;
            document.getElementById("link" + j).href = `./posts/post-${j}.html`;
        }
    }
}
//*********************** Posts Request Function /END********************************************//


//********** Media Request Function*******************************//
const mediaRequest = () => {
	// AJAX Function
	const mediaRequestObject = new XMLHttpRequest();
	mediaRequestObject.responseType = 'json';
	const mediaUrl = "https://sam-tur.com/wp-json/wp/v2/media";

	mediaRequestObject.onreadystatechange = () => {
		if(mediaRequestObject.readyState === XMLHttpRequest.DONE){
			mediaRequestHandler(mediaRequestObject.response);
		}
	}

	mediaRequestObject.open('GET', mediaUrl);
	mediaRequestObject.send();

	// Handle Media Request
	const mediaRequestHandler = (res) => {

		//Get Images
		for (var i = 0; i < res.length; i++) {
			document.getElementById("img" + i).src = res[i].media_details.sizes.medium.source_url
		}
        document.getElementById("img" + 0).src = res[2].media_details.sizes.medium.source_url;
        document.getElementById("img" + 2).src = res[0].media_details.sizes.medium.source_url;
	}
}
//*********************** Media Request Function /END********************************************//

postsRequset();

setTimeout(() => {
	mediaRequest();
}, 800)