// import * as THREE from 'three'
// import ReactDOM from 'react-dom'
// import React, { Suspense, useRef } from 'react'
// import { Canvas, extend, useFrame, useThree, useLoader } from 'react-three-fiber'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import './styles.css'

// extend({ OrbitControls })

// function Controls(props) {
//   const { camera, gl } = useThree()
//   const ref = useRef()
//   useFrame(() => ref.current.update())
//   return <orbitControls ref={ref} target={[0, 0, 0]} {...props} args={[camera, gl.domElement]} />
// }

// function Dome() {
//   const texture = useLoader(THREE.TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/2294472375_24a3b8ef46_o.jpg')
//   return (
//     <mesh>
//       <BoxGeometry attach="geometry" args={[500, 60, 40]} />
//       <meshBasicMaterial attach="material" map={texture} side={THREE.BackSide} />
//     </mesh>
//   )
// }

// const Panorama360View = () =>{
   
//     return(
//         <>
//             <Canvas camera={{ position: [0, 0, 0.1] }}>
//                 <Controls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate rotateSpeed={-0.5} />
//                 <Suspense fallback={null}>
//                 <Dome />
//                 </Suspense>
//             </Canvas>
//         </>
//     )
// }

// export default Panorama360View;


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';



interface Panorama360ViewProps {
    imagePath: string,
    isOpenDialogue: boolean,
    setIsOpenDialogue: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Panorama360View(props:Panorama360ViewProps) {

  const handleClickOpen = () => {
    props.setIsOpenDialogue(true);
  };

  const handleClose = () => {
    props.setIsOpenDialogue(false);
  };

  return (
  
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={props.isOpenDialogue}
        onClose={handleClose}
      >
        <DialogContent>
            <img style={{ width: '100%' }} src={props.imagePath}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
  );
}