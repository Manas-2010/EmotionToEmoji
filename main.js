prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 99,
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

console.log("ml5version = ", ml5.version);

classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/e1DKiQpen/model.json", modelLoad);

function modelLoad() {
    console.log("Model Loaded!");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img , gotresult);
}

function gotresult(error , result) {
    if (error) {
        console.error(error);
    }
    
    else{
         document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;

        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if (result[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128512";
        }

        if (result[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128512";
        }

        if (result[0].label == "Crying") {
            document.getElementById("update_emoji").innerHTML = "&#128546";
        }

        if (result[1].label == "Crying") {
            document.getElementById("update_emoji2").innerHTML = "&#128546";
        }

        if (result[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545";
        }

        if (result[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545";
        }

        if (result[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128543";
        }

        if (result[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128543";
        }
    }
}