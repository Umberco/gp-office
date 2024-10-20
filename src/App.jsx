import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css";


import './App.css'
import "./MobileNavbar"
import { MobileNavbar } from "./MobileNavbar";


function App() {
  return(
    <MantineProvider>
      <MobileNavbar>
      </MobileNavbar>
    </MantineProvider>
  )
}

export default App
