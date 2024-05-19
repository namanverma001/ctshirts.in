let canvasFront = new fabric.Canvas('tshirt-canvas-front');
let canvasBack = new fabric.Canvas('tshirt-canvas-back');
let currentCanvas = canvasFront;

function updateSelectedObjectProps(prop, value) {
    var activeObject = currentCanvas.getActiveObject();
    if (activeObject) {
        activeObject.set(prop, value).setCoords();
        currentCanvas.renderAll();
    }
}

function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        currentCanvas.centerObject(img);
        currentCanvas.add(img);
        currentCanvas.renderAll();
    });
}

function addTextToCanvas(text) {
    var textColor = document.getElementById('text-color').value;
    var textFont = document.getElementById('text-font').value;

    var textObject = new fabric.Text(text, {
        fontFamily: textFont,
        fontSize: 20,
        fill: textColor,
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        selectable: true
    });
    currentCanvas.add(textObject);
    currentCanvas.centerObject(textObject);
    currentCanvas.renderAll();
}

document.getElementById('add-text-btn').addEventListener('click', function() {
    var text = document.getElementById('add-text').value;
    addTextToCanvas(text);
});

document.querySelectorAll('.color-option').forEach(function(option) {
    option.addEventListener('click', function() {
        var color = this.dataset.color;
        document.getElementById('tshirt-backgroundpicture').src = color + '.png';
    });
});

document.getElementById('tshirt-design').addEventListener('change', function(){
    updateTshirtImage(this.value);
}, false);

document.getElementById('tshirt-custompicture').addEventListener('change', function(e){
    var reader = new FileReader();
    
    reader.onload = function (event){
        var imgObj = new Image();
        imgObj.src = event.target.result;

        imgObj.onload = function () {
            var img = new fabric.Image(imgObj);

            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            currentCanvas.centerObject(img);
            currentCanvas.add(img);
            currentCanvas.renderAll();
        };
    };

    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

document.getElementById('delete-selected-btn').addEventListener('click', function() {
    var activeObject = currentCanvas.getActiveObject();
    if (activeObject) {
        currentCanvas.remove(activeObject);
        currentCanvas.renderAll();
    }
});

document.getElementById('add-design-btn').addEventListener('click', function() {
    var design = document.getElementById('tshirt-design').value;
    updateTshirtImage(design);
});

document.getElementById('canvas-toggle').addEventListener('change', function() {
    currentCanvas = this.checked ? canvasBack : canvasFront;
});

document.getElementById('text-color').addEventListener('change', function() {
    var textColor = this.value;
    updateSelectedObjectProps('fill', textColor);
});

document.getElementById('text-font').addEventListener('change', function() {
    var textFont = this.value;
    updateSelectedObjectProps('fontFamily', textFont);
});

canvasFront.on('selection:created', function(event) {
    var selectedObject = event.target;
    if (selectedObject && selectedObject.type === 'text') {
        var textColorSelect = document.getElementById('text-color');
        var textFontSelect = document.getElementById('text-font');
        textColorSelect.value = selectedObject.fill;
        textFontSelect.value = selectedObject.fontFamily;
    }
});

canvasBack.on('selection:created', function(event) {
    var selectedObject = event.target;
    if (selectedObject && selectedObject.type === 'text') {
        var textColorSelect = document.getElementById('text-color');
        var textFontSelect = document.getElementById('text-font');
        textColorSelect.value = selectedObject.fill;
        textFontSelect.value = selectedObject.fontFamily;
    }
});

function combineImagesAndDownload() {
    var customerName = document.getElementById("customer-name").value;
    if (!customerName) {
        alert("Please enter customer name.");
        return;
    }

    var backgroundImage = document.getElementById("tshirt-backgroundpicture");
    var combinedCanvas = document.createElement("canvas");
    var context = combinedCanvas.getContext("2d");

    combinedCanvas.width = backgroundImage.width;
    combinedCanvas.height = backgroundImage.height;

    context.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height);

    var frontCanvas = canvasFront.lowerCanvasEl;
    var backCanvas = canvasBack.lowerCanvasEl;

    var frontCanvasRect = frontCanvas.getBoundingClientRect();
    var backCanvasRect = backCanvas.getBoundingClientRect();

    var frontX = frontCanvasRect.left - backgroundImage.getBoundingClientRect().left;
    var frontY = frontCanvasRect.top - backgroundImage.getBoundingClientRect().top;

    var backX = backCanvasRect.left - backgroundImage.getBoundingClientRect().left;
    var backY = backCanvasRect.top - backgroundImage.getBoundingClientRect().top;

    context.drawImage(frontCanvas, frontX, frontY, frontCanvasRect.width, frontCanvasRect.height);
    context.drawImage(backCanvas, backX, backY, backCanvasRect.width, backCanvasRect.height);

    var imageURL = combinedCanvas.toDataURL("image/png");

    var link = document.createElement("a");
    link.href = imageURL;

    link.download = customerName + ".png";

    link.click();
}
document.getElementById("download-btn").addEventListener("click", combineImagesAndDownload);

document.getElementById('confirm').addEventListener('click', function() {
    var customerName = document.getElementById('customer-name').value;
    var tshirtColorElement = document.querySelector('.color-option.active');
    var tshirtColor = tshirtColorElement ? tshirtColorElement.getAttribute('data-color') : 'No option selected';
    var tshirtFabric = document.getElementById('tshirt-fabric').value;

    var customDesignOptions = document.querySelectorAll('#tshirt-design option:checked');
    var customDesigns = Array.from(customDesignOptions).map(option => option.text).join(', ');
    if (!customDesigns) {
        customDesigns = 'No option selected';
    }

    var customTexts = document.querySelectorAll('.drawing-area-front text, .drawing-area-back text');
    var texts = Array.from(customTexts).map(text => text.textContent).join(', ');
    if (!texts) {
        texts = 'No option selected';
    }

    var customText = document.getElementById('add-text').value;
    if (customText) {
        texts += ', ' + customText;
    }

    var textColor = document.getElementById('text-color').value;
    var textFont = document.getElementById('text-font').value;

    var url = 'vendor_page.html?customerName=' + encodeURIComponent(customerName) +
              '&tshirtColor=' + encodeURIComponent(tshirtColor) +
              '&tshirtFabric=' + encodeURIComponent(tshirtFabric) +
              '&customDesign=' + encodeURIComponent(customDesigns) +
              '&customText=' + encodeURIComponent(texts) +
              '&textColor=' + encodeURIComponent(textColor) +
              '&textFont=' + encodeURIComponent(textFont);

    window.open(url, '_blank');
});

document.querySelectorAll('.color-option').forEach(function(option) {
    option.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(function(opt) {
            opt.classList.remove('active');
        });
        
        this.classList.add('active');
        
        var color = this.dataset.color;
        document.getElementById('tshirt-backgroundpicture').src = color + '.png';
    });
});


function showPriceMessage(pricePerPiece) {
    var priceMessageDiv = document.getElementById('price-message');
    priceMessageDiv.innerText = "Price per piece: " + pricePerPiece;
}

// Call the showPriceMessage function instead of alert
window.addEventListener('message', function(event) {
    var eventData = event.data;
    if (eventData && eventData.type === 'confirmation') {
        var pricePerPiece = eventData.pricePerPiece;
        showPriceMessage(pricePerPiece);
    }
});

