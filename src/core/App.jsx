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

//main pages
import Home from "../pages/Home";
import News from "../pages/News";
import Clients from "../pages/Clients";
import Pricing from "../pages/Pricing";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin"

//subpages
import Article from "../news/Article";
import FaqSimple from "../clients_zone/FaqSimple";
import Anamnesis from "../clients_zone/Anamnesis";



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
            <Route path="clients" element={<Clients />}>
              <Route path="faq" element={<FaqSimple />} />
              <Route path="anamnesis" element={<Anamnesis />} />
            </Route>
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
