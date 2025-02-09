// DynamoDB Version
// jQuery.extend({
//   getImage: function () {
//     let result = null;
//     $.ajax({
//       url: "https://wjuc7h96k7.execute-api.ap-northeast-1.amazonaws.com/dev/GetImage",
//       method: "POST",
//       timeout: 0,
//       headers: {
//         Accept: "application/json",
//         "x-api-key": "WHJzpbI0r29A01Hbsg5H776YNuyWe5FI5XCgplRu",
//       },
//       async: false,
//       success: function (data) {
//         result = data;
//       },
//     });
//     return result;
//   },
// });

jQuery.extend({
  getImage: function () {
    let result = null;
    $.ajax({
      url: "https://7wda3149g7.execute-api.ap-northeast-1.amazonaws.com/dev/GetImages",
      method: "POST",
      timeout: 0,
      headers: {
        Accept: "application/json",
        "x-api-key": "WvaKUMz6q5aH6DtSdOWXO5HxIQnOrzfJ3apbIo4F",
      },
      async: false,
      success: function (data) {
        result = data["result"];
      },
    });
    return result;
  },
});

let results = $.getImage();
console.log(`results = ${results}`);

//var em = ["💐", "🌹", "🌻", "🏵️", "🌺", "🌴", "🌈", "🍓", "🍒", "🍎", "🍉", "🍊", "🥭", "🍍", "🍋", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🌶️", "🍄", "🧅", "🥦", "🥑", "🍔", "🍕", "🧁", "🎂", "🍬", "🍩", "🍫", "🎈"];
let em = [];
//Shuffling above array
for (var n = results.length; n > 0; n--) {
  var str = `${n - 1}`;
  em.push(str);
}
console.log(`em = ${em}`);

let tmp,
  c,
  p = em.length;
if (p)
  while (--p) {
    c = Math.floor(Math.random() * (p + 1));
    tmp = em[c];
    em[c] = em[p];
    em[p] = tmp;
  }
//Variables
var pre = "",
  pID,
  ppID = 0,
  turn = 0,
  t = "transform",
  flip = "rotateY(180deg)",
  flipBack = "rotateY(0deg)",
  time,
  mode;
var obj;

//Resizing Screen
window.onresize = init;
function init() {
  W = innerWidth;
  H = innerHeight;
  $("body").height(H + "px");
  $("#ol").height(H + "px");
}

//Showing instructions
window.onload = function () {
  //$("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></center>`);
  // $("#ol").html(
  //   `<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></center>`
  // );
  $("#ol").html(
    `<center><div id="inst"><h1>🔺MOXA LOYALTY TEST🔺</h1></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></center>`
  );
};

function cloneToNewTab() {
  const content = document.documentElement.outerHTML;
  const newWindow = window.open("", "_blank");
  newWindow.document.write(content);
  newWindow.document.close();
}

//Starting the game
function start(r, l) {
  // Getting data from json
  var mydata = JSON.parse(data);
  console.log("mydata = " + mydata);

  //Timer and moves
  (min = 0), (sec = 0), (moves = 0);
  $("#time").html("Time: 00:00");
  $("#moves").html("Moves: 0");
  time = setInterval(function () {
    sec++;
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (sec < 10) $("#time").html("Time: 0" + min + ":0" + sec);
    else $("#time").html("Time: 0" + min + ":" + sec);
  }, 1000);
  (rem = (r * l) / 2), (noItems = rem);
  mode = r + "x" + l;
  //Generating item array and shuffling it
  var items = [];
  for (var i = 0; i < noItems; i++) items.push(em[i]);
  for (var i = 0; i < noItems; i++) items.push(em[i]);
  var tmp,
    c,
    p = items.length;
  if (p)
    while (--p) {
      c = Math.floor(Math.random() * (p + 1));
      tmp = items[c];
      items[c] = items[p];
      items[p] = tmp;
    }
  console.log("items =" + items);
  // Grabbing the numbers of new item array
  var itemNumbers = [];
  for (var i = 0; i < items.length; i++) {
    itemNumbers.push(parseInt(items[i].substring(10, items[i].length - 4), 10));
  }

  // console.log(itemNumbers);
  // console.log(itemNumbers[0]);
  // console.log(typeof itemNumbers);
  //Creating table
  $("table").html("");
  var n = 1;
  var m = 0;
  var num = 1;
  for (var i = 1; i <= r; i++) {
    $("table").append("<tr>");
    for (var j = 1; j <= l; j++) {
      m = itemNumbers[n - 1];
      $("table").append(
        `<td id='${n}' onclick="change(${n})">
                <div class='inner'>
                    <div class='front' style="text-align: center;">${num}</div>
                    <div class='back container'><img class="image" id ="img${n}" src=${
          results[itemNumbers[n - 1]].img_base64
        }>
                        <div class="middle" id ="div${n}" style="display:none">
                          <input class="text" type="button" onclick="javascript:window.open('${
                            results[m].Link
                          }')" value="${results[m].Name}" />
                    </div>
                    </div>
                </div>
            </td>`
      );
      n++;
      num++;
    }
    $("table").append("</tr>");
  }

  //Hiding instructions screen
  $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#" + x + " .inner";
  let f = "#" + x + " .inner .front";
  let b = "#" + x + " .inner .back";

  console.log("i =" + i);
  console.log("f =" + f);
  console.log("b =" + b);

  console.log(turn);
  console.log($(i).attr("flip"));
  console.log(ppID);

  //Dont flip for these conditions
  if (turn == 2 || $(i).attr("flip") == "block" || ppID == x) {
  }

  //Flip
  else {
    $(i).css(t, flip);
    if (turn == 1) {
      //This value will prevent spam clicking
      turn = 2;
      blockStr = "div" + x;
      str = "img" + x;
      pre2 = document.getElementById(str).src;
      card2El = document.getElementById(str);
      card2 = document.getElementById(blockStr);
      //If both flipped blocks are not same
      if (pre != pre2) {
        setTimeout(function () {
          $(pID).css(t, flipBack);
          $(i).css(t, flipBack);
          ppID = 0;
        }, 1000);
      }

      //If blocks flipped are same
      else {
        rem--;
        $(i).attr("flip", "block");
        $(pID).attr("flip", "block");
        // reveal the button & link to the description
        card.style.display = "block";
        card2.style.display = "block";
        cardEl.parentNode.classList.add("blurry");
        card2El.parentNode.classList.add("blurry");
      }

      setTimeout(function () {
        turn = 0;
        //Increase moves
        moves++;
        $("#moves").html("Moves: " + moves);
      }, 1150);
    } else {
      str = "img" + x;
      blockStr = "div" + x;
      pre = document.getElementById(str).src;
      cardEl = document.getElementById(str);
      card = document.getElementById(blockStr);
      console.log(pre);
      ppID = x;
      pID = "#" + x + " .inner";
      turn = 1;
    }

    //If all pairs are matched
    if (rem == 0) {
      clearInterval(time);
      if (min == 0) {
        time = `${sec} seconds`;
      } else {
        timeInSec = min * 60 + sec;
        time = `${timeInSec} second(s)`;
        //time = `${min} minute(s) and ${sec} second(s)`;
      }
      // Call the function to achieve the desired behavior
      cloneToNewTab();
      setTimeout(function () {
        // const centerElements = document.querySelectorAll("center");
        // let targetCenterElement = null;

        // for (let center of centerElements) {
        //   if (center.querySelector("table[cellspacing]")) {
        //     targetCenterElement = center;
        //     break;
        //   }
        // }
        // const newBlock = document.createElement("div");
        // newBlock.innerHTML = `<center><div id="iol" style="background:#4481eb"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button>`; // replace with your desired content

        // if (targetCenterElement) {
        //   targetCenterElement.parentNode.insertBefore(
        //     newBlock,
        //     targetCenterElement.nextSibling
        //   );
        // }
        $("#ol").html(
          `<center><div id="iol"><center><div id="inst" style="background:#4481eb"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p></div></center><button style="background:#4481eb" onclick="start(3, 4)">3 x 4</button> <button style="background:#4481eb" onclick="start(4, 4)" style="w">4 x 4</button><button style="background:#4481eb" onclick="start(4, 5)">4 x 5</button></div></center>`
        );
        console.log("sent to the iframe!");
        var stats = { moves: moves, time: time };
        window.parent.postMessage(stats, "*");
        $("#ol").fadeIn(750);
      }, 1500);
    }
  }
}
