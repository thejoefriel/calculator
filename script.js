let screen = document.getElementById("screen"); 
let output;
let equal = false;

// Insert numbers onto screen
let num = document.querySelectorAll(".num-button");

    for(let i=0; i < num.length; i++) {
        num[i].addEventListener("click", function() {
             if(screen.innerHTML == 0 || output == 0) {
                screen.innerHTML = num[i].value;
                output = num[i].value;
            } else if(equal == true && store == "") {
                screen.innerHTML = num[i].value;
                output = num[i].value;
                equal = false;
            } 
            else {
                output = screen.innerHTML += num[i].value;
                screen.innerHTML = output;
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


// All Clear operation
let allClear = document.getElementById("all-clear"); 

allClear.addEventListener("click", function() {
    document.getElementById("screen").style.fontSize = "4em";
    screen.innerHTML = 0;
    output = 0;
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
        // this stores the value so you can keep adding further values
        // and operators
        if(op[i].id != "equals") {
            store = store.concat(output, this.name);
            output = 0;
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

// STILL NEED TO FIX AFTER EQUALS WHEN YOU JUST PRESS NUMBER





