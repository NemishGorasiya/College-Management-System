import './EventCard.scss';

export default function EventCard() {
  return (
    <div className="eventCardWrapper">
        <img className='eventImage' src="https://placehold.co/600x400" alt="" />
        <div className="eventDetailsWrapper">
        <p className='eventTitle'>Annual Function 2024</p>
        <p className='eventDate'>Date: 15 June 2024</p>
        <a href="">Know More</a>
        </div>
    </div>
  )
}
