import { Suspense, createContext, useCallback, useContext, useMemo, useState, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'

/**
 * Any surface that lists a service can start a booking without threading
 * callbacks through the tree — a service row, a category card, a future
 * "book again" link in a receipt.
 *
 * The modal itself is lazy: the booking flow pulls in the EmailJS SDK and its
 * own form, and a visitor reading the home page should not download either
 * until they actually reach for a service.
 */
const BookingModal = lazy(() => import('../components/booking/BookingModal'))

/**
 * Subscription plan sign-up modal — also lazy. Collects name, mobile and city
 * only; the team calls back to confirm coverage and schedule the first wash.
 */
const PlanModal = lazy(() => import('../components/booking/PlanModal'))

const BookingContext = createContext(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}

export default function BookingProvider({ children }) {
  const [selection, setSelection] = useState(null)
  const [planSelection, setPlanSelection] = useState(null)

  const openBooking = useCallback((item, cat) => setSelection({ item, cat }), [])
  const closeBooking = useCallback(() => setSelection(null), [])

  const openPlan = useCallback((plan, cat) => setPlanSelection({ plan, cat }), [])
  const closePlan = useCallback(() => setPlanSelection(null), [])

  const value = useMemo(
    () => ({ openBooking, closeBooking, selection, openPlan, closePlan, planSelection }),
    [openBooking, closeBooking, selection, openPlan, closePlan, planSelection]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      {/* Suspense sits outside AnimatePresence: a boundary between the two
          hides the child while it resolves, and AnimatePresence then reads
          that as an unmount and skips the close animation entirely. */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {selection && (
            <BookingModal
              key="booking"
              item={selection.item}
              cat={selection.cat}
              onClose={closeBooking}
            />
          )}
          {planSelection && (
            <PlanModal
              key="plan"
              plan={planSelection.plan}
              cat={planSelection.cat}
              onClose={closePlan}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </BookingContext.Provider>
  )
}
