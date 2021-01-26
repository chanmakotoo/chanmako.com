import * as React from 'react';
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader';
import Layout from '../../components/layout';
import styles from '../../styles/home.module.scss';

const Home: NextPage = () => {
  const canvasRef = useRef();

  const init = () => {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    // レンダラを作成
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // シーンを作成
    const scene: THREE.Scene = new THREE.Scene();

    // カメラを作成
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      45,
      width / height
    );
    width > 768 ? camera.position.set(0, 4, 10) : camera.position.set(0, 4, 14);

    //ライトを作成
    const ambient: THREE.AmbientLight = new THREE.AmbientLight(0xffffff);
    ambient.intensity = 0.8;
    ambient.position.set(1, 1, 1);
    scene.add(ambient);

    const directional: THREE.DirectionalLight = new THREE.DirectionalLight(
      0xffffff
    );
    directional.intensity = 0.3;
    directional.position.set(1, 1, 1);
    scene.add(directional);

    //オブジェクトロード
    let object = null;
    const loader: GLTFLoader = new GLTFLoader();
    loader.load('/model/myroom.glb', (data) => {
      const gltf = data;
      object = gltf.scene;
      scene.add(object);
    });

    //コントロール
    const controls: OrbitControls = new OrbitControls(
      camera,
      renderer.domElement
    );

    // アニメーション
    const animate = () => {
      if (object) {
        object.rotation.y += 0.01;
      }
      controls.update();
      renderer.render(scene, camera);
      // レンダリング
      requestAnimationFrame(animate);
    };
    animate();

    // 画面リサイズ
    const resize = () => {
      const width: number = window.innerWidth;
      const height: number = window.innerHeight;

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      width > 768
        ? camera.position.set(0, 4, 10)
        : camera.position.set(0, 4, 14);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Layout home>
      <Head>
        <meta property="og:title" content="chanmako.com"></meta>
        <meta property="og:url" content=""></meta>
        <meta property="og:site_name" content="chanmako.com"></meta>
        <meta
          property="og:image"
          content="https://images.microcms-assets.io/protected/ap-northeast-1:d11e3873-6289-451e-ad68-f083cfed4f2e/service/chanmako/media/ogp.jpg"
        ></meta>
        <meta name="twitter:title" content="chanmako.com"></meta>
        <meta
          name="twitter:image"
          content="https://images.microcms-assets.io/protected/ap-northeast-1:d11e3873-6289-451e-ad68-f083cfed4f2e/service/chanmako/media/ogp.jpg"
        ></meta>
      </Head>
      <div className={styles.content}>
        <h1 className={styles.title}>chanmako.com</h1>
        <Link href={`blogs`}>
          <a className={styles.link}>ブログいちらん</a>
        </Link>
      </div>
      <figure>
        <canvas ref={canvasRef}></canvas>
      </figure>
    </Layout>
  );
};

export default Home;
