import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/components/pages/Home'
import Contact from '../src/components/pages/Contact'
import Company from '../src/components/pages/Company'
import NewProject from '../src/components/pages/NewProject'
import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'

function App() {
  return (
    <Router>
      <NavBar />
    <Container customClass="min-height">
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/company' element={<Company/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/newproject' element={<NewProject/>} />
        <Route path='/project/:id' element={<Project/>}/>
       </Routes>
    </Container>
    <Footer/>
    </Router>
  );
}

export default App;
