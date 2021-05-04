var container = document.getElementById("container");
var goBtn = document.getElementById("go");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
var rowCount = 8;
var colCount = 8;
let pathObj = {};

var rows = new Array(rowCount);
rows.fill(new Array(colCount));

rows = rows.map((row, rowNum) => {
  row.fill(1);
  return row.map((col, colNum) => {
    return `${String.fromCharCode(65 + rowNum)}${colNum + 1}`;
  });
});

rowStr = rows.reduce((fr, r) => {
  let colStr = r.reduce((fc, c) => {
    return `${fc}<div class="col">${c}</div>`;
  }, "");
  return `${fr}<div class="row ">${colStr}</div>`;
}, "");

container.innerHTML = rowStr;

var figure = () => {
  removeColor();
  path(start.value.toUpperCase(), end.value.toUpperCase());
  color();
};

function path(start, end) {
  let startAlpha = start.split("")[0].charCodeAt(0);
  let startNumb = start.split("")[1];
  let endAlpha = end.split("")[0].charCodeAt(0);
  let endNumb = end.split("")[1];

  // example (for a-b)
  if (startAlpha <= endAlpha) {
    for (let i = startAlpha; i <= endAlpha; i++) {
      if (i === endAlpha) {
        if (startNumb === endNumb) {
          pathObj[`${String.fromCharCode(i)}${endNumb}`] = true;
        } else if (startNumb < endNumb) {
          for (let j = startNumb; j <= endNumb; j++) {
            pathObj[`${String.fromCharCode(i)}${j}`] = true;
          }
        } else {
          for (let k = startNumb; k >= endNumb; k--) {
            pathObj[`${String.fromCharCode(i)}${k}`] = true;
          }
        }
        break;
      } else {
        pathObj[`${String.fromCharCode(i)}${startNumb}`] = true;
      }
    }

    //for example b-a
  } else {
    for (let i = startAlpha; i >= endAlpha; i--) {
      if (i === endAlpha) {
        if (startNumb === endNumb) {
          pathObj[`${String.fromCharCode(i)}${endNumb}`] = true;
        } else if (startNumb < endNumb) {
          for (let j = startNumb; j <= endNumb; j++) {
            pathObj[`${String.fromCharCode(i)}${j}`] = true;
          }
        } else {
          for (let k = startNumb; k >= endNumb; k--) {
            pathObj[`${String.fromCharCode(i)}${k}`] = true;
          }
        }
        break;
      } else {
        pathObj[`${String.fromCharCode(i)}${startNumb}`] = true;
      }
    }
  }
}
function color() {
  let divs = container.querySelectorAll("div");
  for (let div of divs) {
    div.innerText in pathObj ? (div.style.backgroundColor = "green") : null;
  }
}

goBtn.onclick = figure;
