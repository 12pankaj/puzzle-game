//body load after function call
function load() {
  alert(
    "Click on the tiles around the empty tile to move them and complete the puzzle."
  );
}
var images = [
  [7, 5, 2, 1, 8, 4, 6, 3, 9],
  [1, 2, 9, 4, 7, 3, 5, 6, 8],
  [1, 9, 8, 6, 3, 7, 2, 4, 5],
  [8, 2, 5, 4, 3, 7, 1, 6, 9],
  [5, 7, 3, 9, 2, 4, 8, 6, 1],
  [2, 4, 9, 6, 7, 5, 1, 8, 3],
  [1, 3, 2, 6, 4, 7, 5, 8, 9],
  [8, 3, 7, 5, 6, 4, 1, 2, 9],
  [2, 8, 9, 7, 1, 5, 6, 3, 4],
  [6, 8, 7, 1, 4, 2, 9, 3, 5],
];
// code for suffling array
var a = 1;
var arr = [];
do {
  var r = Math.trunc(Math.random() * 10);
  var b = 0;
  while (b <= a) {
    if (arr[b] == r) {
      r = Math.trunc(Math.random() * 10);
      b = -1;
    }
    b++;
  }
  arr[a - 1] = r;
  a++;
} while (a <= 10);
let randimg = [];
for (let val of arr) {
  randimg.push(images[val]);
}
images = randimg;
var rand = Math.trunc(Math.random() * 9); //random number generate
var move = 0;
var butbox = document.getElementById("randbutton");
var image = document.getElementById("image");
var moves = document.getElementById("moves");
moves.innerText = "Moves : " + move;
image.innerHTML = "<img src='im" + rand + "/main.jpg' id='myimage'/>";
//random images add on buttonbox
for (var i = 0; i < images[rand].length; i++) {
  if (i == 3 || i == 6) butbox.append(document.createElement("br"));
  var but = document.createElement("button");
  but.classList.add("col-4", "p-2", "bg-dark");
  but.setAttribute("onclick", "value1(" + i + ")");
  if (images[rand][i] == 9) but.innerHTML = '<img src=" ">';
  else
    but.innerHTML = "<img src='im" + rand + "/" + images[rand][i] + ".jpg'/>";
  butbox.append(but);
}
var btn = document.getElementsByTagName("button");
var click = new Audio("key.mpeg");
//function that fires on click
function value1(y) {
  click.pause();
  var co = btn[y].innerHTML;
  //check image not equal blanck
  if (btn[y].innerHTML != '<img src=" ">') {
    let valid = false;
    var chanceindex = [y + 1, y - 1, y + 3, y - 3];
    //Loop will check if the slide next to the image is blank.
    for (var i of chanceindex) {
      if (i >= 0 && i <= 8 && btn[i].innerHTML == '<img src=" ">') {
        btn[i].innerHTML = co;
        btn[y].innerHTML = '<img src=" ">';
        valid = true;
        wincheck();
      }
    }
    if (valid) {
      click.play();
      move++;
      moves.innerText = "Moves : " + move;
    }
  }
}
//function for check player complete the puzzle or not
function wincheck() {
  if (
    btn[8].innerHTML == '<img src=" ">' &&
    btn[0].innerHTML == `<img src="im${rand}/1.jpg">` &&
    btn[2].innerHTML == `<img src="im${rand}/3.jpg">` &&
    btn[6].innerHTML == `<img src="im${rand}/7.jpg">` &&
    btn[3].innerHTML == `<img src="im${rand}/4.jpg">` &&
    btn[4].innerHTML == `<img src="im${rand}/5.jpg">`
  ) {
    var i = 0;
    while (i != 9) {
      btn[i].classList.add("p-0");
      btn[i].classList.remove("p-2");
      btn[i].innerHTML = `<img src="im${rand}/${i + 1}.jpg">`;
      i++;
    }
    if (btn[8].innerHTML == `<img src="im${rand}/9.jpg">`) {
      setTimeout(() => {
        var res = confirm(
          "Congratulations!\nPuzzle Complete \nYour Total Moves = " +
            move +
            '\n"You Play Again "'
        );
        if (res) {
          location.reload();
        } else {
          alert("Thanks for playing this game");
        }
      }, 3000);
    }
  }
}
