// Posts AJAX Function
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';
var categoryID = parseInt(document.location.search.replace(/^.*?\=/, ""));
const url = `https://sam-tur.com/wp-json/wp/v2/posts?per_page=50&categories=${categoryID}`;
console.log("Hellee" + document.location.search.replace(/^.*?\=/, ""));
var x = decodeURIComponent(document.location.search.replace(/^.*?\=/, ""))
var y = x.replace(/name|&|=/g, "");
document.getElementById('label').innerHTML = y.replace(/[0-9]/g, '');
document.title = y.replace(/[0-9]/g, '');

xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        handleRequest(xhr.response);
    }
}

xhr.open('GET', url);
xhr.send();

const handleRequest = (res) => {
    // Create HTML Elements
    var toAdd = document.createDocumentFragment();
    for (var i = 0; i < res.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'post' + i;
        newDiv.className = 'card col-3 mx-5 my-3';
        newDiv.style.width = "18rem";
        toAdd.appendChild(newDiv);
        newDiv.innerHTML = `<img id="img${i}" src="http://via.placeholder.com/300x200" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 id="title${i}" class="card-title">title</h5>
            <p id="excerpt${i}" class="card-text">paragraph</p>
            <a id="link${i}" href="#" class="btn btn-dark">Read More..</a>
          </div>`;
    }
    document.getElementById('posts-wraper').appendChild(toAdd);

    // Assign Values
    for (var i = 0; i < res.length; i++) {
        document.getElementById(`title${i}`).innerHTML = res[i].title.rendered;
        document.getElementById(`excerpt${i}`).innerHTML = res[i].excerpt.rendered;
        document.getElementById(`link${i}`).href = `./post.html?id=${res[i].id}`
    }


    const handleMediaRequest = (media) => {
    	for (var i = 0; i < res.length; i++) {
    		var mediaObj = media.filter(obj => obj.id === res[i].featured_media);
    		document.getElementById(`img${i}`).src = mediaObj[0].media_details.sizes.medium.source_url;
    	}
    }
    // Media AJAX Function
    const mediXHR = new XMLHttpRequest();
    mediXHR.responseType = 'json';
    const mediaURL = "https://sam-tur.com/wp-json/wp/v2/media?per_page=100";

    mediXHR.onreadystatechange = () => {
        if (mediXHR.readyState === XMLHttpRequest.DONE) {
            handleMediaRequest(mediXHR.response);
        }
    }

    mediXHR.open('GET', mediaURL);
    mediXHR.send();



}