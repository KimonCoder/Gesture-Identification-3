prediction_1 = "";
Webcam.set({
    height: 300,
    width: 310,
    image_format: 'png',
    png_quality: 100
});
Webcam.attach('#webcam');

function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("snapshot").innerHTML = '<img id="i1" src="' + data_uri + '">';
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zKOOvozZw/model.json", modelLoaded);

function modelLoaded() {
    console.log("modelloaded");
}

function speak() {
    var Synth = window.speechSynthesis;
    utterThis = "Prediction 1 is" + prediction_1;
    details = new SpeechSynthesisUtterance(utterThis);
    Synth.speak(details);
}

function check() {
    img = document.getElementById("i1");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        prediction_1 = results[0].label;
        document.getElementById("prediction1_nam").innerHTML = results[0].label;
        speak();
        if (results[0].label == "Victory") {
            document.getElementById("prediction1_emo").innerHTML = "&#9996;";
        }
        if (results[0].label == "Best") {
            document.getElementById("prediction1_emo").innerHTML = "&#128077;";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("prediction1_emo").innerHTML = "&#128076;";
        }
    }
}