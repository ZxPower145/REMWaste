"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { WasteType } from "../types/Waste"

interface WasteCardProps {
	wasteType: WasteType
	selectedWasteTypes: string[]
	toggleWasteType: (wasteType: string) => void
}

/**
 * WasteCard component - Displays a selectable card for a waste type
 *
 * This component renders a card with waste type information, including:
 * - Name and description
 * - Icon representation
 * - Selection state (selected/unselected)
 * - Enabled/disabled state
 * - Examples of waste items in this category
 *
 * @param {WasteType} wasteType - The waste type data to display
 * @param {string[]} selectedWasteTypes - Array of currently selected waste type IDs
 * @param {Function} toggleWasteType - Function to toggle selection of a waste type
 */
const WasteCard: React.FC<WasteCardProps> = ({ wasteType, selectedWasteTypes, toggleWasteType }: WasteCardProps) => {
	const isSelected = selectedWasteTypes.includes(wasteType.id)
	const isEnabled = wasteType.enabled

	return (
		<motion.div
			key={wasteType.id}
			data-waste-type={wasteType.id}
			className={`relative overflow-hidden rounded-xl border transition-all duration-200 ${
				isEnabled
					? isSelected
						? "border-blue-500 bg-gradient-to-br from-blue-900/80 to-blue-950"
						: "border-gray-700 bg-gray-900/80 hover:border-blue-500/70 hover:shadow-lg hover:shadow-blue-900/20"
					: "border-gray-800 bg-gray-900/50 opacity-60 cursor-not-allowed"
			}`}
			onClick={() => isEnabled && toggleWasteType(wasteType.id)}
			whileHover={isEnabled ? { scale: 1.02, y: -4 } : {}}
			whileTap={isEnabled ? { scale: 0.98 } : {}}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
			layout
			role="button"
			aria-pressed={isSelected}
			aria-disabled={!isEnabled}
			tabIndex={isEnabled ? 0 : -1}
		>
			{/* Selected indicator */}
			{isSelected && (
				<motion.div
					className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 overflow-hidden"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.2 }}
					aria-hidden="true"
				>
					<div className="absolute top-0 right-0 bg-blue-500 w-24 md:w-32 h-5 md:h-6 rotate-45 translate-y-2 translate-x-1"></div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="absolute top-1.5 right-1.5 md:top-2 md:right-2 h-3 w-3 md:h-4 md:w-4 text-white"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</motion.div>
			)}

			{/* Card content */}
			<div className="p-4 md:p-6">
				<div className="flex items-start">
					<div
						className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4 ${
							isSelected ? "bg-blue-600 text-white" : "bg-gray-800 text-blue-400"
						}`}
						aria-hidden="true"
					>
						{wasteType.icon}
					</div>
					<div>
						<h3 className={`text-base md:text-lg font-bold ${isSelected ? "text-white" : "text-gray-200"}`}>
							{wasteType.name}
						</h3>
						<p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1">{wasteType.description}</p>
					</div>
				</div>

				<div className="mt-3 md:mt-5 pt-3 md:pt-5 border-t border-gray-800">
					<p
						className={`text-xs md:text-sm font-medium mb-1 md:mb-2 ${isSelected ? "text-blue-300" : "text-gray-400"}`}
					>
						Examples:
					</p>
					<div className="grid grid-cols-2 gap-x-2 gap-y-0.5 md:gap-y-1">
						{wasteType.examples.map((example, index) => (
							<div key={index} className="text-xs md:text-sm text-gray-400 flex items-center">
								<span className={`mr-1 text-xs ${isSelected ? "text-blue-400" : "text-gray-500"}`}>•</span>
								{example}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Disabled overlay */}
			{!isEnabled && (
				<div
					className="absolute inset-0 bg-gray-900/50 flex items-center justify-center"
					aria-hidden="true"
				>
					<div className="bg-gray-800 text-gray-400 px-2 md:px-3 py-1 md:py-1.5 rounded-md text-xs md:text-sm">
						Currently Unavailable
					</div>
				</div>
			)}
		</motion.div>
	)
}

export default WasteCard
