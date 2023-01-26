const listEl = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
console.log(postTemplate)
const myxhr = new XMLHttpRequest();


myxhr.open('GET','https://jsonplaceholder.typicode.com/posts');

myxhr.responseType = 'json';

myxhr.onload = function(){
    // const listOfPosts = JSON.parse(myxhr.response);
    const listOfPosts = myxhr.response
    // console.log(listOfPosts)
    for(const post of listOfPosts){
        const postEl = document.importNode(postTemplate.content,true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        listEl.appendChild(postEl)
    }
}

myxhr.send();



