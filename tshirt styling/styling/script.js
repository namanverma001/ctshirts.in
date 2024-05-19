
let canvas = new fabric.Canvas('tshirt-canvas');

function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-color").addEventListener("change", function(){
    document.getElementById("tshirt-div").style.backgroundColor = this.value;
}, false);

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

    // Call the updateTshirtImage method providing as first argument the URL
    // of the image provided by the select
    updateTshirtImage(this.value);
}, false);

// When the user clicks on upload a custom picture
document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
    var reader = new FileReader();
    
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;

        // When the picture loads, create the image in Fabric.js
        imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        };
    };

    // If the user selected a picture, load it
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 46){
        console.log("Removing selected element on Fabric.js on DELETE key !");
        canvas.remove(canvas.getActiveObject());
    }
}, false);

// Define as node the T-Shirt Div
var node = document.getElementById('tshirt-div');

domtoimage.toPng(node).then(function (dataUrl) {
// Print the data URL of the picture in the Console
console.log(dataUrl);

// You can for example to test, add the image at the end of the document
var img = new Image();
img.src = dataUrl;
document.body.appendChild(img);
}).catch(function (error) {
console.error('oops, something went wrong!', error);
});




// Function to merge the T-shirt canvas with background and custom images
function mergeImagesAndDownload() {
    // Create a new canvas to merge the images
    var mergedCanvas = document.createElement('canvas');
    var mergedCanvasContext = mergedCanvas.getContext('2d');

    // Set canvas dimensions to match the T-shirt canvas
    var tshirtCanvas = document.getElementById('tshirt-canvas');
    mergedCanvas.width = tshirtCanvas.width;
    mergedCanvas.height = tshirtCanvas.height;

    // Load background image
    var backgroundImage = new Image();
    backgroundImage.crossOrigin = "anonymous"; // Allowing cross-origin image usage
    backgroundImage.src = document.getElementById("tshirt-backgroundpicture").src;
    backgroundImage.onload = function() {
        // Draw background image on the merged canvas
        mergedCanvasContext.drawImage(backgroundImage, 0, 0, mergedCanvas.width, mergedCanvas.height);

        // Draw custom images from fabric canvas onto merged canvas
        canvas.renderAll(); // Make sure canvas is updated
        var objects = canvas.getObjects();
        objects.forEach(function(obj) {
            var objImg = new Image();
            objImg.src = obj.toDataURL(); // Get the data URL of the object on canvas
            objImg.onload = function() {
                mergedCanvasContext.drawImage(objImg, obj.left, obj.top, obj.width * obj.scaleX, obj.height * obj.scaleY);
            };
        });

        // Trigger download of the merged image
        var downloadLink = document.createElement('a');
        downloadLink.href = mergedCanvas.toDataURL("image/png");
        downloadLink.download = 'custom_tshirt.png';
        downloadLink.click();
    };
}

// Attach event listener to the download button
document.getElementById("download-button").addEventListener("click", mergeImagesAndDownload);
