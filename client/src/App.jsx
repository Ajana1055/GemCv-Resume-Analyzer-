import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import AllUser from "./pages/AllUser";
import Analyze from "./pages/Analyze";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./pages/ProtectedRoute"
import ResumeBuilder from "./pages/ResumeBuilder";

function App() {
  return (
    <BrowserRouter>

      {/* <nav>
        <Link to="/">Home</Link> |{"    "}
        <Link to="/about">About</Link> |{"     "}
        <Link to="/signup">Signup</Link> |{"     "}
        <Link to="/login">Login</Link>|{" "}
        <Link to="/logout">Logout</Link>|{" "}
        <Link to='/user'>User</Link>
      </nav> */}
      <Layout>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={ <ProtectedRoute> 
              <About />
            </ProtectedRoute> } />

            <Route path="/analyze" element={ <ProtectedRoute> 
              <Analyze />
            </ProtectedRoute> } />

            

            <Route path="/user" element={ <ProtectedRoute>
              <AllUser />
            </ProtectedRoute> } />


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="generate-resume" element={<ProtectedRoute>
          <ResumeBuilder/>  </ProtectedRoute>}/>

        
        <Route path="Logout" element={<ProtectedRoute>
          <Logout/>  </ProtectedRoute>}/>
      

      <Route path="/Contact" element={<ProtectedRoute>
          <ContactUs/>  </ProtectedRoute>}/>

      </Routes>

      
</Layout>
    </BrowserRouter>
  );
}

export default App;
