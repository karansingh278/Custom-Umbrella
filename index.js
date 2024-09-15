function updateImage(color, name) {
    const umbrellaImg = document.getElementById("umbrella-img");
    const loader = document.getElementById("loader");
    const smallLoader = document.getElementById("small-loader")
    const uploadedLogo = document.getElementById("upload-logo");
    const uploadedIcon = document.getElementById("upload-icon");
    const uploadBtn = document.querySelector('.upload-box button');
    const fileNameButton = document.querySelector('.upload-box .file-name') ;
    const bodyColor = document.querySelector('body');

    const colorMap = {
        'Blue': '#00b5e5',
        'DarkBlue': '#102447',
        'Yellow': '#f8d237',
        'Pink': '#d34792',
        'Gray': '#6f6e6b',
        'Orange': '#f7a33b',
        'Red': '#ef4b5f'
    };
    const lightColorMap = {
        'Blue': '#e5f3fa',
        'DarkBlue': '#1a3a5a',
        'Yellow': '#fbe17f',
        'Pink': '#f48fb1',
        'Gray': '#9d9c96',
        'Orange': '#f9c76c',
        'Red': '#f68a8e'
    }
    fileNameButton.style.backgroundColor = colorMap[color];
    bodyColor.style.backgroundColor = lightColorMap[color];

    loader.style.fill = "blue";
    loader.style.display = "block";
    smallLoader.style.display = "block";
    uploadedIcon.style.display = "none";
    umbrellaImg.style.display = "none";
    uploadedLogo.style.display = "none";

    setTimeout(() => {
        umbrellaImg.src = `./Umbrella Images/${color} umbrella.png`;
        umbrellaImg.alt = `${color}`;
        umbrellaImg.style.display = "block";
        uploadedIcon.style.display = "block"
        loader.style.display = "none"; 
        smallLoader.style.display = "none";
        uploadedLogo.style.display = "block";
        const fileNameElement = document.getElementById('file-name');
        
        fileNameElement.innerHTML = `
            <button class="upload-btn" onclick="triggerFileInput()">
                <img id = "upload-icon" src="./Umbrella Images/upload_icon.svg" alt="upload_img">
                <img id="small-loader" src="./Umbrella Images/loader_icon.svg" alt="Loading" class="small-loader">
            </button>
            ${name || uploadedLogo.alt}
            <button class="remove" style="visibility: visible;" onclick="removeFile()">&times;</button>
        `;
        uploadedLogo.style.display = "block";  
        if(name === "Upload Logo"){
            uploadedLogo.style.display = "none"; 
            const removeIcon = document.querySelector(".remove");
            removeIcon.style.visibility = "hidden";
        }  
        if(uploadedLogo.src === document.location.toString()){
            fileNameElement.innerHTML = `
            <button class="upload-btn" onclick="triggerFileInput()">
                <img id = "upload-icon" src="./Umbrella Images/upload_icon.svg" alt="upload_img">
                <img id="small-loader" src="./Umbrella Images/loader_icon.svg" alt="Loading" class="small-loader">
            </button>
                Upload Logo
            <button class="remove" style="visibility: visible;" onclick="removeFile()">&times;</button>
        `;
        }
    }, 1000);

    const colorElements = document.querySelectorAll('.color');
    colorElements.forEach(el => el.classList.remove('active'));
    document.querySelector(`.color.${color.toLowerCase()}`).classList.add('active');

}

function triggerFileInput() {
    document.getElementById('file-input').click();
}

function handleFileChange(event) {
    const file = event.target.files[0];
    const fileSizeLimit = 5 * 1024 * 1024; 
    const errorMessageElement = document.getElementById('error-message');
    if (file) {
        if (file.size > fileSizeLimit) {
            errorMessageElement.textContent = 'File size exceeds 5MB limit. Please choose a smaller file.';
            document.getElementById('file-input').value = ''; 
            document.getElementById('upload-logo').src = ''; 
        }
        else{
            errorMessageElement.textContent = '';
            let url = URL.createObjectURL(file);
            const uploadedLogo = document.getElementById("upload-logo");
            const umbrellalttext = document.getElementById("umbrella-img").alt;  
            updateImage(umbrellalttext, file.name);
            uploadedLogo.src = url;
            uploadedLogo.alt = file.name;
            document.getElementById('file-name').value = file.name; 
        }
     }  else {
        removeFile(); 
    }
}

function removeFile() {
    document.getElementById('file-input').value = '';
    const uploadedLogo = document.getElementById("upload-logo");
    uploadedLogo.src = '';
    uploadedLogo.alt = '';
    uploadedLogo.style.display = "none";
    const umbrellalttext = document.getElementById("umbrella-img").alt;
    updateImage(umbrellalttext, "Upload Logo");
    
    document.getElementById('error-message').textContent = '';
}