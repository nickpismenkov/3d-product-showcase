import { useCallback, useRef } from 'react'
import type { Container, Engine } from 'tsparticles-engine'
import { loadSlim } from 'tsparticles-slim'

export function useApp() {
    const threeDViewerRef = useRef<{ triggerPreview: () => void }>(null)
    const sectionsRef = useRef<HTMLDivElement>(null)

    const handleInteractiveMode = useCallback(() => {
        threeDViewerRef.current?.triggerPreview()
    }, [])

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine)
    }, [])

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await container
    }, [])

    return {
        threeDViewerRef,
        sectionsRef,
        handleInteractiveMode,
        particlesInit,
        particlesLoaded
    }
}