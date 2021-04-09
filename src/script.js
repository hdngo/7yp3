import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

console.log('starter kit')
console.log(dat)
console.log(THREE)

/**
 * Debug
 */
 const gui = new dat.GUI()
 const debugObject = {}

//  debugObject.cubeColor = '#690c67'
//  gui.addColor(debugObject, 'cubeColor').onChange(() => {
//     cube.material.color = cube.material.color.set(debugObject.cubeColor)
//  })

 debugObject.bgColor = '#d69e04'
 gui.addColor(debugObject, 'bgColor').onChange(() => {
     scene.background = scene.background.set(debugObject.bgColor)
 })

 debugObject.welcomeTextColor = new THREE.Color('teal')
 gui.addColor(debugObject, 'welcomeTextColor').onChange(() => {
     console.log('?')
     textColor = debugObject.welcomeTextColor
     updateAllMaterials()
 })


/**
 * Canvas
 */
const canvas = document.querySelector('canvas')

/**
 * Loaders
 */

// Fonts
const fontLoader = new THREE.FontLoader()
let textFont = null
let textColor = debugObject.welcomeTextColor
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        textFont = font
        const welcomeTextGeometry = new THREE.TextBufferGeometry(
            'QW3R7Y',
            {
                font: font,
                size: 0.5,
                height: 0.02,
                curveSegments: 3,
                bevelEnabled: true,
                bevelThickness: 0.25,
                bevelSize: 0.03,
                bevelOffset: 0,
                bevelSegments: 3
            }
        )

        welcomeTextGeometry.center()
        // welcomeTextGeometry.computeBoundingBox()

        const welcomeTextMaterial = new THREE.MeshBasicMaterial({
            color: debugObject.welcomeTextColor
        })

        const welcomeText = new THREE.Mesh(welcomeTextGeometry, welcomeTextMaterial)
        scene.add(welcomeText)
        welcomeText.lookAt(camera.position)
    }
)

const createText = (string) => {
    console.log(textFont)
    const textGeo = new THREE.TextBufferGeometry(
        string,
        {
            font: textFont,
            size: 0.5,
            height: 0.02,
            curveSegments: 3,
            bevelEnabled: true,
            bevelThickness: 0.25,
            bevelSize: 0.03,
            bevelOffset: 0,
            bevelSegments: 3
        }
    )

    const textMat = new THREE.MeshBasicMaterial({
        color: debugObject.welcomeTextColor
    })

    const text = new THREE.Mesh(textGeo, textMat)
    // scene.add(text)
    return text
}

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TextGeometry) {
            console.log(child)
            child.material.needsUpdate = true
        }
    })
}

/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color('#d69e04')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Resize
 */
window.addEventListener('resize', () => {
    // update sizes object
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // update renderer sizes
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Cannon Physics
 */

/**
 * Models
 */

// Test cube
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({
//         color: debugObject.cubeColor
//     })
// )
// scene.add(cube)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update controls
    controls.update()

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()

setTimeout(() => {
    const asdf = createText('asdf')
    scene.add(asdf)
}, 1500)
