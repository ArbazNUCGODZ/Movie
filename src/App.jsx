import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./assets/pages/HomePage";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import AdminLogin from "./assets/pages/AdminLogin";
import Section from "./assets/components/Section";
import Movies from "./assets/components/Movies";
import MovieDetails from "./assets/components/MovieDetails";
import { UserProvider } from "./assets/pages/userContext";
import MyTickets from "./assets/components/MyTickets";
import AllTickets from "./assets/pages/AllTickets";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
            <Route path="/" element={<Homepage />}>
              <Route path="/" element={<Section />} />
              <Route path="login" element={<Login />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="admin" element={<AdminLogin />} />
              <Route path="/movie" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/myTickets" element={<MyTickets />} />
              <Route path="/allTicket" element={<AllTickets />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
