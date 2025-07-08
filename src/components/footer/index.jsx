import React from "react";
import youtube from "../../assets/youtube.png";
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-4 py-8 rounded-t-[60px] mt-20 b-0">
      <div className="w-[90%] m-auto mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Aloqa qiling</h3>

            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0091eb"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  Bizga to'g'ridan-to'g'ri qo'ng'iroq qilingmi?
                </p>
                <p className="hover:text-blue-500 cursor-pointer">
                  +1 234 567 8910
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0091eb"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Manzil</p>
                <p className="hover:text-blue-500 cursor-pointer">
                  Xovard ko'chasi, San-Fransisko
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#0091eb"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500">Elektron pochta</p>
                <p className="hover:text-blue-500 cursor-pointer">
                  contact@eduma.com
                </p>
              </div>
            </div>
          </div>

          {/* Need Some Help */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Yordam kerakmi?</h3>
            <p className="hover:text-blue-500 cursor-pointer">FAQs</p>
            <p className="hover:text-blue-500 cursor-pointer">Aloqa</p>
          </div>

          {/* Popular Subjects */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Ommabop mavzular</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="hover:text-blue-500 cursor-pointer">Dasturchi</p>
              <p className="hover:text-blue-500 cursor-pointer">Marketing</p>
              <p className="hover:text-blue-500 cursor-pointer">Marketing</p>
              <p className="hover:text-blue-500 cursor-pointer">Biznes</p>
              <p className="hover:text-blue-500 cursor-pointer">Design</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ijtimoiy tarmoqlar</h3>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={youtube} alt="YouTube" className="w-5 h-5" />
                <span>YouTube</span>
              </div>
              <span className="text-gray-500 text-sm">2,3M Subribe</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={facebook} alt="Facebook" className="w-5 h-5" />
                <span>Facebook</span>
              </div>
              <span className="text-gray-500 text-sm">2,3M Subribe</span>
            </div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={instagram} alt="Instagram" className="w-5 h-5" />
                <span>Instagram</span>
              </div>
              <span className="text-gray-500 text-sm">2,3M Subribe</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={twitter} alt="Twitter" className="w-5 h-5" />
                <span>Twitter</span>
              </div>
              <span className="text-gray-500 text-sm">2,3M Subribe</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Eduma. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
