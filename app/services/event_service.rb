class EventService
  def initialize(event, params)
    @event = event
    @params = params
  end

  attr_reader :event, :params

  def save
    event.type = event_type
    event.logged_at = params[:logged_at]
    event.reason = params[:reason]
    event.save
  end

  def event_type
    params[:event_type] == "clock_in" ? "ClockInEvent" : "ClockOutEvent"
  end

end