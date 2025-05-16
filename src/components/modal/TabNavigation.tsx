import React from "react"
import { motion } from "framer-motion"
import { BiSolidTruck } from "react-icons/bi"
import { FaPercentage } from "react-icons/fa"
import { TbWall } from "react-icons/tb"

type TabType = "types" | "percentage" | "plasterboard"

interface TabNavigationProps {
	activeTab: TabType
	onTabChange: (tab: TabType) => void
}

/**
 * TabNavigation component - Provides a tabbed interface for navigating between different sections
 *
 * @param {TabType} activeTab - The currently active tab
 * @param {Function} onTabChange - Function to call when a tab is clicked
 */
const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
	return (
		<motion.div
			className="flex border-b border-gray-800 flex-shrink-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.3 }}
		>
			<button
				className={`flex-1 py-3 sm:py-4 px-2 sm:px-3 text-center relative ${
					activeTab === "types" ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
				}`}
				onClick={() => onTabChange("types")}
				aria-selected={activeTab === "types"}
				role="tab"
			>
        <span className="flex items-center justify-center text-xs sm:text-sm">
          <BiSolidTruck className="mr-1" />
          Waste Types
        </span>
				{activeTab === "types" && (
					<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" layoutId="activeTab" />
				)}
			</button>
			<button
				className={`flex-1 py-3 sm:py-4 px-2 sm:px-3 text-center relative ${
					activeTab === "percentage" ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
				}`}
				onClick={() => onTabChange("percentage")}
				aria-selected={activeTab === "percentage"}
				role="tab"
			>
        <span className="flex items-center justify-center text-xs sm:text-sm">
          <FaPercentage className="mr-1" />
          Percentage
        </span>
				{activeTab === "percentage" && (
					<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" layoutId="activeTab" />
				)}
			</button>
			<button
				className={`flex-1 py-3 sm:py-4 px-2 sm:px-3 text-center relative ${
					activeTab === "plasterboard" ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
				}`}
				onClick={() => onTabChange("plasterboard")}
				aria-selected={activeTab === "plasterboard"}
				role="tab"
			>
        <span className="flex items-center justify-center text-xs sm:text-sm">
          <TbWall className="mr-1" />
          Plasterboard
        </span>
				{activeTab === "plasterboard" && (
					<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" layoutId="activeTab" />
				)}
			</button>
		</motion.div>
	)
}

export default TabNavigation
