import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export async function loadModel(scene, model) {
  if (!model) return;

  if (model.local) {
    switch (model.type) {
      case "gltf":
        return await importGLTF_local(scene, model.path);
      case "glb":
        return await importGLTF_local(scene, model.path);
    }
  } else {
    switch (model.type) {
      case "obj":
        return await importObj(scene, model.paths);
      case "gltf":
        return await importGLTF(scene, model.paths);
    }
  }

  async function importGLTF(scene, model) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      const keys = Object.keys(model);
      let gltfName = keys.find((name) => name.endsWith(".glb"));

      if (!gltfName) {
        gltfName = keys.find((name) => name.endsWith(".gltf"));

        fetch(model[gltfName])
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            var newData = data;
            for (let i = 0; i < keys.length; i++) {
              const splitBlob = model[keys[i]].split("/");
              newData = newData.replaceAll(String(keys[i]), splitBlob[3]);
            }
            return URL.createObjectURL(new Blob([newData]));
          })
          .then((blob) => {
            model[gltfName] = blob;

            loader.load(blob, (gltf) => {
              scene.add(gltf.scene);
              resolve(gltf);
            });
          });
      } else {
        loader.load(model[gltfName], (gltf) => {
          scene.add(gltf.scene);
          resolve(gltf);
        });
      }
    });
  }

  async function importGLTF_local(scene, model_path) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(model_path, (gltf) => {
        scene.add(gltf.scene);
        resolve(gltf);
      });
    });
  }

  async function importObj(scene, model) {
    return new Promise((resolve, reject) => {
      const mtlLoader = new MTLLoader();

      if (!model) return;

      const keys = Object.keys(model);
      const objName = keys.find((name) => name.endsWith(".obj"));
      const mtlName = keys.find((name) => name.endsWith(".mtl"));

      fetch(model[mtlName])
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          var newMtl = "";
          newMtl = data.replaceAll("\\", "/");
          newMtl = newMtl.replaceAll("//", "/");
          for (let i = 0; i < keys.length; i++) {
            const splitBlob = model[keys[i]].split("/");
            newMtl = newMtl.replaceAll(String(keys[i]), splitBlob[3]);
          }
          return URL.createObjectURL(new Blob([newMtl]));
        })
        .then((blob) => {
          model[mtlName] = blob;

          mtlLoader.load(model[mtlName], function (materials) {
            materials.preload();

            const objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load(model[objName], function (object) {
              scene.add(object);
              resolve(object);
            });
          });
        });
    });
  }
}
