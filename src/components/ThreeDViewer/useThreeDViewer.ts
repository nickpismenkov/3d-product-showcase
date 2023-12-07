import { useRef, useState, useCallback, useEffect, RefObject } from 'react'
import {
    ViewerApp,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    CameraController,
    Vector3,
} from 'webgi'
import { useScrollAnimation } from './useScrollAnimation'
import gsap from 'gsap'

export function useThreeDViewer(sectionsRef:  RefObject<HTMLDivElement>) {
    const ref = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [viewerRef, setViewerRef] = useState<ViewerApp>()
    const [targetRef, setTargetRef] = useState<Vector3>()
    const [cameraRef, setCameraRef] = useState<CameraController>()
    const [positionRef, setPositionRef] = useState<Vector3>()

    const [interactiveMode, setInteractiveMode] = useState<boolean>(false)

    const { scrollAnimation } = useScrollAnimation()

    const handleExit = useCallback(() => {
        if (!positionRef || !targetRef || !viewerRef || !cameraRef) return

        viewerRef.scene.activeCamera.setCameraOptions({ controlsMode: '' })
        setInteractiveMode(false)

        const currentRef = containerRef.current
        if (currentRef) {
            currentRef.style.pointerEvents = ''
        }

        if (sectionsRef.current) {
            sectionsRef.current.style.display = ''
        }

        gsap.to(positionRef, {
            x: 13.4,
            y: -2.01,
            z: 2.29,
            duration: 2,
            onUpdate: () => {
                viewerRef.setDirty()
                cameraRef.positionUpdated(true)
            }
        })
        gsap.to(targetRef, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2
        })
    }, [containerRef, viewerRef, positionRef, cameraRef, targetRef, sectionsRef])

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({ canvas: ref.current as HTMLCanvasElement })
        
        setViewerRef(viewer)

        const { 
            activeCamera: camera, 
            activeCamera: { 
                position, 
                target 
            } 
        } = viewer.scene 

        setCameraRef(camera)
        setPositionRef(position)
        setTargetRef(target)
    
        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)

        viewer.renderer.refreshPipeline()
        
        await viewer.load('./assets/DamagedHelmet.glb')

        const tonemapPlugin = viewer.getPlugin(TonemapPlugin)
        if (tonemapPlugin?.config) {
            tonemapPlugin.config.clipBackground = true
        }

        viewer.scene.activeCamera.setCameraOptions({ controlsMode: '' })
        window.scrollTo(0, 0)

        let needsUpdate = true

        const onUpdate = () => {
            needsUpdate = true
            viewer.setDirty()
        }

        viewer.addEventListener('preFrame', () => {
            if (needsUpdate) {
                camera.positionUpdated(true)
                needsUpdate = false
            }   
        })

        scrollAnimation({ position, target, onUpdate })
    }, [scrollAnimation])

    useEffect(() => {
        setupViewer()
    }, [setupViewer])

    const imperativeCb = useCallback(() => {
        if (!positionRef || !targetRef || !viewerRef || !cameraRef) return

        return {
            triggerPreview() {
                if (sectionsRef?.current) {
                    sectionsRef.current.style.display = 'none'
                }

                setInteractiveMode(true)
                const currentRef = containerRef.current
                if (currentRef) {
                    currentRef.style.pointerEvents = 'all'
                }
                
                gsap.to(positionRef, {
                    x: 13.4,
                    y: -2.01,
                    z: 2.29,
                    duration: 2,
                    onUpdate: () => {
                        viewerRef.setDirty()
                        cameraRef.positionUpdated(true)
                    }
                })
                gsap.to(targetRef, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 2
                })

                viewerRef.scene.activeCamera.setCameraOptions({ controlsMode: 'orbit' })
            }
        }
    }, [sectionsRef, cameraRef, positionRef, viewerRef, targetRef])

    return {
        ref,
        containerRef,
        interactiveMode,
        handleExit,
        imperativeCb
    }
}