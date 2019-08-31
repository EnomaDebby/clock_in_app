class EventResource

  def initialize(event)
    @event = event
  end

  attr_reader :event

  def as_json(*)
    {
      reason: event.reason,
      logged_at: event.logged_at,
      event_type: event.clock_in? ? "clock_in" : "clock_out"
    }
  end
end