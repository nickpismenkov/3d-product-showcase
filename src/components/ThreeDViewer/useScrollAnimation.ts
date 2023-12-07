import gsap from 'gsap'
import { useCallback } from 'react'
import { Vector3 } from 'webgi'

type ScrollAnimationProps = {
    position?: Vector3
    target?: Vector3
    onUpdate?: () => void
}

export function useScrollAnimation() {
    const scrollAnimation = useCallback(({ position, target, onUpdate }: ScrollAnimationProps) => {
        if (!position || !target || !onUpdate) return
        const tl = gsap.timeline()

        tl
            .to(position, {
                x: -9.22,
                y: -0.45,
                z: 0.02,
                scrollTrigger: {
                    trigger: '.section-2',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 2,
                    immediateRender: false
                },
                onUpdate
            })
            .to(target, {
                x: 0,
                y: 0,
                z: 0,
                scrollTrigger: {
                    trigger: '.section-2',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 2,
                    immediateRender: false
                }
            })
            .to(position, {
                x: 9.93,
                y: -0.64,
                z: 3.28,
                scrollTrigger: {
                    trigger: '.section-3',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 2,
                    immediateRender: false
                },
                onUpdate
            })
            .to(target, {
                x: 0,
                y: 0,
                z: 0,
                scrollTrigger: {
                    trigger: '.section-3',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 2,
                    immediateRender: true
                }
            })
            .to(position, {
                x: -0,
                y: -10.48,
                z: 0,
                scrollTrigger: {
                    trigger: '.section-4',
                    start: 'top bottom',
                    scrub: 2,
                    immediateRender: false
                },
                onUpdate
            })
            .to(target, {
                x: 0,
                y: 0,
                z: 0,
                scrollTrigger: {
                    trigger: '.section-4',
                    start: 'top bottom',
                    scrub: 2,
                    immediateRender: false
                }
            })
    }, [])

    return { scrollAnimation }
}