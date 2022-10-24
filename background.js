const backGrounds = [
    document.getElementById("bg1"),
    document.getElementById("bg2"),
    document.getElementById("bg3"),
    document.getElementById("bg4"),
    document.getElementById("bg5")
];

let currIndex = 0;

function ChangeBackground(direction) {
    if (direction === "right") {
        currIndex++;
    } else {
        currIndex--;
    }

    if (currIndex == 5) {
        currIndex = 0;
    } else if (currIndex == -1) {
        currIndex = 4;
    }

    for (let i = 0; i < backGrounds.length; i++) {
        backGrounds[i].style.left = ((i - currIndex) * 100) + "%";
    }
}

setInterval(ChangeBackground, 4000, "right");