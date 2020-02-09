class GameCell {
    width = 0;
    height = 0;
    x = 0;
    y = 0;
    absoluteX = 0;
    absoluteY = 0;
    Element = null;
    TextContainer = null;
    isActive = false;

    constructor(w, h, x, y) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.absoluteX = w * x;
        this.absoluteY = h * y;
        let newCell = document.createElement("div");
        let textContainer = document.createElement("span");

        textContainer.style.fontSize = "187px";
        textContainer.style.color = "white";
        textContainer.style.verticalAlign = "middle";
        textContainer.style.display = "inline-block";
        textContainer.style.marginTop = "calc(50% - 224px / 2)";

        this.TextContainer = textContainer;
        newCell.classList.add("cell");
        newCell.appendChild(textContainer);

        // Set CSS Properties
        newCell.style.width = `${this.width}px`;
        newCell.style.height = `${this.height}px`;
        newCell.style.border = "1px solid white";
        newCell.style.position = "absolute";
        newCell.style.left = `${(this.absoluteX)}px`;
        newCell.style.top = `${(this.absoluteY)}px`;
        newCell.style.textAlign = "center";
        newCell.addEventListener("click", this.onElementClicked);
        this.Element = newCell;
    }

    onElementClicked = () => {
        if (this.onActivate != null) {
            this.onActivate(this);
        }
    }

    setValue = (v) => {
        if (!this.isActive) {
            this.isActive = true;
            this.TextContainer.innerText = v;
        }
    };

    onActivate = null;
}