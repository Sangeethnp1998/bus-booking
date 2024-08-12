import { useMemo, useState } from "react";
import getSeats from "./get-seats";
import { SeatButton } from "./SeatButton";
import SteeringIcon from "./steering-icon";
import { useSelector } from "react-redux";
import { ReservationModal } from "../../components/ReservationModal/Reservation-modal";
import { useTitle } from "../../hooks/use-title/useTitle";

const { lowerDeckSeats, upperDeckSeats } = getSeats();

export function Reservation() {
  useTitle("Reservation - Bus Ticket Booking");

  const reservations = useSelector((state) => {
    return state.reservation.reservations;
  });

  const reservedSeatsMap = useMemo(() => {
    const map = {};
    for (const reservation of reservations) {
      map[reservation.seat] = true;
    }
    return map;
  }, [reservations]);

  const [selectedSeat, setSelectedSeat] = useState(null);

  return (
    <div className="flex w-full flex-col items-center justify-center pb-16 pt-6">
      <ReservationModal
        seat={selectedSeat}
        onClose={() => setSelectedSeat(null)}
      />

      <h2 className="mb-0.5 ml-8 self-start text-xs font-semibold uppercase">
        Lower Deck
      </h2>

      <div className="mb-6 flex aspect-[3] w-[calc(100%-4rem)] rounded border border-slate-200 bg-white p-6">
        <div className="mr-6 flex h-full w-[calc(11%-0.5rem)] items-start justify-end border-r border-slate-400">
          <SteeringIcon className="mr-4 aspect-square w-[71%] -rotate-90 fill-slate-800" />
        </div>

        <div className="mr-4 grid flex-shrink-0 flex-grow grid-cols-6 grid-rows-4 gap-4">
          {lowerDeckSeats.map((seat, i) =>
            seat ? (
              <SeatButton
                key={seat}
                seat={seat}
                onClick={() => setSelectedSeat(seat)}
                isBooked={reservedSeatsMap[seat]}
              />
            ) : (
              <div key={i} />
            ),
          )}
        </div>
      </div>

      <h2 className="mb-0.5 ml-8 self-start text-xs font-semibold uppercase">
        Upper Deck
      </h2>
      <div className="flex aspect-[3] w-[calc(100%-4rem)] rounded border border-slate-200 bg-white p-6">
        <div className="mr-6 flex h-full w-[calc(11%-0.5rem)]"></div>

        <div className="mr-4 grid flex-shrink-0 flex-grow grid-cols-6 grid-rows-4 gap-4">
          {upperDeckSeats.map((seat, i) =>
            seat ? (
              <SeatButton
                key={seat}
                seat={seat}
                onClick={() => setSelectedSeat(seat)}
                isBooked={reservedSeatsMap[seat]}
              />
            ) : (
              <div key={i} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
