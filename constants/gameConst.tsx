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
  "PlayStation 5": <SiPlaystation5 />,
  "PlayStation 4": <SiPlaystation4 />,
  "PlayStation 3": <SiPlaystation3 />,
  "PS Vita": <SiPlaystationvita />,
  "Xbox One": <IoLogoXbox />,
  "Xbox Series S/X": <RiXboxLine />,
  "Xbox 360": <RiXboxLine />,
  Wii: <SiWii />,
  "Wii U": <SiWiiu />,
  "Nintendo Switch": <SiNintendoswitch />,
  "Nintendo DS": <SiNintendo3Ds />,
  Linux: <IoLogoSteam />,
  PC: <TiVendorMicrosoft />,
  macOS: <IoLogoApple />,
  iOS: <IoLogoApple />,
  Android: <IoLogoAndroid />,
};

export const renderPlatformIcons = (platforms?: Platform[]) => {
  if (!platforms) {
    return null;
  }

  return platforms?.map((plat: Platform) => {
    const icon = platformIconMap[plat?.platform?.name];
    return icon ? icon : null;
  });
};




 type StoreName = Stores["store"]["name"];

 const storeIconMap: Record<StoreName, React.ReactNode> = {
   "PlayStation Store": <IoLogoPlaystation />,
   "Epic Games": <SiEpicgames />,
   "Xbox Store": <TiVendorMicrosoft />,
   "Xbox 360 Store": <TiVendorMicrosoft />,
   "Nintendo Store": <SiNintendo />,
   Steam: <IoLogoSteam />,
   GOG: <IoMdAppstore />,
   "itch.io": <IoMdAppstore />,
   "App Store": <SiAppstore />,
   "Google Play": <IoLogoGoogleplus />,
 };

 export const renderStoreIcons = (store?: Stores[]) => {
   if (!store) {
     return null;
   }

   return store?.map((store: Stores) => {
     const icon = storeIconMap[store?.store?.name];
     return icon ? icon : null;
   });
 };