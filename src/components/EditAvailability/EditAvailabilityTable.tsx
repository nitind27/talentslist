'use client'
import React, { useState, useEffect } from "react";
import { KTIcon } from "@/_metronic/helpers";
import Select from "react-select";
import SelectCustomStyles from "../SelectCustomStyles/SelectCustomStyles";
import { getEditAvailability } from "@/api/services/services";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { AvailabilitySlot, Day, IAvailability } from "@/api/services/types";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailabilityItem {
  day: string;
  times: TimeSlot[];
}

const EditAvailabilityTable = ({ availabilityData }: { availabilityData: IAvailability }) => {
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [hourlyTimeOptions, setHourlyTimeOptions] = useState<string[]>([]);
  const [show24HoursFormat, setShow24HoursFormat] = useState(false);
  const [bookingPeriod, setBookingPeriod] = useState<number>(2); // Default to 'This week and next week'
  const [bookableUntilDate, setBookableUntilDate] = useState<Date | null>(null);
  const [isAvailableForBooking, setIsAvailableForBooking] = useState<boolean>(false);
  const [isAvailableForTravel, setIsAvailableForTravel] = useState<boolean>(false);
  const [bookingDuration, setBookingDuration] = useState<number | string>(availabilityData.data.booking_duration); // State for booking duration
  const [bookingDurationError, setBookingDurationError] = useState<string>("");
  const router = useRouter();

  const options = [
    { value: "2", label: "This week and next week"},
    { value: "3", label: "3 weeks" },
    { value: "4", label: "4 weeks" },
  ];

  useEffect(() => {
    const today = new Date();
    let endDate = new Date();

    if (bookingPeriod === 3) {
      endDate.setDate(today.getDate() + 21); // 3 weeks later
    } else if (bookingPeriod === 4) {
      endDate.setDate(today.getDate() + 28); // 4 weeks later
    } else {
      endDate.setDate(today.getDate() + 14); // Default Date
    }

    setBookableUntilDate(endDate);

    if (show24HoursFormat) {
      setTimeOptions(generateTimeOptions());
      setHourlyTimeOptions(generateHourlyTimeOptions());
    } else {
      setTimeOptions(generateTimeOptionsFor12());
      setHourlyTimeOptions(generateHourlyTimeOptionsFor12());
    }

    // Simulated availability data (replace with actual data fetching logic)
    const availabilitySlots:{ [key: string]: Day[] }    = {
      Sunday: [{ start_time: "09:00", end_time: "17:00" }],
      Monday: [{ start_time: "09:00", end_time: "17:00" }],
      Tuesday: [{ start_time: "09:00", end_time: "17:00" }],
      Wednesday: [{ start_time: "09:00", end_time: "17:00" }],
      Thursday: [{ start_time: "09:00", end_time: "17:00" }],
      Friday: [{ start_time: "09:00", end_time: "17:00" }],
      Saturday: [{ start_time: "09:00", end_time: "17:00" }],
    };

    const initialAvailability = Object.keys(availabilitySlots).map((day: string) => ({
      day,
      times: availabilitySlots[day].map((slot: { start_time: string; end_time: string }) => ({
        start: slot.start_time,
        end: slot.end_time,
      })),
    }));

    setAvailability(initialAvailability);

    // Check the days received from API and update selectedDays accordingly
    const daysFromApi = availabilityData.data.days || []; // Assuming this is an array of day names (e.g., ["Monday", "Tuesday"])
    setSelectedDays(daysFromApi);
  }, [show24HoursFormat, bookingPeriod]);

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24 * 4; i++) {
      const hours = Math.floor(i / 4);
      const minutes = (i % 4) * 15;
      const time = new Date(1970, 0, 1, hours, minutes);
      const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      times.push(formattedTime);
    }
    times.push("24:00"); // Include 24:00 as the last option
    return times;
  };

  const generateTimeOptionsFor12 = () => {
    const times = [];
    for (let i = 0; i < 24 * 4; i++) {
      let hours = Math.floor(i / 4);
      let minutes = (i % 4) * 15;
      let period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      if (hours === 0) hours = 12;
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
      times.push(formattedTime);
    }
    return times;
  };

  const generateHourlyTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const time = new Date(1970, 0, 1, i, 0);
      const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      times.push(formattedTime);
    }
    times.push("24:00"); // Include 24:00 as the last option
    return times;
  };

  const generateHourlyTimeOptionsFor12 = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      let hours = i % 12;
      let period = i >= 12 ? "PM" : "AM";
      if (hours === 0) hours = 12;
      const formattedTime = `${hours.toString().padStart(2, "0")}:00 ${period}`;
      times.push(formattedTime);
    }
    return times;
  };

  const getNextTime = (current: string, isHourly: boolean = false) => {
    const options = isHourly ? hourlyTimeOptions : timeOptions;
    const currentIndex = options.indexOf(current);
    const nextIndex = (currentIndex + 1) % options.length;
    return options[nextIndex];
  };

  const addTimeSlot = (day: string, isHourly: boolean = false) => {
    if (!selectedDays.includes(day) || timeOptions.length === 0) return;
  
    const dayItem = availability.find((item) => item.day === day);
    if (dayItem) {
      let newStart: string;
  
      if (dayItem.times.length > 0) {
        // Set new start time to the last slot's end time
        const lastTimeSlot = dayItem.times[dayItem.times.length - 1];
        newStart = lastTimeSlot.end;
      } else {
        // Default case: Start with the first available time option
        newStart = isHourly ? hourlyTimeOptions[0] : timeOptions[0];
      }
  
      // Calculate new end time, which is 1 hour after the new start time
      const newStartIndex = timeOptions.indexOf(newStart);
      const newEndIndex = (newStartIndex + 4) % timeOptions.length;
      const newEnd = timeOptions[newEndIndex];
  
      const newTimes = [...dayItem.times, { start: newStart, end: newEnd }];
  
      setAvailability(
        availability.map((item) =>
          item.day === day ? { ...item, times: newTimes } : item
        )
      );
    }
  };
  

  const handleTimeChange = (
    day: string,
    index: number,
    field: string,
    value: string
  ) => {
    setAvailability(
      availability.map((item) =>
        item.day === day
          ? {
            ...item,
            times: item.times.map((time, idx) =>
              idx === index
                ? {
                  ...time,
                  [field]: value,
                  // Update end time if the start time is changed
                  ...(field === 'start' && {
                    end: timeOptions[
                      (timeOptions.indexOf(value) + 4) % timeOptions.length
                    ],
                  }),
                }
                : time
            ),
          }
          : item
      )
    );
  };

  const handleCheckboxChange = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handle24HoursFormatChange = () => {
    setShow24HoursFormat(!show24HoursFormat);
  };

  const removeTimeSlot = (day: string, index: number) => {
    setAvailability(
      availability.map((item) =>
        item.day === day
          ? { ...item, times: item.times.filter((_, idx) => idx !== index) }
          : item
      )
    );
  };

  const handlePeriodChange = (selectedOption: any) => {
    if (selectedOption) {
      setBookingPeriod(parseInt(selectedOption.value)); // Update bookingPeriod state
    }
  };

  const handleBookingToggle = () => {
    setIsAvailableForBooking(!isAvailableForBooking);
  };

  const handleTravelToggle = () => {
    setIsAvailableForTravel(!isAvailableForTravel);
  };

  const handleBookingDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Validate input (must be a positive number)
    if (!isNaN(Number(value)) && Number(value) >= 0) {
      setBookingDuration(value);
      setBookingDurationError(""); // Clear any previous error message
    } else {
      setBookingDurationError("Please enter a valid booking duration (positive number)");
    }
  };

  const handleSave = async () => {
    // Validate booking duration again before saving
    if (isNaN(Number(bookingDuration)) || Number(bookingDuration) < 0) {
      setBookingDurationError("Please enter a valid booking duration (positive number)");
      return;
    }

    const filteredAvailability = availability.filter((item) =>
      selectedDays.includes(item.day)
    );
    const updatedAvailability:any = {
      period: bookingPeriod,
      booking: isAvailableForBooking ? "Y" : "N",
      available: isAvailableForTravel ? "Yes" : "No",
      availability_slot: filteredAvailability.reduce((acc: any, item: AvailabilityItem) => {
        acc[item.day] = item.times.map((time: TimeSlot) => ({
          start_time: time.start,
          end_time: time.end,
        }));
        return acc;
      }, {}),
      booking_duration: bookingDuration, // Include booking_duration in the payload
    };

    try {
      const response = await getEditAvailability(updatedAvailability);
      if (response.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        router.push("/services");
      }
    } catch (error) {
      console.error("Error while updating availability:", error);
      toast.error("Failed to update availability");
    }
  };

  return (
    <div className="card mb-5 mb-xxl-10">
      <div className="card-body p-5 d-flex flex-column">
        <div className="d-inline-flex flex-column text-start">
          <div className="row form-group col-md-12">
            <div className="col-md-6 d-flex">
              <label className="fs-6" htmlFor="available">
                Available For booking
              </label>
              <div className="form-check form-switch ms-10">
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  checked={isAvailableForBooking}
                  onChange={handleBookingToggle}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <label className="fs-6 ms-6" htmlFor="available">
                Available For Travel
              </label>
              <div className="form-check form-switch ms-10">
                <input
                  className="form-check-input cursor-pointer"
                  type="checkbox"
                  checked={isAvailableForTravel}
                  onChange={handleTravelToggle}
                />
              </div>
            </div>
          </div>
          <div className="row form-group justify-content-between col-md-12 mb-0">
            <div className="row form-group col-md-5 mt-5 fs-6">
              <label className="mb-3">Set a Period of rolling weeks</label>
              <Select
                className=" ms-2 mb-1"
                classNamePrefix="react-select"
                styles={SelectCustomStyles}
                options={options}
                defaultValue={options.find(
                  (option) => option.value === bookingPeriod.toString()
                )}
                onChange={handlePeriodChange}
              />
              <small className="ml-1">
                People can book you till {bookableUntilDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </small>
            </div>
            <div className="row form-group col-md-6 mb-2">
              <div className="col-12 fs-6 mt-5">
                <label className="mb-3" htmlFor="booking_duration">
                  Booking Buffer{" "}
                  <span className="text-muted">(In Minutes)</span>
                </label>
                <input
                  className={`form-control form-select-sm ${bookingDurationError ? 'is-invalid' : ''}`}
                  placeholder="min (s)"
                  type="number"
                  name="booking_duration"
                  min="0"
                  value={bookingDuration}
                  onChange={handleBookingDurationChange} // Handle input change
                />
                {bookingDurationError && (
                  <div className="invalid-feedback">
                    {bookingDurationError}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row col-md-12">
            <div className="table-responsive mt-5">
              <table className="w-100">
                <thead>
                  <tr style={{ borderBottom: "2px solid black" }}>
                    <td className="px-4 py-3">Day</td>
                    <td className="px-4 py-3">Time</td>
                    <td className="d-flex align-items-center justify-content-end pt-3">
                      24 Hours
                      <div className="form-check form-switch ms-2">
                        <input
                          className="form-check-input cursor-pointer"
                          type="checkbox"
                          checked={show24HoursFormat}
                          onChange={handle24HoursFormatChange}
                        />
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {availability.map((item) => (
                    <tr
                      key={item.day}
                      style={{ borderBottom: "1px solid #edf0f2" }}
                    >
                      <td>
                        <div className="form-check form-check-sm d-flex align-items-start">
                          <input
                            id={`checkbox-${item.day}`}
                            className="form-check-input widget-9-check me-2 mt-1"
                            type="checkbox"
                            onChange={() => handleCheckboxChange(item.day)}
                            checked={selectedDays.includes(item.day)}
                          />
                          <div className="fs-4">{item.day}</div>
                        </div>
                      </td>
                      <td>
                        {item.times.length === 0 ? (
                          <div className="text-danger">Unavailable</div>
                        ) : (
                          item.times.map((time, idx) => (
                            <div
                              key={idx}
                              style={{ margin: "10px 0px", textAlign: "end" }}
                            >
                              <select
                                className="px-7 py-3 me-2"
                                style={{
                                  borderRadius: "3px",
                                  appearance: "none",
                                  border: "1px solid #edf0f2",
                                }}
                                value={time.start}
                                onChange={(e) =>
                                  handleTimeChange(
                                    item.day,
                                    idx,
                                    "start",
                                    e.target.value
                                  )
                                }
                                disabled={!selectedDays.includes(item.day)}
                              >
                                {timeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="px-7 py-3 me-2"
                                style={{
                                  borderRadius: "3px",
                                  appearance: "none",
                                  border: "1px solid #edf0f2",
                                }}
                                value={time.end}
                                onChange={(e) =>
                                  handleTimeChange(
                                    item.day,
                                    idx,
                                    "end",
                                    e.target.value
                                  )
                                }
                                disabled={!selectedDays.includes(item.day)}
                              >
                                {timeOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <button
                                style={{
                                  border: "1px solid transparent",
                                  marginLeft: "8px",
                                  padding: "7px 11px",
                                }}
                                className="inputRemove inputRemove_child btn mr-2 btn btn-light-danger"
                                onClick={() => removeTimeSlot(item.day, idx)}
                                disabled={!selectedDays.includes(item.day)}
                              >
                                <KTIcon
                                  iconName="trash"
                                  iconType="solid"
                                  className="fs-3 btn-ico p-0"
                                />
                              </button>
                            </div>
                          ))
                        )}
                      </td>
                      <td className="d-flex align-items-center justify-content-end pt-3">
                        <button
                          className="inputRemove inputRemove_child btn mr-2 btn btn-light-primary"
                          onClick={() => addTimeSlot(item.day, true)}
                          style={{
                            border: "1px solid transparent",
                            marginLeft: "8px",
                            padding: "7px 11px",
                          }}
                          disabled={
                            !selectedDays.includes(item.day) ||
                            timeOptions.length === 0
                          }
                        >
                          <KTIcon
                            iconName="plus"
                            iconType="solid"
                            className="fs-3 p-0"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="d-inline-flex justify-content-end">
            <button
              type="submit"
              className="btn mt-5 btn-sm px-3 py-2 fs-6 btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAvailabilityTable;
