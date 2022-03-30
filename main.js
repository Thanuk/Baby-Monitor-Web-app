status = "";
song = "";
img = "";
object = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Object is detecting";
}

function modelLoaded(){
    console.log("COCOSSD is loaded");
    status = true;
}

function preload(){
    song = loadSound("ringing_old_phone.mp3");
}

function draw(){
    image(video, 0, 0, 640, 420);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);

        for(i = 0; i < object.length; i++){
            if(object[0].label = "person"){
                document.getElementById("Baby_Detected").innerHTML = "Baby Detected";
                document.getElementById("Status").innerHTML = "Object Detected";
                song.stop();
                percent = floor(object[0].confidence * 100);
                fill(r, g, b);
                text(object[0].label + "" + percent + "%", object[0].x + 15, object[0].y + 15);
                noFill();
                stroke(r, g, b);
                rect(object[0].x - 15, object[0].y - 15, object[0].width, object[0].height);
            }
    
            else if(object[0].label = "person"){
                document.getElementById("Baby_Detected").innerHTML = "Baby is not Detected";
                document.getElementById("Status").innerHTML = "Object Detected";
                song.play();
            }    

            if(object.length = 0){
                document.getElementById("Baby_Detected").innerHTML = "Baby is not Detected";
                song.play();
            }
        }
    }
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        object = results;
    }
}