/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import { cancelTicket } from "../../store/reservation-slice";

export const CancelModal = ({ seat, onClose }) => {
  const dispatch = useDispatch();

  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    if (seat) {
      setSelectedSeat(seat);
    } else {
      const close = setTimeout(() => {
        setSelectedSeat(null);
      }, 200);

      return clearTimeout(close);
    }
  }, [seat]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(cancelTicket(selectedSeat, onClose));
  }

  return (
    <ReactModal
      isOpen={seat !== null}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      ariaHideApp={false}
      portalClassName="ReactModalPortal relative z-40 overflow-hidden text-slate-950"
      overlayClassName="fixed inset-0 bg-slate-950/40"
      className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-auto rounded bg-white px-5 pb-5 pt-4 outline-none"
    >
      <h3 className="mb-2 flex items-center text-2xl font-semibold">
        <span className="mr-2.5 inline-block rounded bg-red-600 px-2 py-[0.3125rem] text-xl leading-none text-white">
          {seat || selectedSeat}
        </span>
        <span>Cancel Reservation</span>
      </h3>

      <form onSubmit={handleSubmit}>
        <p className="mb-6 text-base">
          Are you sure you want to cancel the reservation?
        </p>

        <div className="flex justify-end gap-x-2">
          <Button onClick={onClose}>No</Button>
          <Button type="submit" isPrimary={true}>
            Yes
          </Button>
        </div>
      </form>
    </ReactModal>
  );
};
