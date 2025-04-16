import AnimatedDiv from '@animations/AnimatedDiv'
import { imgFallbackSomethingWentsWrong } from '@assets/index'
import Image from '@ui/Image'

const FallbackErrorBoundary = () => {
  return (
     <div className="grid place-content-center h-svh overflow-hidden bg-gray-900 text-white px-4 text-center">
      {/* Icon (You can replace this with a better offline icon if needed) */}

      <AnimatedDiv
      animationType="slide-top"
      className="flex flex-col items-center justify-center">
     <div className="w-92 h-auto mb-3">
        <Image highResSrc={imgFallbackSomethingWentsWrong} imgClassName="rounded-2xl"/>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-1">Oops! Something wents wrong</h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-4">
        An unexpected error occurred. Check your connection or try refreshing the page.
      </p>

      {/* Retry Button */}
      <button
        className="bg-blue-500 inline-block hover:bg-blue-600 text-white font-semibold py-1 px-6 rounded shadow transition duration-300"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
      </AnimatedDiv>
    </div>
  )
}

export default FallbackErrorBoundary