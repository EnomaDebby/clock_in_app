class Event < ApplicationRecord
  belongs_to :user

  attr_accessor :event_type, :email, :password

  validates_presence_of :user_id, :logged_at

  def clock_in?
    type == "ClockInEvent"
  end

  def clock_out?
    type == "ClockOutEvent"
  end
end
