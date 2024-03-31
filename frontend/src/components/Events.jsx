import './Events.scss';
import ServiceTitle from './ServiceTitle'
import EventCard from './events/EventCard';
const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
export default function Events() {
  return (
    <div className='eventsService'>
      <ServiceTitle serviceTitle="Events" />
      <div className="eventsWrapper">
        <div className="eventsInputsWrapper">
          <select name="" id="">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <select name="" id="">
            {
              months.map(month => <option key={month} value={month}>{month}</option>)
            }
          </select>
        </div>
        <div className="eventsContainer">
          {
            Array(10).fill().map((ele,idx)=><EventCard key={idx} />)
          }
        </div>
      </div>
    </div>
  )
}
