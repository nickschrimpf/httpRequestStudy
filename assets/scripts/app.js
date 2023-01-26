const listEl = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchPostsButton = document.querySelector('#available-posts button');

// SENDING ALL HTTP REQUESTS AND RETURN A PROMISE
function sendRequest(method,url,data){
    const promise = new Promise((resolve, reject) => {
        const myxhr = new XMLHttpRequest();
        myxhr.open(method,url);
        myxhr.responseType = 'json';
        myxhr.onload = function(){
            resolve(myxhr.response);
        };
        myxhr.send(JSON.stringify(data));
    });
    return promise;
};
// GRABBING ALL AVAILABLE POSTS RETURNS 100 TOTAL
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

function deletePostById(id){
    sendRequest('DELETE','https://jsonplaceholder.typicode.com/posts/'+id)
}

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

// DELETE BUTTON FOR EACH POST!
function deleteButtonClickHandler(){
    console.log(this.userId)
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