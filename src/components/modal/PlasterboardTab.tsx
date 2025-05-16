import React, { useState } from "react"
import { motion } from "framer-motion"
import { FaArrowLeft, FaArrowRight, FaRecycle } from "react-icons/fa"
import { MdOutlineWarningAmber } from "react-icons/md"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import CustomSlider from "../CustomSlider"

interface PlasterboardOption {
	id: string
	label: string
	value: number
	selfDisposal?: boolean
}

interface PlasterboardTabProps {
	plasterboardOptions: PlasterboardOption[]
	plasterboardPercentage: string
	setPlasterboardPercentage: (id: string) => void
	onBack: () => void
	onContinue: () => void
}

/**
 * PlasterboardTab component - Handles plasterboard disposal options and percentage selection
 *
 * @param {PlasterboardOption[]} plasterboardOptions - Array of plasterboard options to display
 * @param {string} plasterboardPercentage - Currently selected plasterboard option ID
 * @param {Function} setPlasterboardPercentage - Function to set the selected plasterboard option
 * @param {Function} onBack - Function to call when back button is clicked
 * @param {Function} onContinue - Function to call when continue button is clicked
 */
const PlasterboardTab: React.FC<PlasterboardTabProps> = ({
																													 plasterboardOptions,
																													 plasterboardPercentage,
																													 setPlasterboardPercentage,
																													 onBack,
																													 onContinue
																												 }) => {
	const isMobile = useMediaQuery("(max-width: 640px)")
	const [sliderValue, setSliderValue] = useState(() => {
		// Initialize slider value based on the selected option
		const selectedOption = plasterboardOptions.find(option => option.id === plasterboardPercentage)
		return selectedOption ? selectedOption.value : 0
	})

	const handlePlasterboardOptionClick = (option: PlasterboardOption) => {
		setPlasterboardPercentage(option.id)
		setSliderValue(option.value)
	}

	const handleSliderChange = (value: number) => {
		setSliderValue(value)

		// Update the selected option based on slider value
		if (value === 0) {
			setPlasterboardPercentage("no-plasterboard")
		} else if (value <= 20) {
			setPlasterboardPercentage("up-to-20")
		} else if (value <= 40) {
			setPlasterboardPercentage("up-to-40")
		} else if (value <= 60) {
			setPlasterboardPercentage("up-to-60")
		} else if (value <= 80) {
			setPlasterboardPercentage("up-to-80")
		} else {
			setPlasterboardPercentage("up-to-100")
		}
	}

	return (
		<motion.div
			key="plasterboard"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.2 }}
		>
			<h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-white">Plasterboard Disposal</h3>

			{/* Important notice box */}
			<motion.div
				className="mb-4 sm:mb-6 rounded-xl bg-gradient-to-r from-amber-900/40 to-amber-800/40 border border-amber-700/50 p-3 sm:p-4"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<div className="flex">
					<div className="flex-shrink-0 rounded-xl bg-amber-800/50 p-1.5 mr-2 sm:mr-3 self-start">
						<MdOutlineWarningAmber className="text-amber-500 h-4 w-4 sm:h-5 sm:w-5" />
					</div>
					<div>
						<div className="flex-shrink-0">
							<h4 className="text-amber-300 font-medium text-xs sm:text-sm">Important Notice</h4>
						</div>
						<p className="text-xs sm:text-sm text-amber-100/90 mt-1">
							Plasterboard must be disposed of separately from general waste due to environmental regulations.
							Please indicate the approximate percentage of plasterboard in your waste.
						</p>
					</div>
				</div>
			</motion.div>

			{/* Plasterboard percentage options */}
			<div className="grid grid-cols-2 gap-2 mb-4 sm:mb-6 sm:grid-cols-3">
				{plasterboardOptions.map((option) => (
					<motion.button
						key={option.id}
						whileHover={{ scale: isMobile ? 1 : 1.03 }}
						whileTap={{ scale: 0.97 }}
						className={`p-2 sm:p-3 rounded-lg text-center transition-colors ${
							plasterboardPercentage === option.id
								? option.selfDisposal
									? "bg-green-900/50 border border-green-700"
									: "bg-blue-900/50 border border-blue-500"
								: "bg-gray-800/70 border border-gray-700 hover:border-gray-600"
						}`}
						onClick={() => handlePlasterboardOptionClick(option)}
						aria-pressed={plasterboardPercentage === option.id}
					>
						<div className="font-medium text-xs sm:text-sm">{option.label}</div>
					</motion.button>
				))}
			</div>

			{/* Slider */}
			<div className="mb-4 sm:mb-6">
				<CustomSlider
					min={0}
					max={100}
					step={20}
					value={sliderValue}
					onChange={handleSliderChange}
					disabled={plasterboardPercentage === "self-disposal"}
					labels={["0%", "20%", "40%", "60%", "80%", "100%"]}
					className="mb-4"
				/>

				<div className="mt-2 text-center">
					<div className="text-xs sm:text-sm text-gray-400">
						{plasterboardPercentage === "no-plasterboard" && "No plasterboard in your waste"}
						{plasterboardPercentage === "up-to-20" && "Up to 20% plasterboard in your waste"}
						{plasterboardPercentage === "up-to-40" && "Up to 40% plasterboard in your waste"}
						{plasterboardPercentage === "up-to-60" && "Up to 60% plasterboard in your waste"}
						{plasterboardPercentage === "up-to-80" && "Up to 80% plasterboard in your waste"}
						{plasterboardPercentage === "up-to-100" && "Up to 100% plasterboard in your waste"}
						{plasterboardPercentage === "self-disposal" && "You will dispose of plasterboard separately"}
					</div>
				</div>
			</div>

			{/* Self-disposal info */}
			{plasterboardPercentage === "self-disposal" && (
				<motion.div
					className="mb-4 sm:mb-6 bg-green-900/30 border border-green-800/50 rounded-lg p-3 sm:p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex">
						<div className="flex-shrink-0 bg-green-800/50 p-1.5 rounded-xl mr-2 sm:mr-3 self-start">
							<FaRecycle className="text-green-400 h-3 w-3 sm:h-4 sm:w-4" />
						</div>
						<div>
							<h4 className="text-green-300 font-medium text-xs sm:text-sm">Self-Disposal Information</h4>
							<p className="text-xs sm:text-sm text-green-100/80 mt-1">
								You've chosen to dispose of plasterboard yourself. Please ensure you follow local regulations
								for proper disposal at designated recycling centers.
							</p>
						</div>
					</div>
				</motion.div>
			)}

			{/* Navigation buttons */}
			<div className="mt-4 sm:mt-6 flex justify-between">
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

export default PlasterboardTab
