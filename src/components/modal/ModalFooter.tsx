import React from "react"
import { motion } from "framer-motion"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useMediaQuery } from "../../hooks/useMediaQuery"

interface ModalFooterProps {
	onBack: () => void
	onContinue: () => void
	showBackButton?: boolean
}

/**
 * ModalFooter component - Displays navigation buttons at the bottom of a modal
 *
 * @param {Function} onBack - Function to call when back button is clicked
 * @param {Function} onContinue - Function to call when continue button is clicked
 * @param {boolean} showBackButton - Whether to show the back button (defaults to true)
 */
const ModalFooter: React.FC<ModalFooterProps> = ({ onBack, onContinue, showBackButton = true }) => {
	const isMobile = useMediaQuery("(max-width: 640px)")

	return (
		<div className="mt-5 sm:mt-6 flex justify-between">
			{showBackButton ? (
				<motion.button
					whileHover={{ scale: isMobile ? 1 : 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onBack}
					className="px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors flex items-center text-sm sm:text-base"
				>
					<FaArrowLeft className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back
				</motion.button>
			) : (
				<div></div> // Empty div to maintain flex spacing
			)}
			<motion.button
				whileHover={{ scale: isMobile ? 1 : 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={onContinue}
				className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center text-sm sm:text-base"
			>
				Continue <FaArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
			</motion.button>
		</div>
	)
}

export default ModalFooter
