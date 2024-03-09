import junk_bazar from "../../assets/PNG/junk bazar logo2 1.png";
import google from "../../assets/SVG/Google play.svg";
import apple from "../../assets/SVG/Apple store.svg";


const Footer = () => {

  return (
    <footer className="bg-lime-400 py-4 md:p-4 mt-10 text-white font-['Gilroy-Medium']">
      <div className="p-0 md:p-8 lg:px-10 ">
        <div className="block md:grid md:grid-cols-2 lg:grid-cols-4 lg:pb-10 p-5">
          <section className="">
            <div className="">
              <img
                src={junk_bazar}
                alt="junzbazar-logo"
                className="w-40 my-5"
              />
              <div className="hidden md:block">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Newsletter"
                  className="py-2 rounded-tl-full rounded-bl-full px-3"
                />
                <button
                  onClick={() => {}}
                  className="bg-lime-500 rounded-tr-full rounded-br-full py-[0.6rem] px-2 text-sm text-white"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </section>
          <section>
            <div className="mt-10 lg:mt-0">
              <h1 className="lg:text-center font-bold tracking-widest">
                Quicklinks
              </h1>
              <ul className="underline lg:flex flex-col justify-center items-center leading-loose">
                {/* <Link to="/"> */}
                  <li>Home</li>
                {/* </Link> */}
                {/* <Link to="/about"> */}
                  <li>About Us</li>
                {/* </Link> */}
                {/* <Link to="/contact-us"> */}
                  <li>Contact US</li>
                {/* </Link> */}
                <li
                  className="cursor-pointer"
                  
                >
                  Price List
                </li>
              </ul>
            </div>
          </section>
          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Company</h1>
              <ul className="underline leading-loose">
                <li>Supprt</li>
                <li>Terms and Conditions</li>
                <li>Support</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="mt-5 lg:mt-0">
              <h1 className="font-bold tracking-widest">Reach Us</h1>
              <ul className="underline leading-loose">
                <li>info@junkBazar.in</li>
                <li>+913496933405</li>
                <li>12, Dariyapur, Ahmedabad Gujara</li>
              </ul>
            </div>
          </section>

          <div className="block md:hidden my-10 mb-10">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Newsletter"
              className="py-2 rounded-tl-full rounded-bl-full px-3"
            />
            <button
              onClick={() => {}}
              className="bg-lime-500 rounded-tr-full rounded-br-full py-[0.6rem] px-2 text-sm text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
        <hr
          style={{
            color: "#fff",
            backgroundColor: "#fff",
            height: "1px",
            border: "none",
          }}
        />

        <div className="flex flex-col md:flex-row pb-5 justify-around items-center mt-3">
          <p className=" text-xl mt-4 text-white pb-5">
            &copy;2023 JunkBazar. All rights reserved
          </p>
          <div className="flex justify-between items-center">
            <img src={google} alt="google-img" className="w-36" />
            <img src={apple} alt="apple-img" className="w-36 ml-3" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
