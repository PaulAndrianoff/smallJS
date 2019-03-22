# Small JS library
## DOM manipulation
```js
function $(selector) {
    let self = {} 

    if (typeof selector == 'object') {
        self.selector = getSlector(selector); // selector use to get element
        self.element = selector; // element DOM
    } else {
        self.selector = selector; // selector use to get element
        self.element = document.querySelector(self.selector); // element DOM
    }
    self.width = self.element.offsetWidth; // element width
    self.height = self.element.offsetHeight; // element height
    self.posX = self.element.offsetTop; // element top left corner position on X
    self.posY = self.element.offsetLeft; // element top left corner position on Y

    
    }
```