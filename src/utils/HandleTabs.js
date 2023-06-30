export function getLocalModel(modelId) {
    const examples = [
        {
            name: "Calvin Freckle",
            path: '../../models/calvin_freckle/calvin_freckle_mcmurray_from_lackadaisy.glb',
            type: "gltf",
            url: "https://sketchfab.com/3d-models/calvin-freckle-mcmurray-from-lackadaisy-25b9b28a44dc47b2b07655692de5c3e1",
            author_name: "Avilash291"
        },
        {
            name: "Cosmog",
            path: '../../models/cosmog.glb',
            type: "glb",
            url: "https://sketchfab.com/3d-models/cosmog-d928b7339a9b4ecb841162c53b4c4f4a",
            author_name: "AlmondFeather"
        },
        {
            name: "Cloud Station",
            path: '../../models/cloud_station.glb',
            type: "glb",
            url: "https://sketchfab.com/3d-models/cloud-station-26f81b24d83441ba88c7e80a52adbaaf",
            author_name: "Alexa Kruckenberg"
        }
    ]

    return {
        local: true,
        id: modelId,
        name: examples[modelId].name,
        type: examples[modelId].type,
        path: examples[modelId].path,
        url: examples[modelId].url,
        author_name: examples[modelId].author_name
    }
}

export function getModel(modelData, modelId) {
    var suffix = ""
    for (let i = 0; i < Object.keys(modelData.model).length; i++) {
        if (Object.keys(modelData.model)[i].includes(".obj")) {
            suffix = "obj"
        } else if (Object.keys(modelData.model)[i].includes(".glb") || Object.keys(modelData.model)[i].includes(".gltf")) {
            suffix = "gltf"
        } else if (Object.keys(modelData.model)[i].includes(".fbx")) {
            suffix = "fbx"
        }
        
    }

    return{
        local: false,
        id: modelId,
        name: "",
        type: suffix,
        paths: modelData.model
    }
}