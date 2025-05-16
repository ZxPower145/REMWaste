import React from "react"
import { motion } from "framer-motion"
import { BiInfoCircle } from "react-icons/bi"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useMediaQuery } from "../../hooks/useMediaQuery"

interface PercentageOption {
	id: string
	label: string
	value: string
}

interface PercentageTabProps {
	percentageOptions: PercentageOption[]
	heavyWastePercentage: string
	setHeavyWastePercentage: (id: string) => void
	onBack: () => void
	onContinue: () => void
}

/**
 * PercentageTab component - Allows selection of heavy waste percentage
 *
 * @param {PercentageOption[]} percentageOptions - Array of percentage options to display
 * @param {string} heavyWastePercentage - Currently selected percentage option ID
 * @param {Function} setHeavyWastePercentage - Function to set the selected percentage
 * @param {Function} onBack - Function to call when back button is clicked
 * @param {Function} onContinue - Function to call when continue button is clicked
 */
const PercentageTab: React.FC<PercentageTabProps> = ({
																											 percentageOptions,
																											 heavyWastePercentage,
																											 setHeavyWastePercentage,
																											 onBack,
																											 onContinue
																										 }) => {
	const isMobile = useMediaQuery("(max-width: 640px)")

	return (
		<motion.div
			key="percentage"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.2 }}
		>
			<h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">
				Approximate percentage of heavy waste:
			</h3>

			<div className="grid grid-cols-1 gap-2 sm:gap-3">
				{percentageOptions.map((option) => (
					<motion.button
						key={option.id}
						whileHover={{ scale: isMobile ? 1 : 1.01 }}
						whileTap={{ scale: 0.99 }}
						className={`p-3 sm:p-4 rounded-lg text-left transition-colors flex items-center ${
							heavyWastePercentage === option.id
								? "bg-blue-900/50 border border-blue-500"
								: "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
						}`}
						onClick={() => setHeavyWastePercentage(option.id)}
						aria-pressed={heavyWastePercentage === option.id}
					>
						<div className="flex-1">
							<div className="font-medium text-sm sm:text-base">{option.label}</div>
						</div>
						<div
							className={`text-lg sm:text-xl font-bold ${
								heavyWastePercentage === option.id ? "text-blue-400" : "text-gray-500"
							}`}
						>
							{option.value}
						</div>
						{heavyWastePercentage === option.id && (
							<div className="ml-2 sm:ml-3 flex-shrink-0">
								<div className="bg-blue-500 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
						)}
					</motion.button>
				))}
			</div>

			{/* Info box */}
			<motion.div
				className="mt-4 sm:mt-6 bg-blue-900/30 border border-blue-800/50 rounded-lg p-3 sm:p-4"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="flex">
					<BiInfoCircle className="text-blue-400 h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0 mt-0.5" />
					<div>
						<p className="text-xs sm:text-sm text-white">Skip Size Restrictions</p>
						<p className="text-xs text-gray-400 mt-1">
							For safety reasons, heavy waste can only be disposed of in skips up to 8 yards. Larger skips
							will not be available if heavy waste is selected.
						</p>
					</div>
				</div>
			</motion.div>

			<div className="mt-5 sm:mt-6 flex justify-between">
				<motion.button
					whileHover={{ scale: isMobile ? 1 : 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onBack}
					className="px-3 sm:px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors flex items-center text-sm sm:text-base"
				>
					<FaArrowLeft className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Back
				</motion.button>
				<motion.button
					whileHover={{ scale: isMobile ? 1 : 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={onContinue}
					className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors flex items-center text-sm sm:text-base"
				>
					Continue <FaArrowRight className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
				</motion.button>
			</div>
		</motion.div>
	)
}

export default PercentageTab
