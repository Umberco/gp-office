import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css";


import './App.css'
import "./AppShellNav"
import { AppShellNav } from "./AppShellNav";
import Home from "./pages/Home";
import News from "./pages/News";
import Appointment from "./pages/Appointment";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Article from "./pages/Article";


function App() {
  return(
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShellNav />}>
            <Route index element={<Home />}/>
            <Route path="news" element={<News />}/>
              <Route path=":articleId" element={<Article />}/>
            <Route path="appointment" element={<Appointment />}/>
            <Route path="pricing" element={<Pricing />}/>
            <Route path="services" element={<Services />}/>
            <Route path="contact" element={<Contact />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
