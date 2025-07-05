import one from "../assets/a.png"
import two from "../assets/b.png"
import three from "../assets/c.png"

export default function Navbar() {
  return (
    <div>
        <div className="flex items-center justify-between p-6 bg-white shadow">
      
      {/* Left logo */}
      <div>
        <img
          className="w-32"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
        />
      </div>

      {/* Center logos */}
      <div className="flex gap-4 justify-center">
        <a className="flex items-center gap-2">
            <img className="w-16" src={one} alt="Logo" />
            <p>logement</p>
        </a>
        <a className="flex items-center gap-2">
            <img className="w-16" src={two} alt="Logo" />
            <p className="font-semibold">service</p>
        </a>
        <a className="flex items-center gap-2">
            <img className="w-16" src={three} alt="Logo" />
            <p>expérience</p>
        </a>
        </div>

      {/* Right content */}
      <div>
        hey
      </div>
      
    </div>




    <div className="flex justify-center mt-12">
        <p className="rounded-full w-1/2 p-4 bg-red-400 text-center text-white">
             11
        </p>
         
         </div>


    </div>
  );
}
