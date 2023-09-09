
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { EmailIndex } from './pages/EmailIndex';
import AppHeader from './cmps/AppHeader';
import AppFooter from './cmps/AppFooter';
import { EmailDetails } from './cmps/EmailDetails'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/about" element={<AboutUs />}/>
                        <Route path="/mail" element={<EmailIndex />}/>
                        <Route path="/mail/:emailId" element={<EmailDetails />} />
                    </Routes>
                </main>

                <AppFooter />
            </section>
        </Router>

    )
}
