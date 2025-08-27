import Bell from "../assets/Bell.svg";
import Language from "../assets/Language.svg";
import Capture from "../assets/Capture.svg";
import SagerLogo from "../assets/SagerLogo.svg";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0b0b0b] text-white px-6 py-3 flex items-center justify-between border-b border-gray-700 z-50">

      <div className="flex items-center">
        <img 
          src={SagerLogo} 
          alt="Logo" 
          className="w-25 h-5 text-sm font-bold tracking-wider"
        /> 
      </div>

   
      <div className="flex items-center space-x-4">

     
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <img 
            src={Capture} 
            alt="Capture" 
            className="w-5 h-5 text-gray-300 hover:text-white"
          /> 
        </button>

 
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <img 
            src={Language} 
            alt="Language" 
            className="w-5 h-5 text-gray-300 hover:text-white"
          /> 
        </button>

    
        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            8
          </span>
          <img 
            src={Bell} 
            alt="Notifications" 
            className="w-5 h-5 text-gray-300 hover:text-white"
          />
        </button>

    
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
          <div className="text-right">
             <span className="text-sm font-medium text-gray-400">Hello, </span>
            <span className="text-sm font-medium text-white"> Mohammed Omar</span>
            <div className="text-xs text-gray-400">Technical Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
