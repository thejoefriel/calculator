"use strict mode"

let screen = document.getElementById("screen"); 
let output = "";
let equal = false;

// keyboard input
window.addEventListener("keydown", event => {

    // keycodes

    const operatorCodes = {
        189: "subtract",
        191: "divide",
        187: "equals",
        190: "decimal",
        8: "backspace",
        13: "equals"   
    };

    // keycodes requiring shift
    const shiftOperatorCodes = {
        56: "multiply", 
        187: "add",
    }
    

    // numbers
    if (event.key >= "0" && event.key <= "9") {
        let list = ['zero', 'one', 'two', 'three', 'four', 'five', 
                    'six', 'seven', 'eight', 'nine']
        let name = list[event.key]
        let button = document.getElementById(name);
        button.click();
    }  
    // operators & decimal
    else if (event.keyCode >= 189 && event.keyCode <= 191 || event.keyCode == 8 || event.keyCode == 13) {
        let name = operatorCodes[event.keyCode];
        let button = document.getElementById(name);
        button.click();
        event.preventDefault();
    }
    // shift operators
    else if (event.keyCode == 56 && event.shiftKey || event.keyCode == 187 && event.shiftKey) {
        let name = shiftOperatorCodes[event.keyCode];
        let button = document.getElementById(name);
        button.click();
    }

});


// Insert numbers onto screen
let num = document.querySelectorAll(".num-button");

    for(let i=0; i < num.length; i++) {
        num[i].addEventListener("click", function() {
             if(output.length == 0) {
                screen.innerHTML = num[i].value;
                output = num[i].value;
                if(num[i].id === "zero") {
                    screen.innerHTML = 0;
                    output = "";
                }
            } else if(equal == true && store == "") {
                screen.innerHTML = num[i].value;
                output = num[i].value;
                equal = false;
                if(num[i].id === "zero") {
                    screen.innerHTML = 0;
                    output = "";
                }
            } 
            else {
                if (screen.innerHTML == "0.") {
                    output = output.concat(num[i].value);
                    screen.innerHTML = output;
                } 
                else if (output.length > 39) {
                    alert("You have entered the max number of digits allowed");
                }
                else {
                    output = screen.innerHTML.concat(num[i].value);
                    screen.innerHTML = output;
                }
                
            } 
            outputSize();
        })
    }

// responsive font size output
    function outputSize () {
    let count = screen.innerHTML;
    if (count.length <= 5) {
        document.getElementById("screen").style.fontSize = "4em";
    } if (count.length > 5 && count.length <= 8) {
        document.getElementById("screen").style.fontSize = "3em";
    } if (count.length > 8 && count.length <= 14) {
        document.getElementById("screen").style.fontSize = "2em";
    } if (count.length > 14 && count.length <= 20) {
        document.getElementById("screen").style.fontSize= "1em";
    } if (count.length > 20) {
        document.getElementById("screen").style.fontSize= "smaller";
    } 
}



// Add decimal
let decimal = document.getElementById("decimal")
let decimalRegex = /\./;

decimal.addEventListener("click", function() {
    if(output == "" || screen.innerHTML == 0 || equal == true) {
        screen.innerHTML = "0.";
        output = "0.";
        equal = false;
    } else if(decimalRegex.test(output) != true) {
        output = screen.innerHTML.concat(".");
        screen.innerHTML = output;
    }
})


// All Clear operation
let allClear = document.getElementById("all-clear"); 

allClear.addEventListener("click", function() {
    screen.innerHTML = 0;
    output = "";
    store = "";
    equal = false;
    outputSize();
    removeColor();
})

// Clear operation

let clear = document.getElementById("clear");

clear.addEventListener("click", function() {
    screen.innerHTML=0;
    output = "";
    equal = false;
    outputSize();
})


// Backspace operation
let backspace = document.getElementById("backspace");

backspace.addEventListener("click", function() {
    if (screen.innerHTML.length == 1) {
        screen.innerHTML = 0;
        output = "";
    } else {
        output = screen.innerHTML.slice(0, -1);
        screen.innerHTML = output;
    }
    outputSize();
})

// Add/Sub/Multiply/Divide/Equals operation
let op = document.querySelectorAll(".op-button");
let store = "";
let symbolRegex = /\W/

for(let i=0; i < op.length; i++) {
    op[i].addEventListener("click", function() {
        // add/subtract/multiply/divide & stores value
        if(op[i].id == "add" || op[i].id == "subtract" || op[i].id == "multiply" || op[i].id == "divide") {
            if (this.name === store.charAt(store.length -1) && output == "") {
                false;
            }  
            else if (this.name != store.charAt(store.length -1) && symbolRegex.test(store.charAt(store.length -1)) && output == "") {
                let lastOp = document.getElementsByName(store.charAt(store.length -1));
                lastOp[0].style.background = "";
                store = store.slice(0,-1).concat(this.name);
                op[i].style.background = "hsl(330, 45%, 40%)";
            } 
            else { 
                if (store.length > 0) {
                    let lastOp = document.getElementsByName(store.charAt(store.length -1));
                    lastOp[0].style.background = "";
                    store = store.concat(output, this.name);
                    output = "";
                    op[i].style.background = "hsl(330, 45%, 40%)";
                } else {
                    if (output == "") {
                        store = store.concat("0", this.name);
                    } else {
                        store = store.concat(output, this.name);
                    }
                    output = "";
                    op[i].style.background = "hsl(330, 45%, 40%)";
                }
            }
        }
        // equals function
            else if(op[i].id == "equals") {
                if (output == "" && symbolRegex.test(store.charAt(store.length -1))) {
                    store = store.slice(0,-1);
                }
            store = store.concat(output);
            screen.innerHTML = eval(store);
            output = eval(store);
            equal = true;
            store = "";
            removeColor();
        } 
        outputSize();
    })
}

// plus-minus operation
let plusMinus = document.getElementById("plus-minus")
const display = screen.innerHTML;

plusMinus.addEventListener("click", function() {
    if(output == 0) {
        false;
    } else if(output > 0) {
        output = "-" + screen.innerHTML;
        screen.innerHTML = output;
    } else {
        output = screen.innerHTML.substring(1);
        screen.innerHTML = output;
    }
})

// percent operation
let percent = document.getElementById("percent")
let percentRegex = /^[0\.]/;

percent.addEventListener("click", function() {
    if(output == 0) {
        false;
    } else if(percentRegex.test(output) == true) {
        screen.innerHTML = output.replace("0.", "0.00");
        output = screen.innerHTML;
    } else {
        screen.innerHTML = output/100;
        output = screen.innerHTML;
    }
    outputSize();
})




// remove coloured operator function even when it's not the last element
function removeColor() {
    for(let i=0; i < op.length; i++) {
        if (op[i].style.background != "") {
            return op[i].style.background = "";
        }
    }
}




const total = 150;
let space = document.getElementById("space");

for (let i=0; i<total; i++) {
    let s = document.createElement("new-star");
    s.className = "star";
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.transform = `scale(${Math.random()})`;
    s.style.animation = `twinkle ${(Math.random() * 10)+1}s infinite alternate`;
    space.appendChild(s);
}

// launch button

let launch = document.getElementById("launch");
let earth = document.getElementById("earth");

launch.addEventListener("click", function() {
    if(launch.value == "LAUNCH") {
        space.style.animation = "space-in 10s forwards";
        earth.style.animation = "earth-out 10s forwards";
        return launch.setAttribute("value", "LAND");
    } else if (launch.value == "LAND") {
        space.style.animation = "space-out 10s forwards";
        earth.style.animation = "earth-in 10s forwards";
        return launch.setAttribute("value", "LAUNCH");
    }
   
    
})
 

