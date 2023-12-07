import { useImperativeHandle, forwardRef, RefObject } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas, Container } from './styles'
import gsap from 'gsap'
import { useThreeDViewer } from './useThreeDViewer'

gsap.registerPlugin(ScrollTrigger)

type Props = {
    sectionsRef: RefObject<HTMLDivElement>
}

export const ThreeDViewer = forwardRef((props: Props, forwardRef) => {
    const {
        ref,
        containerRef,
        interactiveMode,
        handleExit,
        imperativeCb
    } = useThreeDViewer(props.sectionsRef)

    useImperativeHandle(forwardRef, imperativeCb)

    return (
        <Container ref={containerRef}>
            <Canvas ref={ref} />
            {interactiveMode && (
                <button onClick={handleExit}>Exit interactive mode</button>
            )}
        </Container>
    )
})