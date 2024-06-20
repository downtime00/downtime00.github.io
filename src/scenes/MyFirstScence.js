import { Engine, Scene, FreeCamera, Vector3, MeshBuilder, StandardMaterial, Color3, HemisphericLight, } from "@babylonjs/core";
export const createScene = (canvas) => {
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    new HemisphericLight("light", Vector3.Up(), scene);
    const box = MeshBuilder.CreateBox("box01", { size: 1 }, scene);
    const box2 = MeshBuilder.CreateBox("box02", { size: 1, width: 2 }, scene);
    const material = new StandardMaterial("box-material", scene);
    material.diffuseColor = Color3.Red();
    box.material = material;
    const material2 = new StandardMaterial("box-material", scene);
    material2.diffuseColor = Color3.Black();
    box2.material = material2;
    box2.position = new Vector3(2, 3, 4);
    engine.runRenderLoop(() => { scene.render(); });
};

