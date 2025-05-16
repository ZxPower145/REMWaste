import React from "react"
import { motion } from "framer-motion"
import { MdOutlineWarningAmber } from "react-icons/md"

interface WarningBannerProps {
	message: string
}

/**
 * WarningBanner component - Displays a warning message with an amber background
 *
 * @param {string} message - The warning message to display
 */
const WarningBanner: React.FC<WarningBannerProps> = ({ message }) => {
	return (
		<motion.div
			className="bg-amber-900/40 border-y border-amber-800/50 px-4 sm:px-6 py-2 sm:py-3 flex-shrink-0"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex items-center">
				<MdOutlineWarningAmber className="text-amber-500 h-5 w-5 mr-2 flex-shrink-0" />
				<p className="text-xs sm:text-sm text-amber-200">{message}</p>
			</div>
		</motion.div>
	)
}

export default WarningBanner
