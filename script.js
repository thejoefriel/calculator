let screen = document.getElementById("screen"); 
let output = "";
let equal = false;

// Insert numbers onto screen
let num = document.querySelectorAll(".num-button");

    for(let i=0; i < num.length; i++) {
        num[i].addEventListener("click", function() {
             if(output.length == 0) {
                screen.innerHTML = num[i].value;
                output = num[i].value;
            } else if(equal == true && store == "") {
                screen.innerHTML = num[i].value;
                output = num[i].value;
                equal = false;
            } 
            else {
                if (screen.innerHTML == "0.") {
                    output = output.concat(num[i].value);
                    screen.innerHTML = output;
                } else {
                    output = screen.innerHTML.concat(num[i].value);
                    screen.innerHTML = output;
                }
                
            } 
            // responsive font size 
            let count = screen.innerHTML;
            if (count.length <= 8) {
                document.getElementById("screen").style.fontSize = "4em";
            } if (count.length > 8 && output.length <= 12) {
                document.getElementById("screen").style.fontSize = "3em";
            } if (count.length > 12 && output.length <= 18) {
                document.getElementById("screen").style.fontSize = "2em";
            } if (count.length > 18) {
                document.getElementById("screen").style.fontSize= "smaller";
            }
        })
    }

// Add decimal
let decimal = document.getElementById("decimal")
let testRegex = /\./;

decimal.addEventListener("click", function() {
    if(output == "" || screen.innerHTML == 0 || equal == true) {
        screen.innerHTML = "0.";
        output = "0.";
        equal = false;
    } else if(testRegex.test(output) != true) {
        output = screen.innerHTML.concat(".");
        screen.innerHTML = output;
    }
})


// All Clear operation
let allClear = document.getElementById("all-clear"); 

allClear.addEventListener("click", function() {
    document.getElementById("screen").style.fontSize = "4em";
    screen.innerHTML = 0;
    output = "";
    store = "";
    equal = false;
})

// Backspace operation
let backspace = document.getElementById("backspace");

backspace.addEventListener("click", function() {
    if (screen.innerHTML.length == 1) {
        document.getElementById("screen").style.fontSize = "4em";
        screen.innerHTML = 0;
    } else {
        output = screen.innerHTML.slice(0, -1);
        screen.innerHTML = output;
    }
    
})

// Add/Sub/Multiply/Divide/Equals operation
let op = document.querySelectorAll(".op-button");
let store = "";

for(let i=0; i < op.length; i++) {
    op[i].addEventListener("click", function() {
        // add/subtract/multiply/divide & stores value
        if(op[i].id == "add" || op[i].id == "subtract" || op[i].id == "multiply" || op[i].id == "divide") {
            store = store.concat(output, this.name);
            output = "";
        }
        // equals function
            else if(op[i].id == "equals") {
            store = store.concat(output);
            screen.innerHTML = eval(store);
            output = eval(store);
            equal = true;
            store = "";
        }
    })
}

// plus-minus operation
let plusMinus = document.getElementById("plus-minus")

plusMinus.addEventListener("click", function() {
    if(output.charAt(0) != "-") {
        output = "-" + screen.innerHTML;
        screen.innerHTML = output;
    }
    else {
        output = screen.innerHTML.substring(1);
        screen.innerHTML = output;
    }
})



