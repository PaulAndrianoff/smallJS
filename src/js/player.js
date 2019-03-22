function player(selector, type) {
    let self = {};
    self.element = document.querySelector(selector);
    self.player;
    self.type = type;
    self.sources = [];

    self.create = function (src, allowControls=true) {
        if (src) {
            self.player = create(self.type)
            .add("controls", allowControls)
            .add('src', src).dom
        } else {
            self.player = create(self.type)
            .add("controls", allowControls).dom
        }

        self.element.append(self.player);

        return self;
    }

    return self;
}