/**
 * Created by Paul Andrianoff
 */



/**
 * Element object
 * always return it self
 */
function $(selector) {
    let self = {} 

    /**
     * Element Proprietes
     */
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

    /**
     * Element Methodes
     */

    /**
     * Return html element 
     */
    self.html = function () {
        return self.element;
    }

    /**
     * Return Style
     */
    self.style = function (styleAttr, value) {
        if (!styleAttr && !value) return self.element.style;
        self.element.style[styleAttr] = value;
        
        return self;
    }

    /**
     * If there is no value argument return the given attribute value
     * else set the given attribute with given value 
     * return object
     */
    self.attr = function (attribute, value) {
        if (!value) return self.element.getAttribute(attribute);
        self.element.setAttribute(attribute, value);

        return self;
    }

    /**
     * return all attribute of the element in an array of object
     * all object are in form {"class":something, "value":something value}
     */
    self.allAttr = function () {
        let attrArray = [];
        let allAttr = self.element.attributes;
        for (let i = 0; i < allAttr.length; i++) {
            attrArray.push({"attribute":allAttr[i], "value":allAttr[i].value});            
        }
        return attrArray;
    }

    /**
     * Set an event on the element
     * return object
     */
    self.on = function (event, callback) {
        self.element.addEventListener(event, callback)

        return self;
    }

    /**
     * if there is no argument return the element value
     * ex: for an input return input value and for a div input return div innerHTML
     * if there is an argument set element value to the new given value
     */
    self.val = function (value) {
        if (!value) {
            if (typeof self.element != 'input') return self.element.innerHTML;
            return self.element.value;
        }
        if (typeof self.element != 'input') self.element.innerHTML = value;
        self.element.value = value;

        return self;        
    }

    /**
     * if there is no argument return all class of current element
     * if both argument are present add, remove or toggle given classname
     */
    self.class = function (methode, classname) {
        if (!methode && !classname) return self.element.classList;
        self.element.classList[methode](classname);

        return self;
    }

    /**
     * Append one or multiple dom to it self
     * element = Dom element or array of Dom element
     */
    self.append = function (element) {
        
        if (typeof element == 'object') {
            for (let i = 0; i < element.length; i++) {
                self.element.append(element[i]);  
            }
        } else self.element.append(element);

        return self;
    }
    
    /**
     * Remove child element of it self
     * element = childeNode element or array of childeNode element
     */
    self.remove = function (element) {
        try {
            if (typeof element == Array) {
                for (let i = 0; i < element.length; i++) {
                    self.element.removeChild(element[i]); 
                }
            } else self.element.removeChild(element);
    
        } catch (error) {
            console.log("Failed to remove child : child node doesn't exist");
        }

        return self;
    }

    return self;
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

/**
 * Ajax call
 * always return it self
 */
function ajax(method, destination, asyn=true) {
    let self = {};
    self.xhttp = new XMLHttpRequest(); // new http request object
    self.xhttp.open(method, destination, asyn); // Initialisation of http request

    /**
     * if no argument get request header
     * else argument is a json (array of object)
     * [
     *    {'name':something0, 'value':something0},
     *    {'name':something1, 'value':something1},
     * ]
     */
    self.header = function (header) {
        if (!header) return self.xhttp.getAllResponseHeaders();
        for (let i = 0; i < header.length; i++) {
            self.xhttp.setRequestHeader(header[i].name, header[i].value);
        }

        self.header = self.xhttp.getAllResponseHeaders();

        return self;
    }

    /**
     * Set function for the request respons
     * success = function called when response status is in [200, 299]
     * callback = function called when an error occured
     */
    self.response = function (success, callback) {
        self.xhttp.onreadystatechange = function () {
            if (this.status >= 200 && this.status <= 299) {
                return success(this);
            }
            return callback(this);
        }

        return self;
    }

    /**
     * Send xml request even without argument
     * data = is a FormData type
     */
    self.send = function (data) {
        if (!data) self.xhttp.send();
        else self.xhttp.send(data);

        return self;
    }

    return self;
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

/**
 * Create dom
 * always return it self
 */
function create(elementType) {
    let self = {};
    self.dom = document.createElement(elementType); // dom element

    /**
     * Set an event on the element
     * return object
     */
    self.on = function (event, callback) {
        self.dom.addEventListener(event, callback)

        return self;
    }

    /**
     * Add attribute to created element
     * attribute = name of wanted attribute
     * value = entered value as string
     */
    self.add = function (atribute, value) {
        if (!value) {
            for (let i = 0; i < atribute.length; i++) {
                self.dom.setAttribute(atribute[i].name, atribute[i].value);
            }
        } else self.dom.setAttribute(atribute, value);

        return self;
    }

    /**
     * Put text html into created element
     */
    self.val = function (value) {
        if (self.dom.nodeName == "INPUT") self.dom.setAttribute("value", value);
        else self.dom.innerHTML = value;

        return self;
    }

    return self
}

//---------------------------------------------------------------------------




//---------------------------------------------------------------------------

/**
 * if there is no argument return 0 or 1
 * if there is only one argument return an integer between 0 and the given argument
 * if both arguments are present return an integer between given min value and given max value
 */
function rand(min, max) {
    if (!min && !max) return Math.round(Math.random());
    else if (!max) return Math.round(Math.random() * min);
    return Math.round(Math.random() * (max - min)  + min);
}

/**
 * Return html selector
 */
function getSlector(dom) {
    try {
        let selector = dom.nodeName;
        let allClass = '';
        
        if ( dom.classList.length > 0) {
            for (let i = 0; i < dom.classList.length; i++) {
                allClass += "." + dom.classList[i]
            }
        }  
        
        return (dom.getAttribute('id') != null ? dom.getAttribute('id'):selector.toLowerCase()) + allClass;
    } catch (error) {
        return ("unknowned");
    }
}

/**
 * Integer prototype function
 */
Number.prototype.pow = function (power) {
    let i = 1
    let result = 1;
    while (i <= power) {
        result *= this;
        i++;
    }
    return result;
}
