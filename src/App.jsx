import Header from "./components/Header";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Navbar />

      <main>
        <About />
        <Education />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;