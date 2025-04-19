import AnimatedDiv from "@animations/AnimatedDiv";
import { imgFallbackNetworkStatus } from "@assets/index";
import Image from "@ui/Image";
import { LoaderButton } from "@ui/LoaderButton";

const FallbackNetworkStatus = () => {
  return (
    <div className="grid place-content-center h-svh overflow-hidden bg-white px-4 text-center">
      {/* Icon (You can replace this with a better offline icon if needed) */}

      <AnimatedDiv
        animationType="slide-top"
        className="flex flex-col items-center justify-center"
      >
        <div className="w-52 h-52">
          <Image highResSrc={imgFallbackNetworkStatus} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1">You appear to be offline</h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-4">
          You can't use application until you're connected to the internet
        </p>

        {/* Retry Button */}
        <LoaderButton
          label="Retry"
          // className="bg-blue-500 inline-block hover:bg-blue-600 text-white font-semibold py-1 px-6 rounded shadow transition duration-300"
          onClick={() => window.location.reload()}
        />
      </AnimatedDiv>
    </div>
  );
};

export default FallbackNetworkStatus;
