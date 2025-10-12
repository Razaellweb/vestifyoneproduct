import React from 'react'
import Link from "next/link";

const CTA = () => {
  return (
    <div className="mt-[7rem] w-[97%] mx-auto md:mx-0 md:w-full bg-[var(--card)] py-[3rem] relative border border-base rounded-[1rem] overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[var(--primary)]/40 to-[var(--secondary)]/40" />
      <div className="relative w-[86%] md:w-[90%] mx-auto flex items-center flex-wrap justify-between">
        <div className="w-[96%] md:w-[67%] left-0">
          <h2 className="text-3xl md:text-4xl xl:text-5xl text-center md:text-left font-semibold">
            Start your journey with <span className="text-[var(--accent)]">Vestify One</span>
          </h2>
          <p className="text-base pt-4 text-muted text-center md:text-left">
            Automate savings, invest with confidence, and unlock instant loans up to 80% of your savings. Secure. Simple. Built for Nigerians.
          </p>
        </div>
        <div className="w-fit right-0 mt-6 md:mt-0 mx-auto md:mx-0">
          <Link href="/signup" className='px-7 py-3 rounded-full btn-primary text-base font-medium'>
            start saving now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CTA