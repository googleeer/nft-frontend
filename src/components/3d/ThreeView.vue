<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PerspectiveCamera, Scene } from "three";
import SceneViewLoader from "@/components/scene/SceneViewLoader.vue";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SpinControls } from "./test";
export default defineComponent({
  name: "ThreeView",
  components: { SceneViewLoader },
  props: {
    nftModel: {
      type: String,
      required: true,
    },
    nftModelScene: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const containerRef = ref(null);
    const close = ref();
    const open = ref();
    const animationState = ref<"close" | "open" | "running">("close");
    const onClick = ref();
    const loadedModelsCount = ref(0);

    onMounted(() => {
      let camera: PerspectiveCamera,
        scene: Scene,
        renderer: any,
        mixer: any,
        clock: any,
        controls: OrbitControls,
        podium: any,
        spinControl: any,
        cube: any;
      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          20,
        );
        camera.position.set(
          0.0028091313521602023,
          0.11605276630822155,
          0.7428539023616042,
        );

        scene = new THREE.Scene();

        new FBXLoader().setPath("/").load("podium.FBX", (object) => {
          object.scale.multiplyScalar(0.001);
          object.traverse(function (child) {
            if (child.type === "Mesh") {
              child.castShadow = true;
              child.receiveShadow = true;

              // child.material = new THREE.MeshStandardMaterial({ })
            }

            console.log(child.type);
            /* max to webgl 회전 보정 */
            if (child.type === "Group") {
              console.log(child);
              child.rotation.x = Math.PI;
              child.rotation.y = Math.PI;
              child.rotation.z = Math.PI;
            }

            if ((child as any).intensity) {
              (child as any).parent.remove(child);
            }
          });

          const light = new THREE.DirectionalLight(0xffffff, 1);
          scene.add(light);
          light.position.set(1, 5, 10);

          podium = object;
          scene.add(object);

          const light2 = new THREE.DirectionalLight(0xffffff, 1);
          scene.add(light2);
          light.position.set(-1, 5, -10);
          scene.add(object);
          loadedModelsCount.value++;
        });

        new GLTFLoader().load(props.nftModel, function (gltf) {
          loadedModelsCount.value++;
          scene.add(gltf.scene);

          const obj = gltf.scene;
          cube = obj;
          obj.position.y += 0.1;

          const box = new THREE.Box3().setFromObject(obj);
          const center = box.getCenter(new THREE.Vector3());

          // controls.target.copy(center);
          //
          // controls.target.y -= 0.05;
          // controls.update();

          const boundingSphere = box.getBoundingSphere(new THREE.Sphere());

          // controls.minDistance = boundingSphere.radius * 5;

          mixer = new THREE.AnimationMixer(gltf.scene);

          gltf.animations.forEach((clip) => {
            const anim = mixer.clipAction(clip);

            open.value = () => {
              animationState.value = "running";
              anim.reset();
              anim.clampWhenFinished = true;
              anim.loop = THREE.LoopOnce;
              anim.paused = false;
              anim.play();

              setTimeout(() => {
                anim.paused = true;
                animationState.value = "open";
              }, 2300);
            };

            close.value = () => {
              anim.paused = false;
              animationState.value = "close";
            };
          });

          onClick.value = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            const rayCaster = new THREE.Raycaster();
            rayCaster.setFromCamera({ x, y }, camera);
            const intersects = rayCaster.intersectObjects([cube], true);

            // console.log(intersects);
            // !!intersects[0] &&
            //   (animationState.value === "close"
            //     ? open.value()
            //     : animationState.value === "open"
            //     ? close.value()
            //     : null);
          };

          spinControl = new (SpinControls as any)(
            cube,
            1,
            camera,
            renderer.domElement,
          );
          spinControl.rotateSensitivity = -3;
          // spinControl.dampingFactor = 20;

          // smooth options combo
          // spinControl.setPointerToSphereMapping(
          //   spinControl.POINTER_SPHERE_MAPPING.HOLROYD,
          // );
        });

        clock = new THREE.Clock();

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.8;
        renderer.outputEncoding = THREE.sRGBEncoding;
        (containerRef.value as any).appendChild(renderer.domElement);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        scene.environment = pmremGenerator.fromScene(
          new RoomEnvironment(),
          0.04,
        ).texture;

        // controls = new OrbitControls(camera, renderer.domElement);
        // controls.minDistance = 0.1;
        // controls.maxDistance = 4;
        // controls.target.set(0, 0, -0.2);
        // controls.update();

        window.addEventListener("resize", onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        spinControl.onWindowResize();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      //

      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        if (spinControl) spinControl.update();

        // if (cube) {
        //   cube.rotation.y += Math.sin(delta);
        // }
        renderer.render(scene, camera);
      }
    });

    return {
      containerRef,
      close,
      open,
      onClick,
      loadedModelsCount,
    };
  },
});
</script>

<template>
  <SceneViewLoader
    :visible="loadedModelsCount !== 2"
    :count="loadedModelsCount"
    :count-of="2"
  />
  <div class="threeViewer" ref="containerRef" @click="onClick"></div>
</template>

<style lang="scss" scoped>
.threeViewer {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: url("~@/assets/images/texture.jpg");
  background-size: cover;
  background-position: center bottom;
  height: 100%;
}
</style>
