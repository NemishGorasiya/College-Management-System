import ServiceTitle from "./ServiceTitle";
import "./Result.scss";
import updateCaptchImage from "../assets/retry.png";
import Button from "../UI/Button.jsx"

export default function Result() {
  return (
    <div className="resultService">
      <ServiceTitle serviceTitle="Result" />
      <div className="resultWapper">
        <table className="resultInputForm">
          <tr className="inputGroup">
            <td className="resultInputLabel">
            <label htmlFor="Name">Name</label>
            </td>
            <td className="resultFormInput">
            <span>Gorasiya Nemish Sureshbhai</span>
            </td>           
          </tr>
          <tr className="inputGroup">
            <td className="resultInputLabel"  >             
            <label htmlFor="enNo">Enrollment No.</label>
            </td>
            <td className="resultFormInput">
            <input  type="text" id="enNo"/>             
            </td>
          </tr>
          <tr className="inputGroup">
            <td className="resultInputLabel"  >             
            <label htmlFor="sem">Semester</label>
            </td>
            <td className="resultFormInput">
            <select className="semInput" name="" id="sem">
                <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>              
            </select>
            </td>
          </tr>
          <tr className="inputGroup">
            <td className="resultInputLabel"  >
            <label htmlFor="enNo">Captcha</label>
            </td>
            <td className="resultFormInput captchaInput">
            <input className="captchaInput" type="text" id="enNo" />
              <img className="captchaImage" src="https://picsum.photos/200/300" alt="" />
              <img className="updateCaptchImage" src={updateCaptchImage} alt="" />
            </td>
            <td className="resultCaptchImage">
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Button style={{width : "80px"}}>Search</Button>
            </td>
          </tr>
          
        </table>
        <div className="resultImage">
          <img src="https://placehold.co/600x400" alt="" />
        </div>
          <div className="printBtnWrapper">
          <Button>Print</Button>
          </div>
      </div>
    </div>
  )
}
