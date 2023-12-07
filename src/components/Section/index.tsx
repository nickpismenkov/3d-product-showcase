import React from 'react'
import { Container } from './styles'

type Props = {
    title: string
    text: string
    className: string
    interactiveMode?: boolean
    trigger?: () => void
}

export const Section: React.FC<Props> = ({ title, text, className, trigger, interactiveMode = false }) => {
    return (
        <Container $darkMode={interactiveMode} className={className}>
            <div>
                <h1>{title}</h1>
                <p>{text}</p>
                {interactiveMode ? <button onClick={trigger}>Click to enable!</button> : null}
            </div>
        </Container>
    )
}
