export function getLocalModel(modelId) {
    const examples = [
        {
            name: "Calvin Freckle",
            path: '../../models/calvin_freckle/calvin_freckle_mcmurray_from_lackadaisy.glb',
            type: "gltf"
        },
        {
            name: "Cosmog",
            path: '../../models/cosmog.glb',
            type: "glb"
        },
        {
            name: "Cloud Station",
            path: '../../models/cloud_station.glb',
            type: "glb"
        }
    ]

    return {
        local: true,
        id: modelId,
        name: examples[modelId].name,
        type: examples[modelId].type,
        path: examples[modelId].path
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