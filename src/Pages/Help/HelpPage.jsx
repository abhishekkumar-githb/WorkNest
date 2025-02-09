/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-[#1e293b] rounded-lg border border-[#2d3a4f]">
            <div className="p-6 flex items-center gap-4">
              <div className="p-3 bg-[#2d3a4f] rounded-full">
                <FaHandsHelping className="w-6 h-6 text-purple-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Help Center</h1>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Card */}
          <div className="bg-[#1e293b] rounded-lg border border-[#2d3a4f]">
            <div className="p-8">
              <div className="mb-6">
                <div className="p-4 bg-[#2d3a4f] rounded-full w-fit">
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Email Support
              </h3>
              <a
                href="mailto:support@gmail.com"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                support@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-[#1e293b] rounded-lg border border-[#2d3a4f]">
            <div className="p-8">
              <div className="mb-6">
                <div className="p-4 bg-[#2d3a4f] rounded-full w-fit">
                  <Phone className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Phone Support
              </h3>
              <a
                href="tel:+918523697412"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                +91 8523697412
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
