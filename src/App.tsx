import React, { useEffect, useState } from 'react';

type Booking = {
  id: number;
  resource: string;
  user: string;
  date: string;
};

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/bookings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading bookings...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bookings</h1>
      <ul>
        {bookings.map((b) => (
          <li key={b.id} className="border-b py-2">
            <strong>{b.resource}</strong> booked by {b.user} on {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

