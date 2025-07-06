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


    <div className="flex justify-center mt-12 ">  
      <div className="flex items-center rounded-full w-1/2 p-2 shadow-md  border-[0.2px] border-gray-300">
    <img
      className="w-12"
      src="https://brandlogos.net/wp-content/uploads/2025/02/apple_intelligence-logo_brandlogos.net_zmypw.png"
      alt="logo"
    />
     <div className="flex  text-xs justify-center items-center flex-1 text-center">
     
    </div>
  </div>
</div>


    


    </div>
  );
}
