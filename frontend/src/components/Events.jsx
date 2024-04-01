import './Events.scss';
import ServiceTitle from './ServiceTitle'
import YearMonthFilter from './YearMonthFilter';
import EventCard from './events/EventCard';

export default function Events() {
  return (
    <div className='eventsService'>
      <ServiceTitle serviceTitle="Events" />
      <div className="eventsWrapper">
        <YearMonthFilter />
        <div className="eventsContainer">
          {
            Array(10).fill().map((ele,idx)=><EventCard key={idx} />)
          }
        </div>
      </div>
    </div>
  )
}
