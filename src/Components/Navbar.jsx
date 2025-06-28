import PrimaryButton from "./PrimaryButton"

function Navbar() {
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="/ZenNotes_Logo.png" alt="ZenNotes Logo" width={60} className="select-none pointer-events-none" />
            <span className="ml-3 text-xl">ZenNotes</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <PrimaryButton value="Contact" link="https://github.com/ali-shakeel-dev" />
        </div>
      </header>
    </div>
  )
}

export default Navbar
