import React from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";

const Home = () => {
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-fill container py-4">
          <div className="container my-5">
            <HeroSection />
          </div>
        </main>
        {/* <Footer /> */}
      </div>
      <footer className="text-center text-white py-3 mt-auto">
        <div className="container">SmartPark Management System ©2025 |</div>
      </footer>
    </>
  );
};

export default Home;
