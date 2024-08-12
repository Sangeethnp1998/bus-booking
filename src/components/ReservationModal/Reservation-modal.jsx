/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Button } from "../Button/Button";
import TextInput from "../Text-input/Textinput";
import { useDispatch, useSelector } from "react-redux";
import {
  reserveTikcket,
  updateTicket,
} from "../../store/reservation-slice";

export const ReservationModal = ({ isEdit, seat, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const [selectedSeat, setSelectedSeat] = useState(null);

  const reservations = useSelector((state) => {
    return state.reservation.reservations;
  });

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

  useEffect(() => {
    if (seat && isEdit) {
      const reservation = reservations.find((item) => {
        return item.seat === seat;
      });

      if (reservation) {
        setFirstName(reservation.firstName);
        setLastName(reservation.lastName);
        setEmail(reservation.email);
        setDate(reservation.date);
      }
    }
  }, [seat, reservations, isEdit]);
  const dispatch = useDispatch();
  function onCloseModified() {
    onClose();
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
    }, 200);
    
  }

  function handleSubmit(event) {
    event.preventDefault();
    const reservation = {
      seat,
      firstName,
      lastName,
      email,
      date: isEdit ? date : new Date().toISOString(),
    };
    dispatch(
      isEdit
        ? updateTicket(reservation, onCloseModified)
        : reserveTikcket(reservation, onCloseModified),
    );
  }
  return (
    <ReactModal
      isOpen={seat !== null}
      onRequestClose={onClose}
      closeTimeoutMS={150}
      ariaHideApp={false}
      portalClassName="ReactModalPortal relative z-40 overflow-hidden text-slate-950"
      overlayClassName="fixed inset-0 bg-slate-950/40"
      className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-auto rounded bg-white px-6 pb-6 pt-5 outline-none"
    >
      <h3 className="mb-7 flex items-center text-2xl font-semibold">
        <span
          className={`mr-2.5 inline-block rounded px-2 py-[0.3125rem] text-xl leading-none text-white ${isEdit ? "bg-amber-400" : "bg-green-600"}`}
        >
          {selectedSeat || seat}
        </span>
        <span>{isEdit ? "Edit Reservation" : "Reserve Ticket"}</span>
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="John"
            required
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Doe"
            required
          />
        </div>

        <TextInput
          type="email"
          label="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-6"
          placeholder="johndoe@example.com"
          required
        />

        <div className="flex justify-end gap-x-2">
          <Button onClick={onCloseModified}>Cancel</Button>
          <Button type="submit" isPrimary={true}>
            {isEdit ? "Update" : "Reserve"}
          </Button>
        </div>
      </form>
    </ReactModal>
  );
};
