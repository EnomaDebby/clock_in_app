class Event < ApplicationRecord
  belongs_to :user

  attr_accessor :event_type, :email, :password

  validates_presence_of :user_id, :logged_at
  validate :validate_date

  def clock_in?
    type == "ClockInEvent"
  end

  def clock_out?
    type == "ClockOutEvent"
  end

  private

  def validate_date
    if logged_at.present? && logged_at > Time.zone.now.end_of_day
      errors.add(:logged_at, "Cannot add entry for future dates")
    end
  end
end
