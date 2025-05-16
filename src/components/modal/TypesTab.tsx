import React from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import { useMediaQuery } from "../../hooks/useMediaQuery"

interface WasteOption {
	id: string
	label: string
	icon: React.ReactNode
	description: string
}

interface TypesTabProps {
	heavyWasteOptions: WasteOption[]
	heavyWasteTypes: string[]
	toggleHeavyWasteType: (id: string) => void
	onContinue: () => void
}

/**
 * TypesTab component - Displays selectable heavy waste type options
 *
 * @param {WasteOption[]} heavyWasteOptions - Array of heavy waste options to display
 * @param {string[]} heavyWasteTypes - Array of currently selected heavy waste type IDs
 * @param {Function} toggleHeavyWasteType - Function to toggle selection of a waste type
 * @param {Function} onContinue - Function to call when continue button is clicked
 */
const TypesTab: React.FC<TypesTabProps> = ({
																						 heavyWasteOptions,
																						 heavyWasteTypes,
																						 toggleHeavyWasteType,
																						 onContinue
																					 }) => {
	const isMobile = useMediaQuery("(max-width: 640px)")

	return (
		<motion.div
			key="types"
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			transition={{ duration: 0.2 }}
		>
			<h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">Select heavy waste types:</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{heavyWasteOptions.map((option) => (
					<motion.button
						key={option.id}
						whileHover={{ scale: isMobile ? 1 : 1.02 }}
						whileTap={{ scale: 0.98 }}
						className={`relative p-3 sm:p-4 rounded-lg text-left transition-colors flex items-start ${
							heavyWasteTypes.includes(option.id)
								? "bg-blue-900/50 border border-blue-500"
								: "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
						}`}
						onClick={() => toggleHeavyWasteType(option.id)}
						aria-pressed={heavyWasteTypes.includes(option.id)}
					>
						<div
							className={`mr-2 sm:mr-3 flex-shrink-0 ${heavyWasteTypes.includes(option.id) ? "text-blue-400" : "text-gray-400"}`}
						>
							{option.icon}
						</div>
						<div className="flex-1 min-w-0">
							<div className="font-medium text-sm sm:text-base">{option.label}</div>
							<div className="text-xs text-gray-400 mt-0.5 sm:mt-1 line-clamp-2">{option.description}</div>
						</div>
						{heavyWasteTypes.includes(option.id) && (
							<div className="absolute top-2 right-2">
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

			<div className="mt-5 sm:mt-6 flex justify-end">
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

export default TypesTab
