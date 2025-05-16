"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaHome, FaTree, FaBuilding, FaInfoCircle } from "react-icons/fa"
import { useWasteSelection } from "../providers/WasteSelectorProvider"
import type { WasteType } from "../types/Waste"
import WasteCard from "../components/WasteCard"
import { useMediaQuery } from "../hooks/useMediaQuery"

/**
 * WasteTypeSelection component - Main page for selecting waste types
 *
 * This component displays:
 * - A heading and description
 * - An informational banner
 * - A grid of selectable waste type cards
 *
 * It uses animations for a more engaging user experience and
 * is fully responsive for both mobile and desktop views.
 */
const WasteTypeSelection: React.FC = () => {
	const { selectedWasteTypes, toggleWasteType } = useWasteSelection()
	const isMobile = useMediaQuery("(max-width: 640px)")

	// Available waste types with their details
	const wasteTypes: WasteType[] = [
		{
			id: "household-waste",
			name: "Household Waste",
			description: "General household items and furniture",
			icon: <FaHome className="w-5 h-5 md:w-6 md:h-6" />,
			enabled: true,
			examples: ["Furniture", "Appliances", "Garden waste", "General household items"],
		},
		{
			id: "construction-waste",
			name: "Construction Waste",
			description: "Building materials and renovation debris",
			icon: <FaBuilding className="w-5 h-5 md:w-6 md:h-6" />,
			enabled: false,
			examples: ["Bricks", "Timber", "Concrete", "Plasterboard"],
		},
		{
			id: "garden-waste",
			name: "Garden Waste",
			description: "Green waste and landscaping materials",
			icon: <FaTree className="w-5 h-5 md:w-6 md:h-6" />,
			enabled: true,
			examples: ["Soil", "Branches", "Plants", "Grass cuttings"],
		},
		{
			id: "commercial-waste",
			name: "Commercial Waste",
			description: "Business and office clearance",
			icon: <FaBuilding className="w-5 h-5 md:w-6 md:h-6" />,
			enabled: true,
			examples: ["Office furniture", "Shop fittings", "Equipment", "Commercial debris"],
		},
	]

	// Animation variants
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	}

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	}

	return (
		<motion.div
			className="flex flex-col w-full max-w-4xl mx-auto px-3 sm:px-4"
			initial="hidden"
			animate="show"
			variants={container}
		>
			<motion.h1
				className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
				variants={item}
			>
				Which type of waste best describes what you are disposing of?
			</motion.h1>

			<motion.p className="text-center text-gray-400 text-sm md:text-base mb-4 md:mb-8" variants={item}>
				Select the waste type that most closely matches your disposal needs
			</motion.p>

			<motion.div
				className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-3 md:p-5 mb-4 md:mb-8 w-full"
				variants={item}
				whileHover={{ scale: isMobile ? 1 : 1.01 }}
				transition={{ type: "spring", stiffness: 400, damping: 17 }}
			>
				<div className="flex items-start">
					<div className="bg-blue-900/50 p-1.5 md:p-2 rounded-lg mr-3 md:mr-4 flex-shrink-0">
						<FaInfoCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
					</div>
					<div>
						<h3 className="font-medium text-blue-300 text-sm md:text-base mb-1">
							Multiple waste types can be selected
						</h3>
						<p className="text-gray-400 text-xs md:text-sm">Some items may require special handling:</p>
						<ul className="list-disc ml-4 md:ml-6 mt-1 md:mt-2 space-y-0.5 md:space-y-1">
							<li className="text-gray-400 text-xs md:text-sm">Plasterboard and drywall materials</li>
							<li className="text-gray-400 text-xs md:text-sm">Heavy construction materials (soil, concrete, etc.)</li>
						</ul>
					</div>
				</div>
			</motion.div>

			<motion.div className="mx-auto w-full" variants={item}>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
					{wasteTypes.map((wasteType) => (
						<motion.div key={wasteType.id} variants={item}>
							<WasteCard
								wasteType={wasteType}
								selectedWasteTypes={selectedWasteTypes}
								toggleWasteType={toggleWasteType}
							/>
						</motion.div>
					))}
				</div>
			</motion.div>
		</motion.div>
	)
}

export default WasteTypeSelection
