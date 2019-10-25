//************** Posts Request Function********************//
// AJAX function Post
const postsRequsetObject = new XMLHttpRequest();
postsRequsetObject.responseType = 'json';
const postUrl = "https://sam-tur.com/wp-json/wp/v2/posts";

postsRequsetObject.onreadystatechange = () => {
    if (postsRequsetObject.readyState === XMLHttpRequest.DONE) {
        postsRequestHandler(postsRequsetObject.response);
        return postsRequsetObject.response;
    }
}

postsRequsetObject.open('GET', postUrl);
postsRequsetObject.send();

// Handle Posts Request
function postsRequestHandler(res) {

    // Create HTML elements
    var toAdd = document.createDocumentFragment();
    console.log(res.length);
    for (var i = 0; i < res.length; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'card' + i;
        newDiv.className = 'card my-3';
        toAdd.appendChild(newDiv);
        newDiv.innerHTML = `<img id='img${+i}' class='img' src='#'><h4 id='title${+i}' 
    	class='title'>Title</h4><p id='description${+i}' class='description'>shortDiscription</p><a 
    	id='link${+i}' href='#' class='link'>معرفة المزيد</a>`;
    }
    document.getElementById('cards-wraper').appendChild(toAdd);

    // Assign JSON values to HTML elements
    for (var j = 0; j < res.length; j++) {
        document.getElementById("title" + j).innerHTML = res[j].title.rendered;
        document.getElementById("description" + j).innerHTML = res[j].excerpt.rendered;
        document.getElementById("link" + j).href = `./posts/post-${j}.html`;
        // var x = res[j].featured_media;
        // console.log(`featured_media${j}: ` + x);
    }
}
//*********************** Posts Request Function /END********************************************//


//********** Media Request Function*******************************//
// AJAX Function
const mediaRequestObject = new XMLHttpRequest();
mediaRequestObject.responseType = 'json';
const mediaUrl = "https://sam-tur.com/wp-json/wp/v2/media";

mediaRequestObject.onreadystatechange = () => {
    if (mediaRequestObject.readyState === XMLHttpRequest.DONE) {
        return mediaRequestObject.response;
    }
}

mediaRequestObject.open('GET', mediaUrl);
mediaRequestObject.send();

// Handle Media Request
setTimeout(() => {
    const postsResponse = postsRequsetObject.onreadystatechange();
    const mediaResponse = mediaRequestObject.onreadystatechange();
    // console.log(postsResponse[3]);
    // console.log(mediaResponse[3]);
    //Get Images
    for (var i = 0; i < postsResponse.length; i++) {
        var postID = postsResponse[i].featured_media;
        var mediaObj = mediaResponse.filter(obj => obj.id === postID);
        // console.log(`postID: ${postID} || mediaObj: ${mediaObj}`);
        document.getElementById("img" + i).src = mediaObj[0].media_details.sizes.medium.source_url;
    }
}, 1200);

//*********************** Media Request Function /END********************************************//