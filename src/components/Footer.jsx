import { logo_2 } from "../assets/home";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-14 text-white">
      <Container>
        <div className="grid place-items-center sm:text-left text-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <img src={logo_2} alt="Grant canyon" className="w-100 h-100" />
          <div className="sm:mt-0 mt-14">
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">company</h1>
            <ul>
              <li>
                About Us
              </li>
              <li>
                Contact Us
              </li>
              <li>
                Knowledge Base
              </li>
              <li>
                Tutorials
              </li>
              <li>
                Terms and Conditions
              </li>
              <li>
                Cookie Policy
              </li>
              <li>
                Privacy Policy
              </li>
              <li>
                Careers
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">browser</h1>
            <ul>
              {/* <li>
                <a href="#">Memberships</a>
              </li> */}
              <li>
                <p >CJobs</p>
              </li>
              <li>
                Experts
              </li>
              <li>
                Organizations
              </li>
              <li>
                Funding
              </li>
              <li>
                CAwards
              </li>
              <li>
                donors
              </li>
              <li>
                News
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-bold capitalize sm:pt-0 pt-8 pb-4">connect</h1>
            <ul>
              <li>
                Twitter
              </li>
              <li>
                Facebook
              </li>
              <li>
                Linkedin
              </li>
              <li>
                Youtube
              </li>
              <li>
                RSS
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
