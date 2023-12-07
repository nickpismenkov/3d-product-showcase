import React from 'react'
import Particles from 'react-particles'
import { ThreeDViewer } from './components/ThreeDViewer'
import { Section } from './components/Section'
import styled from 'styled-components'
import { useApp } from './useApp'

const StyledParticles = styled(Particles)`
  z-index: -1;
  position: fixed;
`

function App() {
  const {
    threeDViewerRef,
    sectionsRef,
    handleInteractiveMode,
    particlesInit,
    particlesLoaded
  } = useApp()

  return (
    <div>
      <div ref={sectionsRef}>
        <Section title='Section 1' text='Direct view' className='section-1' />
        <Section title='Section 2' text='Left view' className='section-2' />
        <Section title='Section 3' text='Right view' className='section-3' />
        <Section title='Section 4' text='Bottom view' className='section-4' />
        <Section 
          title='Section 5' 
          text='Interactive mode' 
          className='section-5' 
          interactiveMode={true} 
          trigger={handleInteractiveMode}
        />
        </div>
      <ThreeDViewer sectionsRef={sectionsRef} ref={threeDViewerRef} />
      <StyledParticles
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#18b69a',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#ffffff',
            },
            links: {
              color: '#ffffff',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}

export default App
