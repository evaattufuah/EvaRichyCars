import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scene from "./Components/Scene";
import SignIn from "./Components/SignIn";
import MakePayment from "./Components/MakePayment";
import MakePayments from "./Components/MakePayments";
import LandingPage from "./Components/LandingPage";
import AllCarsPage from "./Components/AllCarsPage";
import BookingForm from "./Components/BookingForm";
import AboutUs from "./Components/AboutUs";
import Services from "./Components/Services";
import Blog from "./Components/Blog";
import BlogPost from "./Components/BlogPost";
import ScheduleServiceForm from "./Components/ScheduleServiceForm";
import ContactUs from "./Components/ContactUs";
import Cars from "./Components/Cars";
import VehicleSearch from "./Components/VehicleSearch";
import VehicleResults from "./Components/page/VehicleResults";
import CarDetail from "./Components/CarDetail";
import PurchasesPage from "./Components/PurchasesPage";
import BookingsPage from "./Components/BookingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing_page" element={<LandingPage />} />
        <Route path="/sign_up" element={<Scene />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/all_cars" element={<AllCarsPage />} />
        <Route path="/rent_cars" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/make_payment" element={<MakePayment />} />
        <Route path="/make_payments" element={<MakePayments />} />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/landing_page" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/schedule_services" element={<ScheduleServiceForm />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/vehicles" element={<VehicleResults />} />
        <Route path="/car/:slug" element={<CarDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
