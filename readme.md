# Small JS library
## 1] DOM manipulation
```html
<div class='content'></div>
```
```js
// Start using it
$(".content"); // Use selector
$(document.querySelector('.content')); // Use dom object

$(something) // Object always return it self
$(something).posX // position of top/left corner element - TOP
$(something).posY // position of top/left corner element - LEFT

$(something).width // element width
$(something).height // element height

$(something).selector // element selector
$(something).element // element object

// You can call function in chain
$(".content") // select element
.style("color", "#880000") // Set style
.style("font-size", "2em")
.on("click", function () { // add event listener
    console.log("ok");        
});

```
---
## 2] Call ajax

```js
ajax("GET", "https:my-request.com", false) // Method, URL, Is ASYNC
.header([ // SET header header
         {'name':something0, 'value':something0}, // name = Keyname
         {'name':something1, 'value':something1}, // value = value of keyname
      ]) 
.response(reqSuccess, reqError) // If request success else if error
.send(); // exectute request 
```
---
## 3] Create DOM element
```js
let test = create("input") // Name of dom element to create
.add("type", "text") // add attribute (attribute name, value of attribute)
.add("class", "test testV2")
.on('click', myfunction) // Add event (type, function)
.val("vairasdfsd"); // Add text value 
        
$('div').append([test.dom]); // append created DOM element to selected element

$('div').append([test.dom, test2.dom, test3.dom]); // append ,ultiple DOM element to selected element
```
