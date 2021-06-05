prediction_1 = ""
prediction_2 = ""

Webcam.set({
    height:300,
    width:350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function snapshot(){

Webcam.snap(function(data_uri){

    document.getElementById("result").innerHTML = '<img src ="'+data_uri+'" id = "captured_image"/>';
})

}

console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/89hwWCnu0/', modelloaded);

function modelloaded(){

console.log("model is loaded")

}

function speak(){

synth = window.speechSynthesis;
speak_data1 = "The prediction is"+prediction_1;
speak_data2 = "and the second prediction is"+prediction_2;
utterthis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utterthis);

}

function predict(){

    img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);

}

function gotresult(error, results){

if(error){
console.error(error)
}
else{

    console.log(results);

document.getElementById("emotion_name").innerHTML = results[0].label;
document.getElementById("emotion_name2").innerHTML = results[1].label;

prediction_1 = results[0].label;
prediction_2 = results[1].label;

speak()

if(results[0].label == "thumbs down"){

document.getElementById("emoji").innerHTML = "&#128078;";
}



if(results[0].label == "thumbs up"){

    document.getElementById("emoji2").innerHTML = "&#128077;";
    }



    if(results[0].label == "wow"){

        document.getElementById("emoji").innerHTML = "&#128076;";
        }




    
}

}