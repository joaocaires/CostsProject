import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/components/pages/Home'
import Contact from '../src/components/pages/Contact'
import Company from '../src/components/pages/Company'
import NewProject from '../src/components/pages/NewProject'
import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects'

function App() {
  return (
    <Router>
      <NavBar />
    <Container customClass="min-height">
     <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/projects' element={<Projects/>} />
        <Route exact path='/company' element={<Company/>} />
        <Route exact path='/contact' element={<Contact/>} />
        <Route exact path='/newproject' element={<NewProject/>} />
       </Routes>
    </Container>
    <Footer/>
    </Router>
  );
}

export default App;
