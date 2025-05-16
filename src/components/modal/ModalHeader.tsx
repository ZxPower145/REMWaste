import React from "react"
import { motion } from "framer-motion"

interface ModalHeaderProps {
	title: string
	subtitle?: string
	onClose: () => void
}

/**
 * ModalHeader component - Displays the header section of a modal with a gradient background
 *
 * @param {string} title - The main title text to display
 * @param {string} subtitle - Optional subtitle text to display below the title
 * @param {Function} onClose - Function to call when the close button is clicked
 */
const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, onClose }) => {
	return (
		<motion.div
			className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 sm:p-6 flex-shrink-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.1 }}
		>
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
					{subtitle && <p className="text-blue-200 mt-1 text-xs sm:text-sm">{subtitle}</p>}
				</div>
				<button
					onClick={onClose}
					className="text-blue-200 hover:text-white bg-blue-800/50 hover:bg-blue-800 p-2 rounded-full transition-colors"
					aria-label="Close modal"
				>
					<span className="sr-only">Close</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</motion.div>
	)
}

export default ModalHeader
