const listEl = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchPostsButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

// XMLHttpRequest
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// STARTED WITH XMLHTTPSREQUEST BUT WILL MOVE TO THE FETCH API TO GET A STREAM

// FETCH
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// SENDING ALL HTTP REQUESTS AND RETURN A PROMISE
function sendRequest(method,url,data){

    // const promise = new Promise((resolve, reject) => {
    //     const myxhr = new XMLHttpRequest();
    //     myxhr.open(method,url);
    //     myxhr.responseType = 'json';
    //     myxhr.onload = function(){
    //         if(myxhr.status >= 200 && myxhr.status < 300){
    //             resolve(myxhr.response);
    //         }else{
    //             reject(new Error('There is an issue!'));
    //         };
    //     };
    //     myxhr.onerror = () => {
    //         console.log(myxhr.response)
    //         console.log(myxhr.status)
    //     };
    //     myxhr.send(JSON.stringify(data));
    // });
    // return promise;

    return fetch(url, {
        method:method,
        body:JSON.stringify(data)
    }).then(response => {
        return response.json();
    });
};

// ON BUTTON CLICK WE REACH OUT TO THE API FOR POSTS
// COMING FROM THE CLICK HANDLER
function showPosts(){
    sendRequest(
        'GET',
        'https://jsonplaceholder.typicode.com/posts'
        ).then(listOfPosts => {
        for(const post of listOfPosts){
            const postEl = document.importNode(postTemplate.content,true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('li').id = post.id;
            listEl.appendChild(postEl);
        };
    });
};

// ADD A POST AND CREATE RANDOM USER ID
function addPost(title,content){
    const userId = Math.random();
    const post = { 
        userId:userId,
        title:title,
        body:content
    };
    sendRequest('POST','https://jsonplaceholder.typicode.com/posts', post);
};
//  GIVEN THE POST ID WE MAKE A CALL TO 
// THE API AND DELETE THE POST AND REMOVE IT FROM THE DOM
function deletePostById(id){
    sendRequest('DELETE','https://jsonplaceholder.typicode.com/posts/'+id);
    let currentPosts = document.querySelectorAll('li');
    currentPosts.forEach((post) => {
        if(post.id === id){
            postList.removeChild(post);
        };
    });
};

// SHOWING POST ON CLICK OF THE FETCH POSTS BUTTON
function fetchPostsButtonClickHandler(){
    const posts = document.querySelectorAll('.posts li');
    if(posts.length > 0){
        posts.forEach(post => {
            listEl.removeChild(post);
        });
        showPosts();
    }else{
        showPosts();
    }
   
}
// SET UP EVENT LISTENER AND WAIT FOR CLICK TO GET POSTS
fetchPostsButton.addEventListener('click',fetchPostsButtonClickHandler);

// CAPTURING FORM DATA ON SUBMIT AND ADDING TO POST VIA THE ADD POST METHOD
form.addEventListener('submit', event => {
    event.preventDefault();
    const enteredTitle = event.currentTarget.querySelector('#title').value;
    const enteredContent = event.currentTarget.querySelector('#content').value;
    addPost(enteredTitle,enteredContent);
});
// USE AN EVENTLISTENER ON THE LIST AND LOOK FOR CLICKS ON A BUTTON TAG
postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
       const postId = event.target.closest('li').id;
       deletePostById(postId);
    };
});