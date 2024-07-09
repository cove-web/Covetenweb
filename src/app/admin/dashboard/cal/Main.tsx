'use client'

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configure moment for react-big-calendar
const localizer = momentLocalizer(moment);

const Main: React.FC = () => {
    // State to manage events
    const [events, setEvents] = useState<{ start: Date, end: Date, title: string, email: string }[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [eventText, setEventText] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    // Function to handle the selection of a time slot
    const handleSelectSlot = ({ start }: { start: Date }) => {
        setSelectedDate(start);
        setShowModal(true);
    };

    // Function to handle submission of the event
    const onSubmitEvent = () => {
        if (selectedDate) {
            const end = new Date(selectedDate.getTime() + 60 * 60 * 1000); // End time is 1 hour later
            setEvents([...events, { start: selectedDate, end, title: eventText, email }]);
            alert(`Event added on ${selectedDate.toDateString()}: ${eventText}`);
        }
        setShowModal(false);
        setEventText('');
        setEmail('');
    };

    // Function to handle cancellation of event addition
    const onCancelEvent = () => {
        setShowModal(false);
        setEventText('');
        setEmail('');
    };

    // Function to generate a shareable link
    const generateShareableLink = (event: { start: Date, end: Date, title: string, email: string }) => {
        const baseUrl = window.location.href;
        const eventDetails = `?title=${encodeURIComponent(event.title)}&start=${event.start.toISOString()}&end=${event.end.toISOString()}&email=${encodeURIComponent(event.email)}`;
        return `${baseUrl}${eventDetails}`;
    };

    // Function to handle sharing an event
    const onShareEvent = (event: { start: Date, end: Date, title: string, email: string }) => {
        const shareableLink = generateShareableLink(event);
        const mailtoLink = `mailto:?subject=Event: ${encodeURIComponent(event.title)}&body=Here are the details of the event:%0D%0A%0D%0ATitle: ${encodeURIComponent(event.title)}%0D%0AStart: ${event.start.toDateString()}%0D%0AEnd: ${event.end.toDateString()}%0D%0ADetails: ${shareableLink}`;
        window.location.href = mailtoLink;
    };

    // Function to handle previous month navigation
    const handlePrevMonth = () => {
        const prevMonth = moment(currentDate).subtract(1, 'month').toDate();
        setCurrentDate(prevMonth);
    };

    // Function to handle next month navigation
    const handleNextMonth = () => {
        const nextMonth = moment(currentDate).add(1, 'month').toDate();
        setCurrentDate(nextMonth);
    };

    return (
        <div style={{ height: '100vh', padding: '20px', backgroundColor: 'transparent', color: 'white' }}>
            <style>{`
                .rbc-off-range-bg {
                    background-color: transparent;
                }
            `}</style>
            <h1>Calendar</h1>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={handlePrevMonth} style={{
                    padding: '10px 20px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                    fontSize: '12px',
                }}>Previous Month</button>
                <button onClick={handleNextMonth} style={{
                    padding: '10px 20px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                }}>Next Month</button>
            </div>
            <div style={{ height: 'calc(100vh - 200px)' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    date={currentDate}
                    onNavigate={date => setCurrentDate(date)}
                    defaultView={Views.MONTH}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    views={['month', 'week', 'day', 'agenda']}
                    style={{ height: '100%', fontSize: '15px' }}
                />
            </div>

            {/* Modal for adding event */}
            {showModal && (
                <div className="modal" style={{
                    position: 'fixed',
                    zIndex: 1,
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: 'transparent',
                        margin: '15% auto',
                        padding: '20px',
                        border: '1px solid #888',
                        width: '80%',
                    }}>
                        <span className="close" style={{
                            color: '#aaa',
                            float: 'right',
                            fontSize: '28px',
                            fontWeight: 'bold',
                        }} onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add Event</h2>
                        <input
                            type="email"
                            placeholder="Enter email ID..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <textarea
                            placeholder="Enter event details..."
                            value={eventText}
                            onChange={(e) => setEventText(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                        />
                        <div>
                            <button onClick={onSubmitEvent} style={{
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}>Submit</button>
                            <button onClick={onCancelEvent} style={{
                                padding: '10px 20px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display the list of events with share button */}
            <div style={{ marginTop: '20px' }}>
                <h2>Scheduled Events</h2>
                {events.map((event, index) => (
                    <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                        <p><strong>Date:</strong> {event.start.toDateString()}</p>
                        <p><strong>Email:</strong> {event.email}</p>
                        <p><strong>Event:</strong> {event.title}</p>
                        <button onClick={() => onShareEvent(event)} style={{
                            padding: '5px 10px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                        }}>Share</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
