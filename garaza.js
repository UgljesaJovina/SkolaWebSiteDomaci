const canvas = document.getElementById("canvas");
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const maxSpace = 768;

const ukupno = document.getElementById("ukupno");
const ovajSprat = document.getElementById("ovajSprat");
const curr = document.getElementById("current");

const ctx = canvas.getContext("2d");

function GetParkingPerLevel() {
    let ret = {
        lvl1: Math.floor(Math.random() * 256),
        lvl2: Math.floor(Math.random() * 256),
        lvl3: Math.floor(Math.random() * 256),
        max: maxSpace
    };
    ret.currentlyTaken = ret.lvl1 + ret.lvl2 + ret.lvl3;
    return ret;
}

const parkingPerLevel = GetParkingPerLevel();

function GetTakenPlaces() {
    let ret = {
        lvl1: Array(parkingPerLevel.lvl1).fill().map(() => Math.floor(Math.random() * 256)),
        lvl2: Array(parkingPerLevel.lvl2).fill().map(() => Math.floor(Math.random() * 256)),
        lvl3: Array(parkingPerLevel.lvl3).fill().map(() => Math.floor(Math.random() * 256))
    };
    return ret;
}

const takenPlaces = GetTakenPlaces();

console.log(parkingPerLevel);
console.log(takenPlaces);

function DrawParking(level) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";

    ctx.moveTo(125, 20);
    ctx.lineTo(125, 550);
    ctx.moveTo(365, 20);
    ctx.lineTo(365, 550);
    ctx.moveTo(600, 20);
    ctx.lineTo(600, 550);
    ctx.moveTo(825, 20);
    ctx.lineTo(825, 550);
    ctx.moveTo(1050, 20);
    ctx.lineTo(1050, 550);

    ctx.moveTo(20, 85);
    ctx.lineTo(1150, 85);
    ctx.moveTo(20, 185);
    ctx.lineTo(1150, 185);
    ctx.moveTo(20, 285);
    ctx.lineTo(1150, 285);
    ctx.moveTo(20, 385);
    ctx.lineTo(1150, 385);
    ctx.moveTo(20, 485);
    ctx.lineTo(1150, 485);

    ctx.stroke();

    ctx.lineWidth = 15;

    const startPos = {
        X: [140, 390, 615, 850],
        Y: [105, 165, 205, 265, 305, 365, 405, 465]
    };


    switch (level) {
        case 1:
            for (let i = 0; i < startPos.X.length; i++) {
                for (let j = 0; j < startPos.Y.length; j++) {
                    let x = 0;
                    for (let k = 0; k < 7; k++) {
                        ctx.beginPath();
                        if (takenPlaces.lvl1.includes(k + j * 7 + i * startPos.Y.length * 7)) {
                            ctx.strokeStyle = "#FF0000";
                        } else {
                            ctx.strokeStyle = "#0000FF";
                        }
                        ctx.moveTo(startPos.X[i] + x, startPos.Y[j]);
                        ctx.lineTo(startPos.X[i] + 15 + x, startPos.Y[j]);
                        x += 29;
                        ctx.stroke();
                    }
                }

            }
            break;
        case 2:
            for (let i = 0; i < startPos.X.length; i++) {
                for (let j = 0; j < startPos.Y.length; j++) {
                    let x = 0;
                    for (let k = 0; k < 7; k++) {
                        ctx.beginPath();
                        if (takenPlaces.lvl2.includes(k + j * 7 + i * startPos.Y.length * 7)) {
                            ctx.strokeStyle = "#FF0000";
                        } else {
                            ctx.strokeStyle = "#0000FF";
                        }
                        ctx.moveTo(startPos.X[i] + x, startPos.Y[j]);
                        ctx.lineTo(startPos.X[i] + 15 + x, startPos.Y[j]);
                        x += 29;
                        ctx.stroke();
                    }
                }

            }
            break;
        case 3:
            for (let i = 0; i < startPos.X.length; i++) {
                for (let j = 0; j < startPos.Y.length; j++) {
                    let x = 0;
                    for (let k = 0; k < 7; k++) {
                        ctx.beginPath();
                        if (takenPlaces.lvl3.includes(k + j * 7 + i * startPos.Y.length * 7)) {
                            ctx.strokeStyle = "#FF0000";
                        } else {
                            ctx.strokeStyle = "#0000FF";
                        }
                        ctx.moveTo(startPos.X[i] + x, startPos.Y[j]);
                        ctx.lineTo(startPos.X[i] + 15 + x, startPos.Y[j]);
                        x += 29;
                        ctx.stroke();
                    }
                }

            }
            break;
    }
}

let currParking = 1;

DrawParking(currParking);

console.log(parkingPerLevel.max - parkingPerLevel.currentlyTaken);

ukupno.innerHTML = `Slobodnih mesta: ${parkingPerLevel.max - parkingPerLevel.currentlyTaken}/${parkingPerLevel.max}`;
ovajSprat.innerHTML = `Mesta na ovom spratu: ${256 - parkingPerLevel[Object.keys(parkingPerLevel)[currParking - 1]]}/256`;

function SwitchParkingView(dir) {
    if (dir === -1) {
        if (currParking === 1) {
            return;
        } else {
            currParking -= 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            curr.innerHTML = currParking;
            ovajSprat.innerHTML = `Mesta na ovom spratu: ${256 - parkingPerLevel[Object.keys(parkingPerLevel)[currParking - 1]]}/256`;
            DrawParking(currParking);
        }
    } else if (dir === 1) {
        if (currParking === 3) {
            return;
        } else {
            currParking += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            curr.innerHTML = currParking;
            ovajSprat.innerHTML = `Mesta na ovom spratu: ${256 - parkingPerLevel[Object.keys(parkingPerLevel)[currParking - 1]]}/256`;
            DrawParking(currParking);
        }
    }
}