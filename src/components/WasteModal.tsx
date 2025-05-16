"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWasteSelection } from "../providers/WasteSelectorProvider"
import { GiStoneBlock, GiBrickWall, GiStonePile } from "react-icons/gi"
import { MdLandscape } from "react-icons/md"
import { useMediaQuery } from "../hooks/useMediaQuery"

// Import modular components
import ModalHeader from "./modal/ModalHeader"
import WarningBanner from "./modal/WarningBanner"
import TabNavigation from "./modal/TabNavigation"
import TypesTab from "./modal/TypesTab"
import PercentageTab from "./modal/PercentageTab"
import PlasterboardTab from "./modal/PlasterboardTab"

/**
 * WasteModal component - A comprehensive modal for collecting detailed waste information
 *
 * This modal allows users to:
 * 1. Select specific heavy waste types
 * 2. Specify the percentage of heavy waste
 * 3. Indicate plasterboard disposal preferences
 *
 * The component uses a tabbed interface for better organization and user experience.
 */
const WasteModal: React.FC = () => {
	const {
		heavyWasteTypes,
		toggleHeavyWasteType,
		heavyWastePercentage,
		setHeavyWastePercentage,
		setStep,
		selectedWasteTypes,
	} = useWasteSelection()

	const [activeTab, setActiveTab] = useState<"types" | "percentage" | "plasterboard">("types")
	const [plasterboardPercentage, setPlasterboardPercentage] = useState<string>("no-plasterboard")
	const isMobile = useMediaQuery("(max-width: 640px)")

	// Lock body scroll when modal is open to prevent background scrolling
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	// Define waste options for each tab
	const heavyWasteOptions = [
		{ id: "soil", label: "Soil", icon: <MdLandscape className="h-5 w-5 sm:h-6 sm:w-6" />, description: "Garden soil, topsoil, subsoil" },
		{
			id: "concrete",
			label: "Concrete",
			icon: <GiStoneBlock className="h-5 w-5 sm:h-6 sm:w-6" />,
			description: "Broken concrete, cement blocks",
		},
		{
			id: "bricks",
			label: "Bricks",
			icon: <GiBrickWall className="h-5 w-5 sm:h-6 sm:w-6" />,
			description: "Whole or broken bricks",
		},
		{
			id: "rubble",
			label: "Rubble",
			icon: <GiStonePile className="h-5 w-5 sm:h-6 sm:w-6" />,
			description: "Mixed construction debris",
		},
	]

	const percentageOptions = [
		{ id: "no-heavy-waste", label: "No heavy waste", value: "0%" },
		{ id: "up-to-5", label: "Up to 5%", value: "5%" },
		{ id: "5-20", label: "5-20%", value: "20%" },
		{ id: "over-20", label: "Over 20%", value: "30%+" },
	]

	const plasterboardOptions = [
		{ id: "no-plasterboard", label: "No plasterboard", value: 0 },
		{ id: "up-to-20", label: "Up to 20%", value: 20 },
		{ id: "up-to-40", label: "Up to 40%", value: 40 },
		{ id: "up-to-60", label: "Up to 60%", value: 60 },
		{ id: "up-to-80", label: "Up to 80%", value: 80 },
		{ id: "up-to-100", label: "Up to 100%", value: 100 },
		{ id: "self-disposal", label: "I will dispose of it myself", value: 0, selfDisposal: true },
	]

	// Navigation handlers
	const handleBack = () => {
		setStep("waste-type")
	}

	const handleContinue = () => {
		// In a real application, this would navigate to the skip selection page
		alert("Continue to skip selection")
	}

	// Get the position of the selected card for animation
	const selectedCardId = selectedWasteTypes[0]
	const selectedCardElement = document.querySelector(`[data-waste-type="${selectedCardId}"]`)
	const cardRect = selectedCardElement?.getBoundingClientRect() || {
		top: window.innerHeight / 2,
		left: window.innerWidth / 2,
		width: 300,
		height: 200,
	}

	return (
		<AnimatePresence>
			{/* Backdrop overlay */}
			<motion.div
				key="backdrop"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
				onClick={handleBack}
				aria-label="Close modal"
			/>

			{/* Modal */}
			<motion.div
				key="modal"
				className="fixed z-50 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800 max-h-[90vh] flex flex-col"
				initial={{
					top: cardRect.top,
					left: cardRect.left,
					width: cardRect.width,
					height: cardRect.height,
					opacity: 0.5,
					scale: 0.9,
				}}
				animate={{
					top: "50%",
					left: "50%",
					width: isMobile ? "95vw" : "min(90vw, 550px)",
					height: "auto",
					x: "-50%",
					y: "-50%",
					opacity: 1,
					scale: 1,
				}}
				exit={{
					top: cardRect.top,
					left: cardRect.left,
					width: cardRect.width,
					height: cardRect.height,
					x: 0,
					y: 0,
					opacity: 0,
					scale: 0.9,
				}}
				transition={{
					type: "spring",
					damping: 25,
					stiffness: 300,
				}}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
			>
				{/* Header with gradient background */}
				<ModalHeader
					title="Heavy Waste Details"
					subtitle="Additional information needed"
					onClose={handleBack}
				/>

				{/* Warning banner */}
				<WarningBanner message="Heavy waste has specific requirements and may limit available skip sizes" />

				{/* Tab navigation */}
				<TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

				{/* Content area */}
				<div className="p-4 sm:p-6 overflow-y-auto scrollbar-custom">
					<AnimatePresence mode="wait">
						{activeTab === "types" ? (
							<TypesTab
								heavyWasteOptions={heavyWasteOptions}
								heavyWasteTypes={heavyWasteTypes}
								toggleHeavyWasteType={toggleHeavyWasteType}
								onContinue={() => setActiveTab("percentage")}
							/>
						) : activeTab === "percentage" ? (
							<PercentageTab
								percentageOptions={percentageOptions}
								heavyWastePercentage={heavyWastePercentage}
								setHeavyWastePercentage={setHeavyWastePercentage}
								onBack={() => setActiveTab("types")}
								onContinue={() => setActiveTab("plasterboard")}
							/>
						) : (
							<PlasterboardTab
								plasterboardOptions={plasterboardOptions}
								plasterboardPercentage={plasterboardPercentage}
								setPlasterboardPercentage={setPlasterboardPercentage}
								onBack={() => setActiveTab("percentage")}
								onContinue={handleContinue}
							/>
						)}
					</AnimatePresence>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default WasteModal
