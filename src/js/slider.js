function slider(selector, time=-1) {
    let self = {}
    self.slider = document.querySelector(selector);
    self.allPage = self.slider.querySelectorAll(".slider .page");

    self.maxPage = self.allPage.length;
    self.currentPage = 0;
    self.time = time;

    self.changePage = function (direction) {
        $(self.allPage[self.currentPage]).class("remove", "active--slider"); 

        if (direction == 'l') {
            if (self.currentPage == 0) self.currentPage = self.maxPage-1;
            else self.currentPage -=1;
        } else if (direction == 'r') {
            if (self.currentPage == self.maxPage-1) self.currentPage = 0;
            else self.currentPage +=1;
        }
        
    
        $(self.allPage[self.currentPage]).class("add", "active--slider")
    }

    self.addAuto = function (time, dir='r') {
        self.time = time;

        if (self.time > 0) {
            setTimeout(() => {
                self.changePage(dir);
                self.sliderAuto(self.time, dir);
            }, self.time);
        }

        return self;
    }

    self.addControle = function () {
        $(self.slider).append(
            create("a")
            .add("class", "slider--prev")
            .add("href", "#")
            .on('click', function (e) {
                e.preventDefault();
                self.changePage('l');
                
            }).val("prev").dom
        ).append(
            create("a")
            .add("class", "slider--next")
            .add("href", "#")
            .on('click', function (e) {
                e.preventDefault();
                self.changePage('r');
    
            }).val("next").dom
        );

        return self;
    }

    self.addKey = function (key1, key2) {
        $(window).on('keypress', function (e) {
            if (key1.charCodeAt(0) == e.keyCode) self.changePage('l');
            else self.changePage('r');
        });

        return self;
    }

    return self;
}