import { MailsIcon as Mail, PhoneIcon as Phone, MapPinIcon as MapPin, ShieldCheck } from "lucide-react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-[var(--card)] border-t border-base mt-[7rem] flex items-center justify-center">
      <div className="w-[98%] md:w-[90%] 2xl:w-[80%] mt-[3.5rem] mb-[2rem]">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="left-0 flex gap-2 items-center">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--secondary)]" />
            <h1 className="text-2xl font-semibold">Vestify One</h1>
          </div>

          <div className="flex items-center gap-1 mt-[1.2rem] md:mt-[2.5rem]">
            <h1 className="text-lg md:text-xl px-2 md:px-5 py-2 rounded-full cursor-pointer">
              <Link href="/">Home</Link>
            </h1>
            <h1 className="text-lg md:text-xl px-2 md:px-5 py-2 rounded-full cursor-pointer">
              <a href="#features">Features</a>
            </h1>
            <h1 className="text-lg md:text-xl px-2 md:px-5 py-2 rounded-full cursor-pointer">
              <a href="#pricing">Pricing</a>
            </h1>
            <h1 className="text-lg md:text-xl px-2 md:px-5 py-2 rounded-full cursor-pointer">
              <a href="#faq">FAQ</a>
            </h1>
          </div>

          <div className="w-full h-px bg-[var(--border)] mt-[1.5rem] md:mt-[2.5rem]"></div>

          <div className="flex items-center gap-1 mt-[1.5rem] md:mt-[2.5rem] flex-wrap">
            <h1 className="flex items-center gap-2 text-lg md:text-xl px-2 md:px-5 py-2 rounded-full">
              <Mail className="w-5 h-5 text-[var(--accent)]" /> support@vestify.one
            </h1>
            <h1 className="flex items-center gap-2 text-lg md:text-xl px-2 md:px-5 py-2 rounded-full">
              <Phone className="w-5 h-5 text-[var(--accent)]" /> +234 800 000 0000
            </h1>
            <h1 className="flex items-center gap-2 text-lg md:text-xl px-2 md:px-5 py-2 mx-auto rounded-full">
              <MapPin className="w-5 h-5 text-[var(--accent)]" /> Lagos, Nigeria
            </h1>
          </div>

          <div className="w-full h-px bg-[var(--border)] mt-[1.5rem] md:mt-[2.5rem]"></div>

          <div className="w-full xl:flex items-center justify-between mt-[1.5rem] md:mt-[2.5rem] px-3 py-3 bg-[var(--bg)] border border-base rounded-full hidden">
            <div className="flex items-center gap-2 text-sm text-muted">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" /> Secured by PCI‑DSS processors
            </div>

            <div className="w-fit">
              <p className="text-base text-muted">© {new Date().getFullYear()} Vestify One. All rights reserved.</p>
            </div>

            <div className="w-fit">
              <p className="text-base text-muted">
                <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
              </p>
            </div>
          </div>

          <div className="w-[98%] mx-auto md:hidden flex flex-col items-center justify-center bg-[var(--bg)] border border-base rounded-[1rem] mt-[3rem] md:mt-[2.5rem]">
            <div className="flex items-center gap-2 mt-4 text-sm text-muted">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" /> Secured by PCI‑DSS processors
            </div>
            <p className="text-base text-muted mt-4">
              © {new Date().getFullYear()} Vestify One. All rights reserved.
            </p>
            <p className="text-base text-muted mt-4 mb-7">
              <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
