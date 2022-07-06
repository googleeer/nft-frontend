<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default defineComponent({
  name: "TestView",
  setup() {
    const containerRef = ref(null);
    const close = ref();
    const open = ref();

    onMounted(() => {
      let camera: any,
        scene: any,
        renderer: any,
        mixer: any,
        clock: any,
        controls: any;
      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(
          15,
          window.innerWidth / window.innerHeight,
          0.1,
          20,
        );
        camera.position.set(-2.1, 0.6, 3.7);

        scene = new THREE.Scene();

        clock = new THREE.Clock();

        new RGBELoader()
          .setPath("./")
          .load("venice_sunset_1k.hdr", function (texture) {
            let envMap = pmremGenerator.fromEquirectangular(texture).texture;

            scene.background = envMap;
            scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();

            let loader = new GLTFLoader();
            loader.setPath("./").load("Flower 3_5g_Alien.glb", function (gltf) {
              scene.add(gltf.scene);

              const obj = gltf.scene;

              const box = new THREE.Box3().setFromObject(obj);
              const center = box.getCenter(new THREE.Vector3());

              controls.target.copy(center);

              controls.target.y -= 0.05;
              controls.update();

              const boundingSphere = box.getBoundingSphere(new THREE.Sphere());

              controls.minDistance = boundingSphere.radius * 5;

              mixer = new THREE.AnimationMixer(gltf.scene);

              gltf.animations.forEach((clip) => {
                const anim = mixer.clipAction(clip);

                open.value = () => {
                  anim.reset();
                  anim.clampWhenFinished = true;
                  anim.loop = THREE.LoopOnce;
                  anim.paused = false;
                  anim.play();

                  setTimeout(() => {
                    anim.paused = true;
                  }, 2300);
                };

                close.value = () => {
                  // anim.reset();
                  anim.paused = false;
                  // anim.play();
                  // anim.clampWhenFinished = true;
                  // anim.loop = THREE.LoopOnce;
                  // mixer.update(
                  //   -mixer.time + clip.duration - (clip.duration - 2.3),
                  // );
                };

                // close();
                //
                // setTimeout(() => {
                //   open();
                // }, 5000);

                // anim.paused = true;
              });
            });
          });

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.8;
        renderer.outputEncoding = THREE.sRGBEncoding;
        (containerRef.value as any).appendChild(renderer.domElement);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0.1;
        controls.maxDistance = 4;
        controls.target.set(0, 0, -0.2);
        controls.update();

        window.addEventListener("resize", onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      //

      function animate() {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);

        renderer.render(scene, camera);
      }
    });

    return {
      containerRef,
      close,
      open,
    };
  },
});
</script>

<template>
  <div ref="containerRef"></div>
  <div class="test">
    <button @click="open">open</button>
    <button @click="close">close</button>
  </div>
</template>

<style lang="scss" scoped>
.test {
  position: fixed;
  right: 0;
  top: 0;
  padding: 10px;
  background-color: var(--color-eerie);
}
</style>
