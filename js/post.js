//Post AJAX Function
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      const url = "https://sam-tur.com/wp-json/wp/v2/posts?per_page=100"

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {

            postRequestHandler(xhr.response);
            return xhr.response;
        }
    }

    xhr.open('GET', url);
    xhr.send();
    var postID = parseInt(document.location.search.replace(/^.*?\=/, ""));
    console.log(postID);
    // Handle Posts Request
    const postRequestHandler = (res) => {
      // console.log(res);
      let currentObj = res.filter(arr => arr.id === postID);
      console.log(currentObj[0].title.rendered);
      document.title = currentObj[0].title.rendered
      document.getElementById('label').innerHTML = currentObj[0].title.rendered
      document.getElementById('title').innerHTML = currentObj[0].title.rendered
      document.getElementById('description').innerHTML = currentObj[0].excerpt.rendered
      document.getElementById('content').innerHTML = currentObj[0].content.rendered

    }

    //Media AJAX Function 
    const xhrMedia = new XMLHttpRequest();
    xhrMedia.responseType = 'json';
    const mediaUrl = "https://sam-tur.com/wp-json/wp/v2/media?per_page=100";

    xhrMedia.onreadystatechange = () => {
      if(xhrMedia.readyState === XMLHttpRequest.DONE){
        // mediaRequestHandler(xhrMedia.response);
        return xhrMedia.response;
      }
    }

    xhrMedia.open('GET', mediaUrl);
    xhrMedia.send();

    // Handle Media Request
    setTimeout(() => {
      var postsResponse = xhr.onreadystatechange();
      var thisObject = postsResponse.filter(Obj => Obj.id === postID);
      console.log(thisObject[0].featured_media);
      var mediaResponse = xhrMedia.onreadystatechange();
      // console.log(mediaResponse);
      var result = mediaResponse.filter(mediaResponse => mediaResponse.id === thisObject[0].featured_media);
      console.log(result);
      document.getElementById('img').src = result[0/*ALWAYS ZERO*/].media_details.sizes.full.source_url;
    },2000);