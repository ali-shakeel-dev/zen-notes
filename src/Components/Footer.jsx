import React from 'react'

function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="bg-gray-100">
        <div className="container px-5 py-4 mx-auto flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col items-center justify-between gap-2">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left ">
            <a href='/' className="flex title-font font-medium items-center md:justify-start justify-center lg:justify-start text-gray-900 mb-4 md:mb-0 sm:justify-center">
              <img src="/ZenNotes_Logo.png" alt="ZenNotes Logo" width={60} className="select-none pointer-events-none" />
              <span className="ml-3 text-xl">ZenNotes</span>
            </a>
            <p className="mt-2 text-sm text-gray-500">A simple and fast notes app to jot down ideas, organize thoughts, and never forget what matters.</p>
            <p className="mt-2 text-gray-500 text-sm md:text-start lg:text-start sm:text-center">© {new Date().getFullYear()} ZenTodos —
              <a href="https://github.com/ali-shakeel-dev" rel="noopener noreferrer" className="text-gray-600 ml-1 font-bold" target="_blank">Ali Shakeel</a>
            </p>
          </div>
          <span className="inline-flex mt-2 justify-center sm:justify-start">
            <a href='https://x.com/alishakeel__' target='blank' className="ml-3 text-gray-500">
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a href='https://www.linkedin.com/in/muhammad-ali-shakeel/' target='blank' className="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
