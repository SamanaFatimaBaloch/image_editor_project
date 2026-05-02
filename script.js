let filters =
{
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100, 
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Blur:{
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 50,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

}
const imageCanvas = document.querySelector("#image-canvas")
const imginput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const downloadButton = document.querySelector("#download-btn")
const resetButton = document.querySelector("#reset-btn")
const presetsContainer = document.querySelector(".presets")


let file = null;
let img = null;


const filtersContainer = document.querySelector(".filters")

function createFilterElement(name, unit = "%", value, min ,max)
{
    const div = document.createElement("div")
    div.classList.add("filter")
    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.id = name
    
    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(e) =>
    {
        filters[name].value = input.value
        applyFilters();
    })
    
    return div;
}
function createFilter()
{
    Object.keys(filters).forEach(filter =>{
        const filterElement = createFilterElement(filter, filters[filter].unit, filters[filter].value, filters[filter].min, filters[filter].max);
        filtersContainer.appendChild(filterElement)
    })  

}

createFilter();

imginput.addEventListener("change", (e)=>
{
    const imagePlaceHolder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceHolder.style.display = "none";
    const file = event.target.files[0]
    const image = new Image()
    image.src = URL.createObjectURL(file);

    image.onload = () =>
    {
        img = image;
        imageCanvas.width = image.width 
        imageCanvas.height = image.height
        canvasCtx.drawImage(image, 0, 0)
    }
})

function applyFilters()
{
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height) 
    canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
    `.trim()
    canvasCtx.drawImage(img, 0, 0);

}
resetButton.addEventListener("click",() =>{
    filters =
{
    Brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    Saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    Blur:{
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    Grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    Opacity: {
        value: 50,
        min: 0,
        max: 100,
        unit: "%"
    },
    Invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },

}
applyFilters()
filtersContainer.innerHTML = "";
createFilter(); 
})

downloadButton.addEventListener("click", ()=>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    Normal: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        hueRotation: 0,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    Drama: {
        Brightness: 90,
        Contrast: 140,
        Saturation: 120,
        hueRotation: 0,
        Blur: 0,
        Grayscale: 10,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    Vintage: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 80,
        hueRotation: 20,
        Blur: 0,
        Grayscale: 20,
        Sepia: 40,
        Opacity: 100,
        Invert: 0
    },

    OldSchool: {
        Brightness: 95,
        Contrast: 85,
        Saturation: 70,
        hueRotation: 10,
        Blur: 0,
        Grayscale: 40,
        Sepia: 60,
        Opacity: 100,
        Invert: 0
    },

    BlackWhite: {
        Brightness: 100,
        Contrast: 120,
        Saturation: 0,
        hueRotation: 0,
        Blur: 0,
        Grayscale: 100,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    Cool: {
        Brightness: 100,
        Contrast: 110,
        Saturation: 120,
        hueRotation: 180,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    Warm: {
        Brightness: 105,
        Contrast: 105,
        Saturation: 115,
        hueRotation: 330,
        Blur: 0,
        Grayscale: 0,
        Sepia: 20,
        Opacity: 100,
        Invert: 0
    },

    Soft: {
        Brightness: 110,
        Contrast: 90,
        Saturation: 95,
        hueRotation: 0,
        Blur: 2,
        Grayscale: 0,
        Sepia: 10,
        Opacity: 100,
        Invert: 0
    },

    Dreamy: {
        Brightness: 115,
        Contrast: 85,
        Saturation: 110,
        hueRotation: 300,
        Blur: 3,
        Grayscale: 0,
        Sepia: 15,
        Opacity: 100,
        Invert: 0
    },

    Negative: {
        Brightness: 100,
        Contrast: 100,
        Saturation: 100,
        hueRotation: 0,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 100
    },
    Faded:{
    Brightness: 110,
    Contrast: 80,
    Saturation: 70,
    hueRotation: 0,
    Blur: 1,
    Grayscale: 10,
    Sepia: 15,
    Opacity: 100,
    Invert: 0
},
Noir: {
    Brightness: 95,
    Contrast: 130,
    Saturation: 0,
    hueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 10,
    Opacity: 100,
    Invert: 0
}
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName;
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click", () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
        })

        applyFilters()

        filtersContainer.innerHTML = ""
        createFilter();
    })
})
