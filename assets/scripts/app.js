const listEl = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');


function sendRequest(method,url){
    const promise = new Promise((resolve, reject) => {
        const myxhr = new XMLHttpRequest();
        myxhr.open(method,url);
        myxhr.responseType = 'json';
        myxhr.onload = function(){
            resolve(myxhr.response);
        };
        myxhr.send();
    });
    return promise;
};

function showPosts(){
    sendRequest(
        'GET',
        'https://jsonplaceholder.typicode.com/posts'
        ).then(listOfPosts => {
        for(const post of listOfPosts){
            const postEl = document.importNode(postTemplate.content,true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            listEl.appendChild(postEl)
        };
    });
};
showPosts();

function addPost(title,content){
    const userId = Math.random();
    const post = { 
        userId:userId,
        title:title,
        body:content
    }
    sendRequest('POST','https://jsonplaceholder/typicode.com/posts')
}