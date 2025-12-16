import React from 'react'
import './Calendar.css'
import Event from './Event'

const Calendar = () => {
  return (
    <div className='Calendar'>
        <table>
            <thead> 
                <tr>
                    <th></th>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th className="time">8 am</th>
                    <Event event="Dish Warm-Up Sequence" color="blue" />
                    <td></td>
                    <td></td>
                    <Event event="Frequency Sweep α-7" color="purple" />
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th className="time">9 am</th>
                    <td></td>
                    <Event event="Signal Noise Calibration" color="blue" />
                    <td></td>
                    <td></td>
                    <Event event="Echo Pattern Review" color="green" />
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th className="time">10 am</th>
                    <td></td>
                    <td></td>
                    <Event event="Inter-Domain Ping Test" color="red" />
                    <td></td>
                    <td></td>
                    <Event event="Waveform Integrity Check" color="blue" />
                    <td></td>
                </tr>

                <tr>
                    <th className="time">11 am</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Anomalous Response Logged" color="red" />
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th className="time">12 pm</th>
                    <td></td>
                    <Event event="Classified Downtime" color="gray" />
                    <td></td>
                    <td></td>
                    <Event event="Observer Debrief" color="purple" />
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th className="time">1 pm</th>
                    <td></td>
                    <td></td>
                    <Event event="Deep-Field Frequency Lock" color="blue" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Signal Drift Alert" color="green" />
                </tr>

                <tr>
                    <th className="time">2 pm</th>
                    <Event event="Contact Window Open" color="red" />
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Response Pattern Analysis" color="purple" />
                    <td></td>
                    <td></td>
                </tr>

                <tr>
                    <th className="time">3 pm</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <Event event="Emergency Dish Shutdown" color="red" />
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>

        </table>

    </div>
  )
}

export default Calendar