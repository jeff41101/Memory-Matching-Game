//var em = ["💐", "🌹", "🌻", "🏵️", "🌺", "🌴", "🌈", "🍓", "🍒", "🍎", "🍉", "🍊", "🥭", "🍍", "🍋", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🌶️", "🍄", "🧅", "🥦", "🥑", "🍔", "🍕", "🧁", "🎂", "🍬", "🍩", "🍫", "🎈"];
var em = [];
//Shuffling above array
for (var n = 19; n > 0; n--) {
    var str = `Images/img${n - 1}.png`;
    em.push(str);
}

var tmp, c, p = em.length;
if (p) while (--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = em[c];
   em[c] = em[p];
   em[p] = tmp;
}
console.log(em);
//Variables
var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", time, mode;
var obj;

//Resizing Screen
window.onresize = init;
function init() {
   W = innerWidth;
   H = innerHeight;
   $('body').height(H+"px");
   $('#ol').height(H+"px");
}

//Showing instructions
window.onload = function() {
    //$("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button><button onclick="start(5, 6)">5 x 6</button><button onclick="start(6, 6)">6 x 6</button></center>`);
    $("#ol").html(`<center><div id="inst"><h3>Welcome !</h3>Instructions For Game<br/><br/><li>Make pairs of similiar blocks by flipping them.</li><li>To flip a block you can click on it.</li><li>If two blocks you clicked are not similar, they will be flipped back.</li><p style="font-size:18px;">Click one of the following mode to start the game.</p></div><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button></center>`);
}

//Starting the game
function start(r, l) {
    // Getting data from json
    var mydata = JSON.parse(data);
    console.log('mydata = ' + mydata);

    //Timer and moves
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    mode = r+"x"+l;
    //Generating item array and shuffling it
    var items = [];
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }
    console.log('items =' + items);
    // Grabbing the numbers of new item array
    var itemNumbers = [];
    for (var i=0;i<items.length;i++) {
        itemNumbers.push(parseInt(items[i].substring(10, items[i].length - 4), 10));
    }

    console.log(itemNumbers);
    console.log(itemNumbers[0]);
    console.log(typeof itemNumbers);
    //Creating table
    $("table").html("");
    var n = 1;
    var m = 0;

    for (var i = 1; i <= r; i++) {
            $("table").append("<tr>");
        for (var j = 1; j <= l; j++) {

            m = itemNumbers[n - 1];
            // Testing
            //console.log('n =' +n);  
            //console.log('itemNumbers = ' + itemNumbers);
            //console.log('m =' +m);
            //console.log(mydata[m].name);
            //console.log(mydata[m].link);

            $("table").append(
                `<td id='${n}' onclick="change(${n})">
                <div class='inner'>
                    <div class='front'></div>
                    <div class='back container'><img class="image" id ="img${n}" src=${items[n-1]}>
                        <div class="middle" id ="div${n}" style="display:none">
                            <input class="text" type="button" onclick="javascript:window.open('${mydata[m].link}')" value="${mydata[m].name}" />
                        </div>
                    </div>
                </div>
            </td>`);
            n++;
        }
        $("table").append("</tr>");
    }

    //Hiding instructions screen
    $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#" + x + " .inner .back";

    console.log('i =' + i);
    console.log('f =' + f);
    console.log('b =' + b);

    console.log(turn);
    console.log($(i).attr("flip"));
    console.log(ppID);
  
  //Dont flip for these conditions
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}
  
  //Flip
  else {
    $(i).css(t, flip);
    if (turn==1) {
      //This value will prevent spam clicking
      turn=2;
      blockStr = 'div' + x;
      str = 'img' + x;
      pre2 = document.getElementById(str).src;
      card2El = document.getElementById(str);
      card2 = document.getElementById(blockStr);
      //If both flipped blocks are not same
      if (pre!=pre2) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
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
      
      setTimeout(function() {
         turn=0;
         //Increase moves
         moves++;
         $("#moves").html("Moves: "+moves);
      },1150);
      
    }
    else {
        str = 'img' + x;
        blockStr = 'div' + x;
        pre = document.getElementById(str).src;
        cardEl = document.getElementById(str);
        card = document.getElementById(blockStr);
        console.log(pre);
        ppID = x;
        pID = "#"+x+" .inner";
        turn=1;
    }
    
    //If all pairs are matched
    if (rem==0) {
          clearInterval(time);
          if (min==0) {
              time = `${sec} seconds`;
          }
          else {
              timeInSec = min * 60 + sec;
              time = `${timeInSec} second(s)`
              //time = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>Congrats!</h2><p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p><p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p><button onclick="start(3, 4)">3 x 4</button> <button onclick="start(4, 4)" style="w">4 x 4</button><button onclick="start(4, 5)">4 x 5</button>`);
              var stats = { moves: moves, time: time };
              window.parent.postMessage(stats, '*');
              $("#ol").fadeIn(750);
          }, 1500);
    }
  }
}