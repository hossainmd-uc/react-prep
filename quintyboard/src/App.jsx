import { useState } from 'react'
import './App.css'
import Card from './components/Card'

function App() {

  return (

    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="logo.jpg" rel='icon' />
      <title>QLab</title>
    </head>
    <body>
      <div>
      <img src="/logo.jpg"/>
      <h1>Quintum Labs Components</h1>
      <div className='cards'>
        <Card title="Particle Accelerator Q" category="Particle Mechanisms"/>
        <Card title="Trans-Dimensional Frequency Dish" category="Signal Infrastructure"/>
        <Card title="Quantum Echo Stabilizer" category="Waveform Control"/>
        <Card title="Vacuum Resonance Chamber" category="Containment Systems"/>
        <Card title="Neutrino Phase Modulator" category="Particle Mechanisms"/>
        <Card title="Inter-Domain Signal Decoder" category="Analysis & Translation"/>
        <Card title="Gravitational Noise Suppressor" category="Environmental Control"/>
        <Card title="Temporal Drift Regulator" category="Time-Stability Systems"/>
        <Card title="Observer Safety Interlock" category="Containment Systems"/>
        <Card title="Anomalous Response Archive" category="Data & Intelligence"/>
      </div>
    </div>
    </body>
    </html>
    

  )
}

export default App
