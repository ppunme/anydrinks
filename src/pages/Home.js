import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <main>
        <div class="position-relative overflow-hidden py-5 p-sm-5 text-center bg-light home-header">
          <div class="col-md-6 col-lg-7 px-3 py-4 p-sm-5 px-md-0 py-md-5 px-lg-5">
            <h1 class="display-4 fw-normal">Finding your next Beer!</h1>
            <p class="lead mb-4">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est in voluptate velit esse
              laborum.
            </p>
            <Link
              to="/anydrinks/products"
              class="default-btn px-4 me-md-2 mt-5"
            >
              Explore
            </Link>
          </div>

          <div className="product-device">
            <img
              src="https://images.unsplash.com/photo-1558642891-54be180ea339?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="home-img"
              className="shadow-md d-none d-md-block"
            />
          </div>
        </div>

        <div class="container col-xxl-8 p-4">
          <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div class="col-10 col-sm-8 col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1505075106905-fb052892c116?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                class="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div class="col-lg-6">
              <h1 class="display-6 fw-bold lh-1 mb-3">
                Latest news from AnyDrinks
              </h1>
              <p class="lead fw-normal">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>

              <button type="button" class="btn btn-outline-secondary">
                Read more
              </button>
            </div>
          </div>
        </div>

        <div class="container col-xxl-8 px-4 py-5" id="hanging-icons">
          <h2 class="pb-2 border-bottom">Why shop AnyDrinks?</h2>
          <div class="row g-4 py-5 row-cols-1 row-cols-md-3">
            <div class="col d-flex align-items-start">
              <div class="icon-square text-dark flex-shrink-0 me-3">
                <i
                  class="bi bi-calendar-check"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>
              <div>
                <h2>Open 7 days</h2>
                <p>
                  Risus pretium quam vulputate dignissim suspendisse in est ante
                  in. Suspendisse potenti nullam ac tortor vitae purus.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div class="icon-square text-dark flex-shrink-0 me-3">
                <i class="bi bi-truck" style={{ fontSize: "1.5rem" }}></i>
              </div>
              <div>
                <h2>Same day delivery</h2>
                <p>
                  Egestas sed tempus urna et pharetra pharetra massa. Rhoncus
                  aenean vel elit scelerisque mauris pellentesque pulvinar
                  pellentesque.
                </p>
              </div>
            </div>
            <div class="col d-flex align-items-start">
              <div class="icon-square text-dark flex-shrink-0 me-3">
                <i
                  class="bi bi-chat-right-quote"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </div>
              <div>
                <h2>Explore The Best Range</h2>
                <p>
                  Nunc aliquet bibendum enim facilisis gravida neque convallis.
                  Sed enim ut sem viverra. Euismod quis viverra nibh cras
                  pulvinar mattis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
