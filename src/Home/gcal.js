import request from 'superagent'

const CALENDAR_ID ='8977jk8f95339ot04eh0jonm10@group.calendar.google.com'
const API_KEY = 'AIzaSyC9DKiKlGcPG7olqYJ0OdM8EW_hrgkktV8'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`


export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}
