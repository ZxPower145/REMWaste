"use client"

import React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Skip } from "./types/Waste"
import { useWasteSelection } from "./providers/WasteSelectorProvider"
import WasteTypeSelection from "./pages/WasteTypeSelection"
import WasteModal from "./components/waste/WasteModal"
import {
  FaMapMarkerAlt,
  FaTrash,
  FaTruck,
  FaClipboardCheck,
  FaCalendarAlt,
  FaCreditCard,
  FaTimes,
  FaBars,
} from "react-icons/fa"
import { useMediaQuery } from "./hooks/useMediaQuery"
import SkipSelectPage from "./pages/SkipSelectPage"

/**
 * App component - Main application component
 *
 * This component serves as the application shell and provides:
 * - Header with navigation steps
 * - Main content area that displays the current step
 * - Footer with selected waste types and navigation buttons
 * - Responsive layout for both mobile and desktop
 *
 * The app follows a multi-step process for waste collection booking:
 * 1. Postcode selection (completed before this screen)
 * 2. Waste type selection (current step)
 * 3. Skip selection
 * 4. Permit check
 * 5. Date selection
 * 6. Payment
 */
const App: React.FC = () => {
  const { step, setStep, setSkips, selectedWasteTypes, removeWasteType } = useWasteSelection()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [footerHeight, setFooterHeight] = useState(76)
  const footerRef = React.useRef<HTMLDivElement>(null)

  // Map of waste type IDs to their display names for the UI
  const wasteTypeNames: Record<string, string> = {
    "garden-waste": "Garden Waste",
    "household-waste": "Household Waste",
    "construction-waste": "Construction Waste",
    "commercial-waste": "Commercial Waste",
  }

  useEffect(() => {
    // Measure footer height for proper padding
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight
        setFooterHeight(height)
      }
    }

    // Initial measurement
    updateFooterHeight()

    // Set up resize observer to update on footer size changes
    const resizeObserver = new ResizeObserver(updateFooterHeight)
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current)
    }

    // Fetch skips data from API
    const fetchSkips = async () => {
      try {
        // In a real App you would take the data from the user, in this scenario I will hard-code it.
        const postcode = "NR32"
        const area = "Lowestoft"
        fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`)
          .then((r) => r.json())
          .then((data: Skip[]) => setSkips(data))
      } catch (error) {
        console.error("Error fetching skips data:", error)
      }
    }

    fetchSkips()

    // Add scroll listener for header styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // Clean up event listeners and observers
    return () => {
      window.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [setSkips])

  // Handle continue button click
  const handleContinue = () => {
    setStep("heavy-waste-modal")
  }

  // Navigation steps configuration
  const navSteps = [
    { id: "postcode", label: "Postcode", icon: <FaMapMarkerAlt />, status: "completed" },
    { id: "waste-type", label: "Waste Type", icon: <FaTrash />, status: "completed" },
    { id: "skip", label: "Select Skip", icon: <FaTruck />, status: "current" },
    { id: "permit", label: "Permit Check", icon: <FaClipboardCheck />, status: "upcoming" },
    { id: "date", label: "Choose Date", icon: <FaCalendarAlt />, status: "upcoming" },
    { id: "payment", label: "Payment", icon: <FaCreditCard />, status: "upcoming" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div className="text-lg md:text-xl font-bold text-white">WeWantWaste</div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex">
                <ul className="flex space-x-1">
                  {navSteps.map((navStep) => (
                    <li key={navStep.id}>
                      <div
                        className={`flex items-center px-3 py-2 rounded-md text-sm ${
                          navStep.status === "completed"
                            ? "text-blue-400"
                            : navStep.status === "current"
                              ? "text-white bg-blue-900/30 border border-blue-800/50"
                              : "text-gray-500"
                        }`}
                      >
                        <span className="mr-1.5">{navStep.icon}</span>
                        {navStep.label}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Navigation Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                  className="p-2 rounded-md bg-gray-800/70 text-gray-300"
                  aria-label="Toggle navigation menu"
                >
                  <FaBars size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-gray-800/90 backdrop-blur-md rounded-lg mb-3 overflow-hidden"
              >
                <ul className="p-2 space-y-1">
                  {navSteps.map((navStep) => (
                    <li key={navStep.id}>
                      <div
                        className={`flex items-center px-3 py-2.5 rounded-md text-sm ${
                          navStep.status === "completed"
                            ? "text-blue-400"
                            : navStep.status === "current"
                              ? "text-white bg-blue-900/30 border border-blue-800/50"
                              : "text-gray-500"
                        }`}
                      >
                        <span className="mr-2">{navStep.icon}</span>
                        {navStep.label}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main content - modified to have proper overflow handling */}
      <main
        className="flex-grow container mx-auto py-6 px-4 overflow-y-auto"
        style={{ paddingBottom: isMobile ? `${footerHeight + 16}px` : "0" }}
      >
        <AnimatePresence mode="wait">
          {step === "waste-type" && <WasteTypeSelection key="waste-selection" />}
          {step === "heavy-waste-modal" && <WasteModal key="waste-modal" />}
          {step === "skip-selection" && <SkipSelectPage key="skip-select-page" />}
        </AnimatePresence>
      </main>

      {/* Footer navigation - fixed on mobile */}
      <footer
        ref={footerRef}
        className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-800 shadow-lg fixed md:relative bottom-0 left-0 right-0 z-30"
      >
        <div className="container mx-auto px-2 py-3 md:py-2">
          <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-4">
            {/* Selected waste types - horizontal layout */}
            <div className="rounded-lg p-2 md:p-0 w-full">
              <div className="text-xs md:text-sm font-medium text-gray-300 mb-1">Selected Waste Types</div>
              <div className="min-h-[32px] md:min-h-[36px] overflow-x-auto scrollbar-custom">
                {selectedWasteTypes.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout">
                      {selectedWasteTypes.map((wasteTypeId) => (
                        <motion.div
                          key={wasteTypeId}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="bg-blue-900/50 border border-blue-800 text-blue-300 px-2 py-0.5 md:py-1 rounded-md text-xs md:text-sm flex items-center"
                        >
                          <span className="mr-1.5 truncate">{wasteTypeNames[wasteTypeId] || wasteTypeId}</span>
                          <button
                            onClick={() => removeWasteType(wasteTypeId)}
                            className="ml-1 text-blue-400 hover:text-blue-300 p-0.5 rounded-full hover:bg-blue-800/30"
                            aria-label={`Remove ${wasteTypeNames[wasteTypeId] || wasteTypeId}`}
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 text-xs md:text-sm py-1"
                  >
                    None selected
                  </motion.div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between space-x-4">
              <motion.button
                whileHover={{ scale: isMobile ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-3 md:px-5 py-2 md:py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 text-sm"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: isMobile ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 md:px-5 py-2 md:py-2.5 rounded-lg transition-colors flex items-center text-sm ${
                  selectedWasteTypes.length > 0
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/20"
                    : "bg-blue-900/30 text-blue-300/50 cursor-not-allowed"
                }`}
                onClick={handleContinue}
                disabled={selectedWasteTypes.length === 0}
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
