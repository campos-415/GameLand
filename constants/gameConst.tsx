import {
  SiAppstore,
  SiEpicgames,
  SiNintendo,
  SiNintendo3Ds,
  SiNintendoswitch,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiPlaystationvita,
  SiWii,
  SiWiiu,
} from "react-icons/si";
import { TiVendorMicrosoft } from "react-icons/ti";
import { RiXboxLine } from "react-icons/ri";
import {
  IoLogoAndroid,
  IoLogoApple,
  IoLogoPlaystation,
  IoLogoSteam,
  IoLogoXbox,
  IoMdAppstore,
  IoLogoGoogleplus,
} from "react-icons/io";
import { Platform, Stores } from "../typings";

 type PlatformName = Platform["platform"]["name"];

const platformIconMap: Record<PlatformName, React.ReactNode> = {
  "PlayStation 5": <SiPlaystation5 className="w-auto h-auto" />,
  "PlayStation 4": <SiPlaystation4 className="w-auto h-auto" />,
  "PlayStation 3": <SiPlaystation3 className="w-auto h-auto" />,
  "PS Vita": <SiPlaystationvita className="w-auto h-auto" />,
  "Xbox One": <IoLogoXbox className="w-auto h-auto" />,
  "Xbox Series S/X": <RiXboxLine className="w-auto h-auto" />,
  "Xbox 360": <RiXboxLine className="w-auto h-auto" />,
  Wii: <SiWii className="w-auto h-auto" />,
  "Wii U": <SiWiiu />,
  "Nintendo Switch": <SiNintendoswitch className="w-auto h-auto" />,
  "Nintendo DS": <SiNintendo3Ds className="w-auto h-auto" />,
  Linux: <IoLogoSteam className="w-auto h-auto" />,
  PC: <TiVendorMicrosoft className="w-auto h-auto" />,
  macOS: <IoLogoApple className="w-auto h-auto" />,
  iOS: <IoLogoApple className="w-auto h-auto" />,
  Android: <IoLogoAndroid className="w-auto h-auto" />,
};

export const renderPlatformIcons = (platforms?: Platform[]) => {
  if (!platforms) {
    return null;
  }

  return platforms?.map((plat: Platform) => {
    const icon = platformIconMap[plat?.platform?.name];
    return icon ?? icon
  });
};
export const renderPlatformIconsAndNames = (platforms?: Platform[]) => {
  if (!platforms) {
    return null;
  }

  return platforms?.map((plat: Platform) => {
    const icon = platformIconMap[plat?.platform?.name];
    const name = plat?.platform?.name;
    return (
      <button key={name} className="bannerButton hover:scale-110  bg-[gray]/70">
        <span>{icon}</span>
        {name}
      </button>
    );
  });
};




 type StoreName = Stores["store"]["name"];

 const storeIconMap: Record<StoreName, React.ReactNode> = {
   "PlayStation Store": <IoLogoPlaystation className="w-auto h-auto" />,
   "Epic Games": <SiEpicgames className="w-auto h-auto" />,
   "Xbox Store": <TiVendorMicrosoft className="w-auto h-auto" />,
   "Xbox 360 Store": <TiVendorMicrosoft className="w-auto h-auto" />,
   "Nintendo Store": <SiNintendo className="w-auto h-auto" />,
   Steam: <IoLogoSteam className="w-auto h-auto" />,
   GOG: <IoMdAppstore className="w-auto h-auto" />,
   "itch.io": <IoMdAppstore className="w-auto h-auto" />,
   "App Store": <SiAppstore className="w-auto h-auto" />,
   "Google Play": <IoLogoGoogleplus className="w-auto h-auto" />,
 };

 export const renderStoreIcons = (store?: Stores[]) => {
   if (!store) {
     return null;
   }

   return store?.map((store: Stores) => {
     const icon = storeIconMap[store?.store?.name];
     const name = store?.store?.name;
     return (
       <button
         key={name}
         className="bannerButton hover:scale-110 bg-[gray]/70">
         <span>{icon}</span>
         {name}
       </button>
     );
   });
 };