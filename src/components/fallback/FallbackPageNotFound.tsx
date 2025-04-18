import AnimatedDiv from "@animations/AnimatedDiv";
import { imgFallbackPageNotFound } from "@assets/index";
import Image from "@ui/Image";
import { NavigationRoutes } from "@utils/constant";
import { useNavigate } from "react-router-dom";

const FallbackPageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="grid place-content-center h-svh overflow-hidden bg-gray-900 text-white px-4 text-center">
      {/* Icon (You can replace this with a better offline icon if needed) */}

      <AnimatedDiv
        animationType="slide-top"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-42 h-42 mb-2">
          <Image
            highResSrc={imgFallbackPageNotFound}
            imgClassName="rounded-full"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">Page Not Found</h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-4">
          You can't use application until you're connected to the internet
        </p>

        {/* Retry Button */}
        <button
          className="bg-blue-500 inline-block hover:bg-blue-600 text-white font-semibold py-1 px-6 rounded shadow transition duration-300"
          onClick={() => navigate(NavigationRoutes.BASE)}
        >
          Go Back
        </button>
      </AnimatedDiv>
    </div>
  );
};

export default FallbackPageNotFound;
