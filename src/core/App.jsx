import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css";

import { AuthProvider } from "../context/AuthContext";

import './App.css'
import "./AppShellNav"
import { AppShellNav } from "./AppShellNav";
import Home from "../pages/Home";
import News from "../pages/News";
import Appointment from "../pages/Appointment";
import Pricing from "../pages/Pricing";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Article from "../pages/Article";
import Admin from "../pages/Admin"


function App() {
  return(
   <AuthProvider> 
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShellNav />}>
            <Route index element={<Home />}/>
            <Route path="news" element={<News />}>
              <Route path=":articleId" element={<Article />}/>
            </Route>
            <Route path="appointment" element={<Appointment />}/>
            <Route path="pricing" element={<Pricing />}/>
            <Route path="services" element={<Services />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="admin" element={<Admin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </AuthProvider>
  )
}

export default App
